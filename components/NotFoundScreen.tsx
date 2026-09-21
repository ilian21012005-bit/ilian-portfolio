import Link from "next/link";

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
    <main className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center px-6 text-center">
      <p className="text-sm text-muted">{label}</p>
      <h1 className="mt-6 font-serif text-[clamp(6rem,22vw,14rem)] font-normal leading-none tracking-tight text-foreground">
        {code}
      </h1>
      <Link href="/" className="mt-12 px-2 py-1 text-sm text-muted">
        {back}
      </Link>
    </main>
  );
}
