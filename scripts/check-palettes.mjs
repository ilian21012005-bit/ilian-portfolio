const palettes = {
	editorialSwissTech: {
		bg: "#f3f1ea",
		surface: "#eae6dc",
		card: "#faf8f3",
		fg: "#131311",
		muted: "#55534d",
		accent: "#b8320f",
		border: "#7a766c",
		inkBg: "#131416",
		inkSurface: "#1c1e21",
		inkFg: "#f3f1ea",
		inkMuted: "#a8a59d",
		inkAccent: "#ff5a2e",
	},
};

const l = (h) => {
	const c = h
		.slice(1)
		.match(/../g)
		.map((x) => parseInt(x, 16) / 255)
		.map((x) => (x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4));
	return c[0] * 0.2126 + c[1] * 0.7152 + c[2] * 0.0722;
};

const ratio = (a, b) => {
	const x = l(a);
	const y = l(b);
	return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
};

for (const [name, p] of Object.entries(palettes)) {
	const tests = [
		["texte/fond", p.fg, p.bg, 4.5],
		["secondaire/fond", p.muted, p.bg, 4.5],
		["secondaire/surface", p.muted, p.surface, 4.5],
		["secondaire/carte", p.muted, p.card, 4.5],
		["accent/fond", p.accent, p.bg, 4.5],
		["accent/surface", p.accent, p.surface, 4.5],
		["bouton encre", p.bg, p.fg, 4.5],
		["bouton vermillon", p.bg, p.accent, 4.5],
		["bordure champ", p.border, p.bg, 3],
		["bordure sur surface", p.border, p.surface, 3],
		["carbone texte/fond", p.inkFg, p.inkBg, 4.5],
		["carbone secondaire/surface", p.inkMuted, p.inkSurface, 4.5],
		["carbone accent/surface", p.inkAccent, p.inkSurface, 4.5],
	];
	for (const [label, a, b, min] of tests) {
		const n = ratio(a, b);
		console.log(
			`${name}: ${label} ${n.toFixed(2)}:1 ${n >= min ? "OK" : "ECHEC"}`,
		);
		if (n < min) process.exitCode = 1;
	}
}
