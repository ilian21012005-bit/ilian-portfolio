import { redirect } from "next/navigation";

export default async function ParcoursProRedirect({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  redirect(`/${locale}/a-propos`);
}
