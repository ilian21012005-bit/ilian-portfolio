"use client";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { CONTACT } from "@/lib/contact";
export function ContactForm() {
  const t = useTranslations("Contact");
  const en = useLocale() === "en";
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [data, setData] = useState({
    name: "",
    email: "",
    message: "",
    website: "",
  });
  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        signal: AbortSignal.timeout(15000),
      });
      if (!res.ok) throw new Error("send");
      setStatus("sent");
      setData({ name: "", email: "", message: "", website: "" });
    } catch {
      setStatus("error");
    }
  };
  if (status === "sent")
    return (
      <div role="status" className="space-y-5">
        <p>
          {en
            ? "Your message has been submitted."
            : "Ton message a bien été transmis."}
        </p>
        <button
          className="text-link"
          type="button"
          onClick={() => setStatus("idle")}
        >
          {en ? "Write another message" : "Écrire un autre message"}
          <ArrowUpRight size={14} />
        </button>
      </div>
    );
  return (
    <form
      onSubmit={submit}
      className="space-y-5"
      aria-busy={status === "sending"}
    >
      <div hidden aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={data.website}
          onChange={(e) => setData({ ...data, website: e.target.value })}
        />
      </div>
      <div>
        <label className="form-label" htmlFor="contact-name">
          {t("form_name")}
        </label>
        <input
          className="form-input"
          id="contact-name"
          name="name"
          autoComplete="name"
          required
          maxLength={120}
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
          disabled={status === "sending"}
        />
      </div>
      <div>
        <label className="form-label" htmlFor="contact-email">
          {t("form_email")}
        </label>
        <input
          className="form-input"
          id="contact-email"
          type="email"
          name="email"
          autoComplete="email"
          required
          maxLength={254}
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          disabled={status === "sending"}
        />
      </div>
      <div>
        <label className="form-label" htmlFor="contact-message">
          {t("form_message")}
        </label>
        <textarea
          className="form-input min-h-[150px] resize-y"
          id="contact-message"
          name="message"
          rows={5}
          required
          maxLength={5000}
          value={data.message}
          onChange={(e) => setData({ ...data, message: e.target.value })}
          disabled={status === "sending"}
        />
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="button-primary disabled:opacity-50"
      >
        {status === "sending" ? t("form_sending") : t("form_send")}
        <ArrowUpRight size={15} />
      </button>
      <div role="status" aria-live="polite" className="form-status">
        {status === "error" && (
          <p>
            {en
              ? "Sending failed. Your message is still here. Try again or "
              : "L’envoi a échoué. Ton message est conservé. Réessaie ou "}
            <a className="underline" href={`mailto:${CONTACT.email}`}>
              {en ? "email me directly" : "écris-moi par email"}
            </a>
            .
          </p>
        )}
      </div>
    </form>
  );
}
