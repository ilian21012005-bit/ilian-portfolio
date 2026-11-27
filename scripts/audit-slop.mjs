import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const STRICT = process.argv.includes("--strict");

const PALETTE_HEX = new Set([
	"#f3f1ea",
	"#eae6dc",
	"#e1ddd1",
	"#faf8f3",
	"#131311",
	"#55534d",
	"#3a3934",
	"#d4cfc3",
	"#7a766c",
	"#b8320f",
	"#99280b",
	"#131416",
	"#1c1e21",
	"#2d3136",
	"#a8a59d",
	"#ff5a2e",
	"#ffffff",
]);

const DECORATIVE_EFFECT_NAMES = [
	"GlitchText",
	"DecryptText",
	"KineticText",
	"AuroraBg",
	"RadarScan",
	"NetworkMesh",
	"TechGrid",
	"TiltCard3d",
	"BootIntro",
	"Oscilloscope",
	"InfiniteMarquee",
];

const AI_SLOP_PATTERNS = [
	{
		label: "buzzword",
		regex:
			/(?<![\p{L}\p{N}_])(passionn[ée]e?s?|cutting-edge|game-changer|next-gen|seamless(?:ly)?|elevate|synergy|digital craftsmanship|innovant(?:e|s)?|sur-mesure)(?![\p{L}\p{N}_])/giu,
	},
	{
		label: "tutoiement",
		regex:
			/(?<![\p{L}\p{N}_])(tu peux|ton nom|ton email|ton message|te répondre|écris-moi|réessaie)(?![\p{L}\p{N}_])/giu,
	},
	{
		label: "zero-trust-buzz",
		regex: /(?<![\p{L}\p{N}_])zero[\s-]trust(?![\p{L}\p{N}_])/giu,
	},
	{
		label: "markdown-backtick",
		regex: /"[^"${\r\n]*`[^`${\r\n]+`[^"${\r\n]*"/g,
	},
];

function walkFiles(dir, exts) {
	const out = [];
	if (!fs.existsSync(dir)) return out;
	for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
		if (
			entry.name === "node_modules" ||
			entry.name === ".next" ||
			entry.name === ".git"
		)
			continue;
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			out.push(...walkFiles(full, exts));
		} else if (!exts || exts.some((ext) => entry.name.endsWith(ext))) {
			out.push(full);
		}
	}
	return out;
}

function rel(filePath) {
	return path.relative(ROOT, filePath).replace(/\\/g, "/");
}

function flattenKeys(obj, prefix = "") {
	const map = new Map();
	for (const [key, value] of Object.entries(obj)) {
		const nextKey = prefix ? `${prefix}.${key}` : key;
		if (value && typeof value === "object" && !Array.isArray(value)) {
			for (const [k, v] of flattenKeys(value, nextKey)) map.set(k, v);
		} else {
			map.set(nextKey, String(value ?? ""));
		}
	}
	return map;
}

function checkI18nParity() {
	const frPath = path.join(ROOT, "messages", "fr.json");
	const enPath = path.join(ROOT, "messages", "en.json");
	if (!fs.existsSync(frPath) || !fs.existsSync(enPath)) {
		return {
			missingInEn: [],
			missingInFr: [],
			emptyValues: [],
			error: "messages/fr.json ou en.json absent",
		};
	}
	const fr = flattenKeys(JSON.parse(fs.readFileSync(frPath, "utf8")));
	const en = flattenKeys(JSON.parse(fs.readFileSync(enPath, "utf8")));
	const missingInEn = [...fr.keys()].filter((k) => !en.has(k));
	const missingInFr = [...en.keys()].filter((k) => !fr.has(k));
	const emptyValues = [
		...[...fr.entries()].filter(([, v]) => !v.trim()).map(([k]) => `fr:${k}`),
		...[...en.entries()].filter(([, v]) => !v.trim()).map(([k]) => `en:${k}`),
	];
	return { missingInEn, missingInFr, emptyValues, totalKeys: fr.size };
}

function resolveImportCandidates(fromFile, spec) {
	let base;
	if (spec.startsWith("@/")) {
		base = path.join(ROOT, spec.slice(2));
	} else if (spec.startsWith(".")) {
		base = path.resolve(path.dirname(fromFile), spec);
	} else {
		return [];
	}
	return [
		base,
		`${base}.ts`,
		`${base}.tsx`,
		`${base}.js`,
		`${base}.mjs`,
		path.join(base, "index.ts"),
		path.join(base, "index.tsx"),
	];
}

function collectImports(files) {
	const importedFiles = new Set();
	const importRegex = /(?:from|import)\s+["']([^"']+)["']/g;
	for (const file of files) {
		const content = fs.readFileSync(file, "utf8");
		for (const match of content.matchAll(importRegex)) {
			for (const candidate of resolveImportCandidates(file, match[1])) {
				if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
					importedFiles.add(path.normalize(candidate));
				}
			}
		}
	}
	return importedFiles;
}

function checkComponentUsage() {
	const appFiles = walkFiles(path.join(ROOT, "app"), [".ts", ".tsx"]);
	const componentFiles = walkFiles(path.join(ROOT, "components"), [
		".ts",
		".tsx",
	]);
	const allCode = [...appFiles, ...componentFiles];
	const importedEverywhere = collectImports(allCode);
	const importedFromApp = collectImports(appFiles);

	const neverImported = componentFiles
		.filter(
			(file) =>
				!file.endsWith(`${path.sep}index.ts`) &&
				!importedEverywhere.has(path.normalize(file)),
		)
		.map(rel);

	const notReachedFromApp = componentFiles
		.filter(
			(file) =>
				!file.endsWith(`${path.sep}index.ts`) &&
				!importedFromApp.has(path.normalize(file)),
		)
		.map(rel);

	return {
		totalComponents: componentFiles.length,
		neverImported,
		notReachedFromApp,
	};
}

function checkRootHygiene() {
	const issues = [];
	for (const name of fs.readdirSync(ROOT)) {
		if (/^(replace_.*|restructure)\.ps1$/i.test(name)) {
			issues.push(name);
		}
	}
	if (
		fs.existsSync(path.join(ROOT, "eslint.config.mjs")) &&
		fs.existsSync(path.join(ROOT, ".eslintrc.json"))
	) {
		issues.push(".eslintrc.json (legacy alongside eslint.config.mjs)");
	}
	return issues;
}

function checkClientAndEffects() {
	const files = [
		...walkFiles(path.join(ROOT, "app"), [".ts", ".tsx"]),
		...walkFiles(path.join(ROOT, "components"), [".ts", ".tsx"]),
	];
	const clientInApp = [];
	const clientInComponents = [];
	const framerImports = [];
	const decorativeImports = [];
	const effectRegex = new RegExp(
		`\\b(${DECORATIVE_EFFECT_NAMES.join("|")})\\b`,
	);

	for (const file of files) {
		const content = fs.readFileSync(file, "utf8");
		const r = rel(file);
		if (/^\s*["']use client["'];?/m.test(content)) {
			if (r.startsWith("app/")) clientInApp.push(r);
			else clientInComponents.push(r);
		}
		if (/from\s+["']framer-motion["']/.test(content)) {
			framerImports.push(r);
		}
		const lines = content.split(/\r?\n/);
		for (const line of lines) {
			if (/^\s*import\b/.test(line) && effectRegex.test(line)) {
				const hit = line.match(effectRegex)?.[1] ?? "effect";
				decorativeImports.push(`${r} (${hit})`);
			}
		}
	}

	return { clientInApp, clientInComponents, framerImports, decorativeImports };
}

function checkOffPaletteHex() {
	const files = [
		...walkFiles(path.join(ROOT, "app"), [".ts", ".tsx", ".css"]),
		...walkFiles(path.join(ROOT, "components"), [".ts", ".tsx", ".css"]),
	];
	const findings = [];
	const excludedMetaAssets = new Set([
		"app/opengraph-image.tsx",
		"app/twitter-image.tsx",
		"app/icon.svg",
	]);
	const hexRegex = /#[0-9a-fA-F]{3,8}\b/g;

	for (const file of files) {
		const r = rel(file);
		if (excludedMetaAssets.has(r)) continue;
		const lines = fs.readFileSync(file, "utf8").split(/\r?\n/);
		lines.forEach((line, idx) => {
			for (const match of line.matchAll(hexRegex)) {
				const raw = match[0].toLowerCase();
				const normalized =
					raw.length === 4
						? `#${raw[1]}${raw[1]}${raw[2]}${raw[2]}${raw[3]}${raw[3]}`
						: raw.slice(0, 7);
				if (!PALETTE_HEX.has(normalized)) {
					findings.push(`${r}:${idx + 1} -> ${match[0]}`);
				}
			}
		});
	}
	return findings;
}

