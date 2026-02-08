"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Linkedin, Github, Download } from "lucide-react";

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
      <div className="absolute -top-px -left-px w-6 h-6 border-t-2 border-l-2 border-success-green/60 rounded-tl" />
      <div className="absolute -bottom-px -right-px w-6 h-6 border-b-2 border-r-2 border-success-green/60 rounded-br" />
      
      <div className="p-6 border border-white/10 bg-black/40 rounded-lg font-mono">
        <h3 className="text-success-green text-sm font-semibold mb-4 pb-2 border-b border-white/10">
          &gt; INITIATE_HANDSHAKE
        </h3>
        
        <div className="space-y-4 text-sm">
          <div>
            <label className="text-success-green/80 block mb-1">var USER_IDENTITY =</label>
            <a href="mailto:ilian.ebp@gmail.com" className="text-foreground hover:text-tech-blue transition-colors">
              &quot;Ilian El Bouazzaoui Prieur&quot;
            </a>
          </div>
          <div>
            <label className="text-success-green/80 block mb-1">var RETURN_ADDRESS =</label>
            <a href="mailto:ilian.ebp@gmail.com" className="text-tech-blue hover:underline">
              ilian.ebp@gmail.com
            </a>
          </div>
          <div>
            <label className="text-success-green/80 block mb-1">var GEO_COORDS =</label>
            <span className="text-foreground/80 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-success-green" />
              91140 Villebon-Sur-Yvette, France
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mt-6 pt-4 border-t border-white/10">
          <a
            href="mailto:ilian.ebp@gmail.com"
            className="inline-flex items-center gap-2 px-4 py-2 border border-success-green/50 text-success-green hover:bg-success-green/10 transition-colors rounded"
          >
            <Mail className="w-4 h-4" />
            Email
          </a>
          <a
            href="tel:0679243437"
            className="inline-flex items-center gap-2 px-4 py-2 border border-success-green/50 text-success-green hover:bg-success-green/10 transition-colors rounded"
          >
            <Phone className="w-4 h-4" />
            06 79 24 34 37
          </a>
          <a
            href="https://www.linkedin.com/in/ilian-ebp"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 border border-success-green/50 text-success-green hover:bg-success-green/10 transition-colors rounded"
          >
            <Linkedin className="w-4 h-4" />
            LinkedIn
          </a>
          <a
            href="https://github.com/ilian21012005-bit"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 border border-success-green/50 text-success-green hover:bg-success-green/10 transition-colors rounded"
          >
            <Github className="w-4 h-4" />
            GitHub
          </a>
          <a
            href="/CV-ILIAN-EL-BOUAZZAOUI-PRIEUR.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleSend}
            className={`inline-flex items-center gap-2 px-4 py-2 border rounded transition-colors ${
              sendStatus === "sent"
                ? "border-success-green bg-success-green/20 text-success-green"
                : "border-success-green text-success-green hover:bg-success-green/10"
            }`}
          >
            <Download className="w-4 h-4" />
            {sendStatus === "idle" && "Télécharger CV"}
            {sendStatus === "sending" && "ENCRYPTING..."}
            {sendStatus === "sent" && "PACKET_SENT [200 OK]"}
          </a>
        </div>
      </div>
    </motion.div>
  );
}
