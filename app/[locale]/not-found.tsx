import { getTranslations } from "next-intl/server";
import { NotFoundScreen } from "@/components/NotFoundScreen";

export default async function NotFound() {
	const t = await getTranslations("NotFound");

	return (
		<NotFoundScreen code={t("code")} label={t("label")} back={t("back")} />
	);
}
