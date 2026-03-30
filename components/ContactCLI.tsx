"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Linkedin, Github, Download } from "lucide-react";
import { CONTACT } from "@/lib/contact";

export function ContactCLI() {
  const [sendStatus, setSendStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSend = () => {
    setSendStatus("sending");
    setTimeout(() => setSendStatus("sent"), 1200);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="max-w-lg mx-auto relative"
    >
      {/* Coins HUD style */}
      <div className="absolute -top-px -left-px w-6 h-6 border-t-2 border-l-2 border-dark-red/60 rounded-tl" />
      <div className="absolute -bottom-px -right-px w-6 h-6 border-b-2 border-r-2 border-dark-red/60 rounded-br" />
      
      <div className="p-6 border border-white/10 bg-black/40 rounded-lg font-mono">
        <h3 className="text-dark-red text-sm font-semibold mb-4 pb-2 border-b border-white/10">
          &gt; INITIATE_HANDSHAKE
        </h3>
        
        <div className="space-y-4 text-sm">
          <div>
            <label className="text-dark-red/80 block mb-1">var USER_IDENTITY =</label>
            {CONTACT.email ? (
              <a
                href={`mailto:${CONTACT.email}`}
                className="text-foreground hover:text-crimson transition-colors"
              >
                &quot;{CONTACT.name}&quot;
              </a>
            ) : (
              <span className="text-foreground/70">&quot;{CONTACT.name}&quot;</span>
            )}
          </div>
          <div>
            <label className="text-dark-red/80 block mb-1">var RETURN_ADDRESS =</label>
            {CONTACT.email ? (
              <a href={`mailto:${CONTACT.email}`} className="text-crimson hover:underline">
                {CONTACT.email}
              </a>
            ) : (
              <span className="text-foreground/60">non défini</span>
            )}
          </div>
          <div>
            <label className="text-dark-red/80 block mb-1">var GEO_COORDS =</label>
            <span className="text-foreground/80 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-dark-red" />
              {CONTACT.location || "non défini"}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mt-6 pt-4 border-t border-white/10">
          {CONTACT.email && (
            <a
              href={`mailto:${CONTACT.email}`}
              className="inline-flex items-center gap-2 px-4 py-2 border border-dark-red/50 text-dark-red hover:bg-dark-red/10 transition-colors rounded"
            >
              <Mail className="w-4 h-4" />
              Email
            </a>
          )}
          {CONTACT.phone && (
            <a
              href={`tel:${CONTACT.phone}`}
              className="inline-flex items-center gap-2 px-4 py-2 border border-dark-red/50 text-dark-red hover:bg-dark-red/10 transition-colors rounded"
            >
              <Phone className="w-4 h-4" />
              {CONTACT.phone}
            </a>
          )}
          {CONTACT.linkedinUrl && (
            <a
              href={CONTACT.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 border border-dark-red/50 text-dark-red hover:bg-dark-red/10 transition-colors rounded"
            >
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </a>
          )}
          {CONTACT.githubUrl && (
            <a
              href={CONTACT.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 border border-dark-red/50 text-dark-red hover:bg-dark-red/10 transition-colors rounded"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
          )}
          {CONTACT.cvUrl && (
            <a
              href={CONTACT.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleSend}
              className={`inline-flex items-center gap-2 px-4 py-2 border rounded transition-colors ${
                sendStatus === "sent"
                  ? "border-dark-red bg-dark-red/20 text-dark-red"
                  : "border-dark-red text-dark-red hover:bg-dark-red/10"
              }`}
            >
              <Download className="w-4 h-4" />
              {sendStatus === "idle" && "Télécharger CV"}
              {sendStatus === "sending" && "ENCRYPTING..."}
              {sendStatus === "sent" && "PACKET_SENT [200 OK]"}
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
