import assert from "node:assert/strict";

// Contrôles HTTP sans envoi de message ni requête vers un prestataire externe.
const base = process.env.TEST_SITE_URL || "http://localhost:3100";
const get = (path, options = {}) =>
  fetch(`${base}${path}`, { redirect: "manual", ...options });
const sitemap = await get("/sitemap.xml");
assert.equal(sitemap.status, 200);
const xml = await sitemap.text();
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
  (match) => new URL(match[1]),
);
assert(
  urls.length >= 40,
  "Le sitemap doit contenir les fiches dans les deux langues.",
);
assert.equal(
  new Set(urls.map((url) => url.href)).size,
  urls.length,
  "URL dupliquée dans le sitemap.",
);
for (const url of urls) {
  const response = await get(url.pathname);
  assert.equal(response.status, 200, url.pathname);
  const html = await response.text();
  const locale = url.pathname.split("/")[1];
  assert(
    html.includes(`<html lang="${locale}"`),
    `Langue incorrecte : ${url.pathname}`,
  );
  assert(
    html.includes(`rel="canonical" href="${url.href}"`),
    `Canonique incorrecte : ${url.pathname}`,
  );
  assert(
    html.includes('hrefLang="fr"') && html.includes('hrefLang="en"'),
    `Alternates manquants : ${url.pathname}`,
  );
  assert(
    html.includes('id="main-content"'),
    `Cible d’évitement absente : ${url.pathname}`,
  );
  assert(
    html.includes('property="og:image"'),
    `Image de partage manquante : ${url.pathname}`,
  );
  assert.equal(
    (html.match(/<h1(?:\s|>)/g) || []).length,
    1,
    `Un seul h1 attendu : ${url.pathname}`,
  );
}
for (const locale of ["fr", "en"]) {
  const response = await get(`/${locale}/projets/clip-buffer`);
  assert.equal(response.status, 308);
  assert(response.headers.get("location").endsWith(`/${locale}/projets/karu`));
}
for (const path of ["/fr/projets/inexistant", "/fr/inexistant", "/de"]) {
  assert.equal((await get(path)).status, 404, path);
}
for (const path of [
  "/CV-Ilian-Stage-SOC-Reseau.pdf",
  "/CV-Ilian-Internship-SOC-Network.pdf",
  "/opengraph-image",
  "/twitter-image",
  "/project-images/dreamshift-bureau.jpg",
]) {
  assert.equal((await get(path)).status, 200, path);
}
const home = await get("/fr");
assert.equal(home.headers.get("x-content-type-options"), "nosniff");
assert.equal(home.headers.get("x-frame-options"), "DENY");
assert(
  home.headers
    .get("content-security-policy")
    .includes("frame-ancestors 'none'"),
);
for (const body of [
  "null",
  "[]",
  "{",
  "{}",
  JSON.stringify({ name: {}, email: "test@example.com", message: "test" }),
  JSON.stringify({ name: "Test", email: "incorrect", message: "test" }),
  JSON.stringify({ name: "Test", email: "test@example.com", message: " " }),
]) {
  const response = await get("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
  });
  assert.equal(response.status, 400, `Charge utile à rejeter : ${body}`);
}
assert.equal(
  (
    await get("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "x".repeat(21000) }),
    })
  ).status,
  413,
);
assert.equal(
  (
    await get("/api/contact", {
      method: "POST",
      headers: {
        Origin: "https://autre.example",
        "Content-Type": "application/json",
      },
      body: "{}",
    })
  ).status,
  403,
);
const honeypot = await get("/api/contact", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ website: "robot" }),
});
assert.equal(honeypot.status, 200);
console.log(
  `${urls.length} pages FR/EN vérifiées : HTTP, canonical, langues, h1 et lien d’évitement. Redirections, 404, CV, images, en-têtes et validation du contact OK. Aucun message envoyé.`,
);
