"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";

export function CopyEmailButton({
	email,
	locale,
}: {
	email: string;
	locale: string;
}) {
	const [copied, setCopied] = useState(false);
	const en = locale === "en";

	useEffect(() => {
		if (!copied) return;
		const timer = window.setTimeout(() => setCopied(false), 2000);
		return () => window.clearTimeout(timer);
	}, [copied]);

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(email);
			setCopied(true);
		} catch {
			setCopied(false);
		}
	};

	return (
		<button
			type="button"
			onClick={handleCopy}
			className="copy-email-button"
			aria-label={en ? `Copy ${email}` : `Copier ${email}`}
		>
			{copied ? (
				<Check size={14} aria-hidden="true" />
			) : (
				<Copy size={14} aria-hidden="true" />
			)}
			<span>{copied ? (en ? "Copied" : "Copié") : en ? "Copy" : "Copier"}</span>
			<span className="sr-only" aria-live="polite">
				{copied ? (en ? "Copied" : "Copié") : ""}
			</span>
		</button>
	);
}
