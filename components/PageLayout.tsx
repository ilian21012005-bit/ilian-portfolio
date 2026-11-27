import { ReactNode } from "react";

export function PageLayout({
	children,
	className = "",
}: {
	children: ReactNode;
	className?: string;
}) {
	return (
		<main
			id="main-content"
			tabIndex={-1}
			className={`relative min-h-[70vh] focus:outline-none ${className}`.trim()}
		>
			{children}
		</main>
	);
}