function checkCopySlop() {
	const targets = [
		...walkFiles(path.join(ROOT, "messages"), [".json"]),
		...walkFiles(path.join(ROOT, "lib"), [".ts"]),
		...walkFiles(path.join(ROOT, "app", "[locale]"), [".tsx"]),
		path.join(ROOT, "components", "ContactForm.tsx"),
	].filter((file) => fs.existsSync(file));
	const findings = [];
	for (const file of targets) {
		const r = rel(file);
		const lines = fs.readFileSync(file, "utf8").split(/\r?\n/);
		lines.forEach((line, idx) => {
			for (const { label, regex } of AI_SLOP_PATTERNS) {
				regex.lastIndex = 0;
				const match = regex.exec(line);
				if (match) {
					findings.push(`${r}:${idx + 1} [${label}] "${match[0]}"`);
				}
			}
		});
	}
	return findings;
}

const i18n = checkI18nParity();
const components = checkComponentUsage();
const rootHygiene = checkRootHygiene();
const clientEffects = checkClientAndEffects();
const offPalette = checkOffPaletteHex();
const copySlop = checkCopySlop();

console.log("=== AUDIT ANTI-SLOP PORTFOLIO ===");
console.log(
	`1. Parité i18n (${i18n.totalKeys ?? 0} clés): missingInEn=${i18n.missingInEn.length}, missingInFr=${i18n.missingInFr.length}, empty=${i18n.emptyValues.length}`,
);
if (
	i18n.missingInEn.length ||
	i18n.missingInFr.length ||
	i18n.emptyValues.length
) {
	console.log("   Détails:", { ...i18n });
}

