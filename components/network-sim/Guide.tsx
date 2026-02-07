"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, BookOpen } from "lucide-react";

interface SpoilerProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  /** Niveau d'indentation : 0 = section principale, 1 = sous-section, 2 = détail */
  level?: 0 | 1 | 2;
}

function Spoiler({ title, children, defaultOpen = false, level = 0 }: SpoilerProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const levelStyles = {
    0: "rounded-xl border-white/15",
    1: "rounded-lg border-white/10 ml-0",
    2: "rounded-md border-white/5 ml-2",
  };
  const btnStyles = {
    0: "px-4 py-3 font-medium",
    1: "px-3 py-2.5 font-medium text-sm",
    2: "px-3 py-2 font-normal text-sm",
  };
  const contentStyles = {
    0: "space-y-3 px-4 pb-4",
    1: "space-y-2 px-3 pb-3 pl-4",
    2: "space-y-1.5 px-3 pb-3 pl-5",
  };

  return (
    <div className={`border overflow-hidden ${levelStyles[level]}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center gap-2 text-left text-foreground hover:bg-white/5 transition-colors ${btnStyles[level]}`}
      >
        {isOpen ? (
          <ChevronDown className="w-4 h-4 text-tech-blue flex-shrink-0" />
        ) : (
          <ChevronRight className="w-4 h-4 text-tech-blue flex-shrink-0" />
        )}
        <span>{title}</span>
      </button>
      {isOpen && (
        <div className={`text-foreground/80 text-sm border-t border-white/5 pt-0 ${contentStyles[level]}`}>
          {children}
        </div>
      )}
    </div>
  );
}

