"use client";

import { motion } from "framer-motion";

interface Commit {
  hash: string;
  msg: string;
  desc?: string;
  tag?: string;
  type: "head" | "work" | "default";
  /** "pro" = expérience, "scolaire" = formation */
  category: "pro" | "scolaire";
}

const COMMITS: Commit[] = [
  {
    hash: "bf21a9c",
    msg: "BUT 2 Informatique — Paris-Saclay",
    desc: "Parcours Déploiement d'applications communicantes et sécurisées. Formation intensive en systèmes, réseaux et développement.",
    tag: "HEAD → main",
    type: "head",
    category: "scolaire",
  },
  {
    hash: "0000001",
    msg: "Initial commit — Baccalauréat général",
    desc: "Lycée Condorcet, Limay. Formation générale avant orientation vers l'informatique.",
    type: "default",
    category: "scolaire",
  },
  {
    hash: "toyota25",
    msg: "Chargé Relation Clientèle & Chargé d'acceptation — Toyota France Financement",
    desc: "Juil.–août 2025, Vaucresson. Contrôle et analyse des dossiers de financement (pièces d'identité, revenus, IBAN, etc.), déclarations TRACFIN en cas de fraude suspectée ; qualification des demandes, encaissements (virement, chèque), gestion SAV et documents clients.",
    tag: "Expérience",
    type: "work",
    category: "pro",
  },
  {
    hash: "e7f4a2b",
    msg: "Employé polyvalent — Boulanger, Villebon",
    desc: "Étés 2022 et 2023. Mise en rayon, réassort, inventaires et SAV. Accueil, conseil, encaissements et tenue de caisse.",
    tag: "Expérience",
    type: "work",
    category: "pro",
  },
  {
    hash: "4f3e2d1",
    msg: "Stage de troisième — Corporate Project Planning",
    desc: "Réunions d'équipe, rapports d'anomalies, démarches d'innovation.",
    type: "work",
    category: "pro",
  },
];

interface GitTimelineProps {
  /** "pro" = parcours professionnel, "scolaire" = parcours scolaire */
  variant?: "pro" | "scolaire";
}

export function GitTimeline({ variant = "pro" }: GitTimelineProps) {
  const commits = COMMITS.filter((c) => c.category === variant);

  return (
    <div className="relative">
      <p className="text-foreground/50 font-mono text-sm mb-6">
        $ git log --oneline --graph {variant === "pro" ? "-- work/" : "-- formation/"}
      </p>
      <div className="relative pl-8 border-l-2 border-white/20">
        {commits.map((commit, index) => (
          <CommitItem key={commit.hash} commit={commit} index={index} isLast={index === commits.length - 1} />
        ))}
      </div>
    </div>
  );
}

function CommitItem({
  commit,
  index,
  isLast,
}: {
  commit: Commit;
  index: number;
  isLast: boolean;
}) {
  const dotStyles = {
    head: "border-tech-blue bg-tech-blue shadow-[0_0_12px_rgba(59,130,246,0.6)]",
    work: "border-success-green/60 bg-success-green/30",
    default: "border-white/30 bg-background",
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="relative pb-10 pl-6 group"
    >
      {!isLast && (
        <div className="absolute left-[-9px] top-5 bottom-0 w-px bg-gradient-to-b from-white/20 to-transparent" />
      )}

      <div
        className={`absolute left-[-37px] top-1 w-3 h-3 rounded-full border-2 transition-all duration-200 group-hover:scale-125 ${dotStyles[commit.type]}`}
      />

      <div className={`rounded-xl border bg-white/[0.02] p-4 sm:p-5 transition-all duration-300 ${commit.type === "head" ? "border-tech-blue/20 hover:border-tech-blue/40 hover:shadow-[0_0_20px_-5px_rgba(59,130,246,0.1)]" : "border-white/10 hover:border-white/20"} hover:bg-white/[0.04]`}>
        <div className="font-mono text-xs text-foreground/50 mb-1">
          {commit.hash}
          {commit.tag && (
            <span className={`ml-2 ${commit.type === "head" ? "text-tech-blue" : "text-success-green"}`}>
              ({commit.tag})
            </span>
          )}
        </div>
        <h3 className="font-semibold text-foreground text-base sm:text-lg">{commit.msg}</h3>
        {commit.desc && (
          <p className="text-sm text-foreground/60 mt-1.5 leading-relaxed max-w-xl">{commit.desc}</p>
        )}
      </div>
    </motion.div>
  );
}
