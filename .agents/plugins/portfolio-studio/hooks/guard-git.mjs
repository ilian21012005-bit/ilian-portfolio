import fs from "node:fs";

function readStdin() {
	try {
		return fs.readFileSync(0, "utf8");
	} catch {
		return "";
	}
}

function respond(payload) {
	process.stdout.write(`${JSON.stringify(payload)}\n`);
}

function main() {
	const raw = readStdin().trim();
	if (!raw) {
		respond({ decision: "allow" });
		return;
	}

	let data;
	try {
		data = JSON.parse(raw);
	} catch {
		respond({ decision: "allow" });
		return;
	}

	const args = data?.toolCall?.args ?? {};
	const cmd = String(args.CommandLine ?? args.commandLine ?? "").trim();
	if (!cmd) {
		respond({ decision: "allow" });
		return;
	}

	if (
		/\bgit\s+push\b/i.test(cmd) &&
		(/\b(?:main|master)\b/i.test(cmd) ||
			/\bHEAD:(?:refs\/heads\/)?(?:main|master)\b/i.test(cmd))
	) {
		respond({
			decision: "deny",
			reason:
				"Blocage AGENTS.md : travailler sur une branche dédiée, ne jamais pousser directement sur main/master.",
		});
		return;
	}

	if (
		/\bgit\s+push\b/i.test(cmd) &&
		/(?:^|\s)(?:-f|--force|--force-with-lease)(?:\s|$)/i.test(cmd)
	) {
		respond({
			decision: "deny",
			reason:
				"Force-push bloqué par sécurité. Utiliser une branche dédiée sans réécrire l’historique partagé.",
		});
		return;
	}

	if (/\bgit\s+reset\s+--hard\b/i.test(cmd)) {
		respond({
			decision: "deny",
			reason:
				"git reset --hard bloqué pour préserver les modifications locales existantes.",
		});
		return;
	}

	if (/\bvercel(?:\.cmd)?\s+(?:deploy\s+)?--prod\b/i.test(cmd)) {
		respond({
			decision: "force_ask",
			reason:
				"Publication en production : confirmation explicite requise par AGENTS.md.",
		});
		return;
	}

	respond({ decision: "allow" });
}

main();
