import { loc, type Localized } from "@/lib/projects";

export const SKILLS: Localized[] = [
  {
    fr: "Réseaux : VLAN, VPN IPsec / IKEv2, Zero Trust, Wireshark, GNS3, MikroTik, notions WLAN",
    en: "Networking: VLAN, IPsec / IKEv2 VPN, Zero Trust, Wireshark, GNS3, MikroTik, WLAN basics",
  },
  {
    fr: "Systèmes : Linux, Windows Server, Docker, Kubernetes (Minikube), GLPI, Git",
    en: "Systems: Linux, Windows Server, Docker, Kubernetes (Minikube), GLPI, Git",
  },
  {
    fr: "Identités : Active Directory / LDAP, GPO, DNS de domaine",
    en: "Identity: Active Directory / LDAP, GPOs, domain DNS",
  },
  {
    fr: "Analyse cyber : CTI, MITRE ATT&CK, Suricata, lecture de trafic (pcap)",
    en: "Cyber analysis: CTI, MITRE ATT&CK, Suricata, traffic reading (pcap)",
  },
  {
    fr: "Supervision : Prometheus, Grafana, Nagios, node_exporter, PromQL",
    en: "Monitoring: Prometheus, Grafana, Nagios, node_exporter, PromQL",
  },
  {
    fr: "C, Bash, SQL, Python (notions), Unity / C# (SAE)",
    en: "C, Bash, SQL, Python (basics), Unity / C# (SAE)",
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
    title: {
      fr: "Relation clientèle & acceptation",
      en: "Customer relations & credit acceptance",
    },
    org: "Toyota France Financement — Vaucresson",
    period: { fr: "Juillet – août 2025", en: "July – August 2025" },
    detail: {
      fr: "Contrôle de dossiers, anomalies, signalements TRACFIN.",
      en: "File review, anomaly detection, TRACFIN reporting.",
    },
  },
  {
    title: { fr: "Employé polyvalent", en: "Store associate" },
    org: "Boulanger — Villebon-sur-Yvette",
    period: { fr: "Étés 2022 et 2023", en: "Summers 2022 and 2023" },
    detail: {
      fr: "Caisse, mise en rayon, inventaires, SAV.",
      en: "Checkout, restocking, inventory, after-sales.",
    },
  },
];

export { loc };
