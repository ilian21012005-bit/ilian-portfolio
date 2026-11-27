import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function NotFoundScreen({
	code,
	label,
	back,
}: {
	code: string;
	label: string;
	back: string;
}) {
	return (
		<main
			id="main-content"
			tabIndex={-1}
			className="flex min-h-[75vh] flex-col items-center justify-center px-6 py-20 text-center focus:outline-none"
		>
			<div className="w-full max-w-md rounded-sm border border-line bg-card p-10">
				<p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">
					HTTP · ERR_NOT_FOUND
				</p>
				<h1 className="mt-5 font-serif text-[clamp(4.5rem,14vw,7.5rem)] leading-none tracking-tight text-foreground tabular-nums">
					{code}
				</h1>
				<p className="mt-4 text-base text-muted">{label}</p>
				<div className="mt-8 border-t border-line pt-6">
					<Link href="/" className="button-primary">
						<ArrowLeft size={15} aria-hidden="true" />
						{back}
					</Link>
				</div>
			</div>
		</main>
	);
}