export function Guide() {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="w-5 h-5 text-tech-blue" />
        <span className="font-semibold text-foreground">Guide réseau — du débutant à l&apos;avancé</span>
      </div>

      {/* ========== SECTION 1 : CONFIG RÉSEAU (déployable) ========== */}
      <Spoiler title="1. Configuration réseau" defaultOpen level={0}>
        <Spoiler title="Qu&apos;est-ce qu&apos;une adresse IP ?" defaultOpen level={1}>
          <p>
            Une <strong>adresse IP</strong> (ex : 192.168.1.2) identifie une machine sur un réseau, comme une adresse postale.
            Sans IP, une machine ne peut pas communiquer.
          </p>
          <p className="mt-2">
            Le <strong>/24</strong> (ex : 192.168.1.0/24) indique la taille du sous-réseau : les 24 premiers bits définissent le réseau, les 8 derniers les machines (de 1 à 254).
          </p>
        </Spoiler>

        <Spoiler title="La topologie de ce simulateur" level={1}>
          <p>5 machines reliées entre elles :</p>
          <pre className="bg-black/30 rounded p-3 mt-2 font-mono text-xs overflow-x-auto">
{`     PC3
      |
PC1 - R1 - R2 - PC2`}
          </pre>
          <p className="mt-2">
            <strong>R1</strong> et <strong>R2</strong> sont des routeurs (ils relient plusieurs réseaux). 
            <strong>PC1, PC2, PC3</strong> sont des postes. Chaque trait est un câble (une liaison).
          </p>
        </Spoiler>

        <Spoiler title="Configurer les IP" level={1}>
          <Spoiler title="Avec dhclient (automatique)" level={2}>
            <p>
              <strong>dhclient</strong> demande automatiquement une adresse IP (comme le DHCP chez toi). 
              Chaque machine doit avoir une IP sur chaque interface pour communiquer.
            </p>
            <p className="mt-2"><strong>Sur chaque PC</strong> (1 interface) :</p>
            <pre className="bg-black/30 rounded p-2 mt-2 font-mono text-xs">dhclient eth0</pre>
            <p className="mt-3"><strong>Sur R1</strong> (3 interfaces) :</p>
            <pre className="bg-black/30 rounded p-2 mt-2 font-mono text-xs">{`dhclient eth0\ndhclient eth1\ndhclient eth2`}</pre>
            <p className="mt-3"><strong>Sur R2</strong> (2 interfaces) :</p>
            <pre className="bg-black/30 rounded p-2 mt-2 font-mono text-xs">{`dhclient eth0\ndhclient eth1`}</pre>
          </Spoiler>
          <Spoiler title="À la main (ip addr)" level={2}>
            <p>Pour attribuer une IP manuellement (sans DHCP) :</p>
            <pre className="bg-black/30 rounded p-2 mt-2 font-mono text-xs">ip addr add 192.168.1.10/24 dev eth0</pre>
            <p className="mt-2">Pour supprimer :</p>
            <pre className="bg-black/30 rounded p-2 mt-2 font-mono text-xs">ip addr flush dev eth0</pre>
          </Spoiler>
        </Spoiler>

        <Spoiler title="Vérifier et diagnostiquer" level={1}>
          <Spoiler title="ip addr — interfaces et IP" level={2}>
            <p><strong>ip addr</strong> (ou <strong>ip a</strong>) : affiche les interfaces et leurs adresses IP.</p>
            <pre className="bg-black/30 rounded p-2 mt-2 font-mono text-xs">ip addr</pre>
          </Spoiler>
          <Spoiler title="arp — cache ARP" level={2}>
            <p><strong>arp</strong> : affiche la correspondance IP ↔ adresse MAC des machines directement connectées.</p>
            <pre className="bg-black/30 rounded p-2 mt-2 font-mono text-xs">arp</pre>
          </Spoiler>
        </Spoiler>

        <Spoiler title="Config volatile vs persistante" level={1}>
          <p><strong>Volatile</strong> : la config est perdue au redémarrage (dhclient, ip addr add).</p>
          <p><strong>Persistante</strong> : sauvegardée. Tape <code>save</code> pour copier la config actuelle, puis <code>reboot</code> pour redémarrer — la config persistante sera réappliquée.</p>
        </Spoiler>
      </Spoiler>

      {/* ========== SECTION 2 : ROUTAGE (déployable avec sous-sections) ========== */}
      <Spoiler title="2. Routage" level={0}>
        <Spoiler title="C&apos;est quoi le routage ?" level={1}>
          <p>
            Quand tu envoies un message à une machine sur un <strong>autre</strong> réseau, ton PC ne sait pas comment l&apos;atteindre directement. 
            Il envoie le paquet à un <strong>routeur</strong> (passerelle), qui le fait suivre jusqu&apos;à la destination.
          </p>
          <p className="mt-2">
            Le <strong>routage</strong> = l&apos;art de faire voyager les paquets à travers plusieurs réseaux.
          </p>
        </Spoiler>

        <Spoiler title="Table de routage (route -n)" level={1}>
          <p>
            Chaque machine a une <strong>table de routage</strong> : « Pour aller au réseau X, passer par la machine Y ».
          </p>
          <pre className="bg-black/30 rounded p-2 mt-2 font-mono text-xs">route -n</pre>
          <p className="mt-2">
            La <strong>passerelle par défaut</strong> (0.0.0.0) : le routeur utilisé pour toutes les destinations non listées.
          </p>
        </Spoiler>

        <Spoiler title="Outils de test" level={1}>
          <Spoiler title="ping — tester la connectivité" level={2}>
            <p><strong>ping</strong> : envoie un paquet et vérifie si la machine répond.</p>
            <pre className="bg-black/30 rounded p-2 mt-2 font-mono text-xs">ping 192.168.3.2   # Depuis PC1 : atteint PC2 via R1 puis R2</pre>
          </Spoiler>
          <Spoiler title="traceroute — chemin parcouru" level={2}>
            <p><strong>traceroute</strong> : affiche le chemin parcouru (chaque routeur traversé).</p>
            <pre className="bg-black/30 rounded p-2 mt-2 font-mono text-xs">traceroute 192.168.3.2   # Affiche : PC1 → R1 → R2 → PC2</pre>
          </Spoiler>
        </Spoiler>
      </Spoiler>

      {/* ========== SECTION 3 : NAT ========== */}
      <Spoiler title="3. NAT (Traduction d&apos;adresses)" level={0}>
        <Spoiler title="À quoi sert le NAT ?" level={1}>
          <p>
            En entreprise ou chez toi, les machines ont des IP <strong>privées</strong> (192.168.x.x, 10.x.x.x) qui ne sont pas routables sur Internet.
          </p>
          <p className="mt-2">
            Le <strong>NAT</strong> (Network Address Translation) permet à plusieurs machines de partager une seule IP publique. 
            Le routeur « traduit » : il modifie l&apos;adresse source des paquets sortants (masquerade) et mémorise les connexions pour renvoyer les réponses aux bons clients.
          </p>
          <p className="mt-2 text-foreground/60">
            Commande typique (sur un vrai Linux) : <code>iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE</code>
          </p>
          <p className="mt-2 text-foreground/50 text-xs">Non simulé ici — à pratiquer sur Marionnet.</p>
        </Spoiler>
      </Spoiler>

      {/* ========== SECTION 4 : PONT ========== */}
      <Spoiler title="4. Pont (Bridge)" level={0}>
        <Spoiler title="C&apos;est quoi un pont ?" level={1}>
          <p>
            Un <strong>pont</strong> (bridge) relie deux segments de réseau au niveau couche 2 (Ethernet). 
            Les deux côtés forment un seul réseau logique : les machines peuvent communiquer comme si elles étaient sur le même câble.
          </p>
          <p className="mt-2">
            À la différence d&apos;un routeur, un pont ne fait pas de routage IP : il transmet les trames en fonction des adresses MAC.
          </p>
          <p className="mt-2 text-foreground/60">
            Commandes typiques : <code>brctl addbr br0</code>, <code>brctl addif br0 eth0</code>
          </p>
          <p className="mt-2 text-foreground/50 text-xs">Non simulé ici — à pratiquer sur Marionnet.</p>
        </Spoiler>
      </Spoiler>

      {/* ========== SECTION 5 : VLAN ========== */}
      <Spoiler title="5. VLAN" level={0}>
        <Spoiler title="C&apos;est quoi un VLAN ?" level={1}>
          <p>
            Un <strong>VLAN</strong> (Virtual LAN) découpe un réseau physique en plusieurs réseaux virtuels. 
            Des machines sur le même switch peuvent être isolées : le VLAN 10 ne voit pas le VLAN 20, même s&apos;ils partagent les câbles.
          </p>
          <p className="mt-2">Utile pour séparer les services (bureaux, serveurs, invités) ou la sécurité.</p>
          <p className="mt-2 text-foreground/60">
            Sur Linux : <code>ip link add link eth0 name eth0.10 type vlan id 10</code>
          </p>
          <p className="mt-2 text-foreground/50 text-xs">Non simulé ici — à pratiquer sur Marionnet.</p>
        </Spoiler>
      </Spoiler>

      {/* ========== RÉCAPITULATIF ========== */}
      <Spoiler title="Récapitulatif — Commandes utiles" level={0}>
        <pre className="bg-black/30 rounded p-2 font-mono text-xs overflow-x-auto">
{`ip addr          ip addr add X/X dev eth0
route -n         arp
ping X.X.X.X     traceroute X.X.X.X
dig google.fr    save    reboot    help`}
        </pre>
      </Spoiler>
    </div>
  );
}
