import { loc, type Localized } from "@/lib/projects";

export const SKILLS: Localized[] = [
  {
    fr: "Réseaux : VLAN, VPN IPsec / IKEv2, Zero Trust, Wireshark, GNS3, MikroTik",
    en: "Networking: VLAN, IPsec / IKEv2 VPN, Zero Trust, Wireshark, GNS3, MikroTik",
  },
  {
    fr: "Systèmes : Linux, Windows, Docker, WSL, GLPI, Git",
    en: "Systems: Linux, Windows, Docker, WSL, GLPI, Git",
  },
  {
    fr: "Windows Server / Active Directory / GPO",
    en: "Windows Server / Active Directory / GPO",
  },
  {
    fr: "CTI, MITRE ATT&CK, lecture de trafic",
    en: "CTI, MITRE ATT&CK, traffic reading",
  },
  {
    fr: "C, Bash, SQL, Python (notions)",
    en: "C, Bash, SQL, Python (basics)",
  },
];

export const EXPERIENCES: {
  title: Localized;
  org: string;
  period: Localized;
  detail: Localized;
}[] = [
  {
    title: {
      fr: "Stagiaire infrastructure & sécurité",
      en: "Infrastructure & security intern",
    },
    org: "Data-Tricks — La Défense",
    period: { fr: "Mai – juillet 2026", en: "May – July 2026" },
    detail: {
      fr: "Lab GNS3 multi-sites, VLAN, VPN IPsec IKEv2, Zero Trust, inventaire GLPI.",
      en: "Multi-site GNS3 lab, VLAN, IPsec IKEv2 VPN, Zero Trust, GLPI inventory.",
    },
  },
  {
    title: { fr: "Employé polyvalent", en: "Store associate" },
    org: "Boulanger — Villebon-sur-Yvette",
    period: { fr: "Juillet – août 2025", en: "July – August 2025" },
    detail: {
      fr: "Caisse, mise en rayon, inventaires, SAV.",
      en: "Checkout, restocking, inventory, after-sales.",
    },
  },
  {
    title: {
      fr: "Relation clientèle & acceptation",
      en: "Customer relations & credit acceptance",
    },
    org: "Toyota France Financement — Vaucresson",
    period: { fr: "Étés 2022 et 2023", en: "Summers 2022 and 2023" },
    detail: {
      fr: "Contrôle de dossiers, anomalies, signalements TRACFIN.",
      en: "File review, anomaly detection, TRACFIN reporting.",
    },
  },
];

export { loc };
