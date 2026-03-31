"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID;

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  if (!FORMSPREE_ID) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          _replyto: formData.email,
          email: formData.email,
          message: formData.message,
        }),
      });
      if (res.ok) {
        setStatus("sent");
        setFormData({ name: "", email: "", message: "" });
      } else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto mb-10 p-6 border border-white/10 bg-black/40 rounded-lg font-mono space-y-4"
    >
      <h3 className="text-accent text-sm font-semibold pb-2 border-b border-white/10">
        &gt; SEND_MESSAGE
      </h3>
      <div>
        <label htmlFor="contact-name" className="text-foreground/70 text-sm block mb-1">
          Nom
        </label>
        <input
          id="contact-name"
          type="text"
          name="name"
          required
          value={formData.name}
          onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
          className="w-full px-3 py-2 rounded border border-white/20 bg-white/5 text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent/50"
          placeholder="Ton nom ou société"
          disabled={status === "sending"}
        />
      </div>
      <div>
        <label htmlFor="contact-email" className="text-foreground/70 text-sm block mb-1">
          Email
        </label>
        <input
          id="contact-email"
          type="email"
          name="email"
          required
          value={formData.email}
          onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
          className="w-full px-3 py-2 rounded border border-white/20 bg-white/5 text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent/50"
          placeholder="email@exemple.com"
          disabled={status === "sending"}
        />
      </div>
      <div>
        <label htmlFor="contact-message" className="text-foreground/70 text-sm block mb-1">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
          className="w-full px-3 py-2 rounded border border-white/20 bg-white/5 text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent/50 resize-y min-h-[100px]"
          placeholder="Proposition de stage, question..."
          disabled={status === "sending"}
        />
      </div>
      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={status === "sending"}
          className="px-4 py-2 rounded border border-accent text-accent hover:bg-accent/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          {status === "idle" && "Envoyer"}
          {status === "sending" && "Envoi…"}
          {status === "sent" && "Envoyé ✓"}
          {status === "error" && "Erreur — réessayer"}
        </button>
        {status === "sent" && (
          <span className="text-accent-secondary text-sm">Message bien reçu.</span>
        )}
        {status === "error" && (
          <span className="text-red-400 text-sm">Échec d’envoi. Utilise le lien Email ci‑dessous.</span>
        )}
      </div>
    </motion.form>
  );
}
