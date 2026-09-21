"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export function ContactForm() {
  const t = useTranslations("Contact");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [formData, setFormData] = useState({ name: "", email: "", message: "", website: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus("sent");
        setFormData({ name: "", email: "", message: "", website: "" });
      } else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  const fieldClass =
    "w-full border-b border-white/15 bg-transparent px-0 py-3 text-foreground placeholder-foreground/30 focus:border-foreground/40 focus:outline-none";

  return (
    <form onSubmit={handleSubmit} className="max-w-lg space-y-8">
      <p className="hidden" aria-hidden>
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={formData.website}
          onChange={(e) => setFormData((p) => ({ ...p, website: e.target.value }))}
        />
      </p>
      <div>
        <label htmlFor="contact-name" className="text-sm text-muted">
          {t("form_name")}
        </label>
        <input
          id="contact-name"
          type="text"
          name="name"
          required
          maxLength={120}
          value={formData.name}
          onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
          className={fieldClass}
          disabled={status === "sending"}
        />
      </div>
      <div>
        <label htmlFor="contact-email" className="text-sm text-muted">
          {t("form_email")}
        </label>
        <input
          id="contact-email"
          type="email"
          name="email"
          required
          value={formData.email}
          onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
          className={fieldClass}
          disabled={status === "sending"}
        />
      </div>
      <div>
        <label htmlFor="contact-message" className="text-sm text-muted">
          {t("form_message")}
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          maxLength={5000}
          value={formData.message}
          onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
          className={`${fieldClass} min-h-[140px] resize-y`}
          disabled={status === "sending"}
        />
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending" || status === "sent"}
          className="px-2 py-1 text-sm text-foreground disabled:opacity-50"
        >
          {status === "idle" && t("form_send")}
          {status === "sending" && t("form_sending")}
          {status === "sent" && t("form_sent")}
          {status === "error" && t("form_error")}
        </button>
        {status === "sent" && <span className="text-sm text-muted">{t("form_ok")}</span>}
        {status === "error" && <span className="text-sm text-muted">{t("form_fail")}</span>}
      </div>
    </form>
  );
}
