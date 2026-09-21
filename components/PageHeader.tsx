"use client";

import { Link } from "@/lib/navigation";
import { useTranslations } from "next-intl";

export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  const t = useTranslations("Navigation");

  return (
    <header className="mx-auto max-w-5xl px-6 pb-8">
      <Link href="/" className="px-1.5 py-1 text-sm text-muted">
        ← {t("back_home")}
      </Link>
      <h1 className="mt-6 font-serif text-4xl font-normal tracking-tight text-foreground md:text-5xl">{title}</h1>
      {subtitle && <p className="mt-4 max-w-2xl text-lg leading-7 text-muted">{subtitle}</p>}
    </header>
  );
}
