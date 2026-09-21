"use client";

import { useTranslations } from "next-intl";
import { NotFoundScreen } from "@/components/NotFoundScreen";

export default function NotFound() {
  const t = useTranslations("NotFound");

  return <NotFoundScreen code={t("code")} label={t("label")} back={t("back")} />;
}
