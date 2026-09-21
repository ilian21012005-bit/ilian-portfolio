function env(name: string, fallback = "") {
  return process.env[name] ?? fallback;
}

const CV_PATH = "/CV-Ilian-Stage-SOC-Reseau.pdf";
const CV_PATH_EN = "/CV-Ilian-Internship-SOC-Network.pdf";

/** Données publiques (injectées au build) : utiliser uniquement des NEXT_PUBLIC_* */
export const CONTACT = {
  name: env("NEXT_PUBLIC_CONTACT_NAME", "Ilian El Bouazzaoui Prieur"),
  email: env("NEXT_PUBLIC_CONTACT_EMAIL", "ilian.elbp@gmail.com"),
  phone: env("NEXT_PUBLIC_CONTACT_PHONE", "06 79 24 34 37"),
  location: env("NEXT_PUBLIC_CONTACT_LOCATION", "91140 Villebon-sur-Yvette"),
  linkedinUrl: env("NEXT_PUBLIC_CONTACT_LINKEDIN_URL", "https://www.linkedin.com/in/ilian-ebp"),
  githubUrl: env("NEXT_PUBLIC_CONTACT_GITHUB_URL", "https://github.com/ilian21012005-bit"),
  cvUrl: env("NEXT_PUBLIC_CONTACT_CV_URL", CV_PATH),
  cvUrlEn: env("NEXT_PUBLIC_CONTACT_CV_URL_EN", CV_PATH_EN),
} as const;