console.log(
	`2. Composants (${components.totalComponents} total): jamais importés=${components.neverImported.length}, hors app/=${components.notReachedFromApp.length}`,
);
for (const item of components.neverImported) {
	console.log(`   - dead: ${item}`);
}

console.log(`3. Hygiène racine: ${rootHygiene.length} fichier(s) obsolète(s)`);
for (const item of rootHygiene) {
	console.log(`   - root: ${item}`);
}

console.log(
	`4. Surface client & effets: useClient(app=${clientEffects.clientInApp.length}, components=${clientEffects.clientInComponents.length}), framer-motion=${clientEffects.framerImports.length}, imports effets=${clientEffects.decorativeImports.length}`,
);
for (const item of clientEffects.decorativeImports) {
	console.log(`   - effect-import: ${item}`);
}

console.log(
	`5. Couleurs hors palette Editorial Swiss Tech: ${offPalette.length} occurrence(s)`,
);
for (const item of offPalette.slice(0, 20)) {
	console.log(`   - hex: ${item}`);
}
if (offPalette.length > 20)
	console.log(`   ... +${offPalette.length - 20} autres`);

console.log(
	`6. Signaux rédactionnels AI-slop / ton: ${copySlop.length} occurrence(s)`,
);
for (const item of copySlop.slice(0, 20)) {
	console.log(`   - copy: ${item}`);
}
if (copySlop.length > 20) console.log(`   ... +${copySlop.length - 20} autres`);

const hasCritical =
	i18n.missingInEn.length > 0 ||
	i18n.missingInFr.length > 0 ||
	i18n.emptyValues.length > 0 ||
	offPalette.length > 0 ||
	components.neverImported.length > 0 ||
	rootHygiene.length > 0;

if (STRICT && hasCritical) {
	console.error("\nMode --strict: des points critiques restent à corriger.");
	process.exit(1);
}
