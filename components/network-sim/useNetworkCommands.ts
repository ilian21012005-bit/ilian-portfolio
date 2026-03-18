"use client";

import { useCallback } from "react";
import { NODES, LINKS, getConnectedNode, parseCidr, getMac } from "./topology";
import { SIMULATED_DNS } from "./types";
import type { MachineState } from "./types";
import { canReach, findNodeWithIp, getConfig, getPath } from "./networkLogic";

const DHCP_MAP: Record<string, Record<string, string>> = {
  pc1: { eth0: "192.168.1.2/24" },
  pc2: { eth0: "192.168.3.2/24" },
  pc3: { eth0: "192.168.4.2/24" },
  router: { eth0: "192.168.1.1/24", eth1: "192.168.2.1/24", eth2: "192.168.4.1/24" },
  router2: { eth0: "192.168.2.2/24", eth1: "192.168.3.1/24" },
};

function helpText() {
  return `Config réseau (TP1, services):
  ip addr [add X/X dev eth0 | flush dev eth0]
  dhclient eth0          ip link set eth0 up

Routage (TP1):
  ip route / route -n    ip route add

Connectivité:
  ping <ip>              traceroute <ip>

ARP (TP5):
  arp                    ip neigh flush all

DNS (TP1, dig/nslookup):
  dig google.fr          nslookup u-psud.fr

Parefeu (TP2/TP3):
  iptables -L -v

Autres:
  hostname [nom]         save / reboot
  netstat -atu           clear / help`;
}

export function useNetworkCommands(
  states: Record<string, MachineState>,
  setStates: React.Dispatch<React.SetStateAction<Record<string, MachineState>>>
) {
  const handleCommand = useCallback(
    (nodeId: string, line: string): string => {
      const parts = line.trim().split(/\s+/);
      const cmd = (parts[0] || "").toLowerCase();
      const args = parts.slice(1);
      const node = NODES.find((n) => n.id === nodeId);
      if (!node) return "Machine inconnue (simulation).";

      const state = states[nodeId];
      const config = getConfig(nodeId, states);

      // ip addr / ip a
      if (cmd === "ip" && (args[0] === "addr" || args[0] === "a")) {
        let out = "";
        for (const iface of node.interfaces) {
          const ip = config[iface];
          out += `${iface}: ${ip || "<non configurée>"}\n`;
        }
        return out || "Aucune interface";
      }

      // ip addr add <ip>/<cidr> dev <iface>
      if (cmd === "ip" && args[0] === "addr" && args[1] === "add") {
        const devIdx = args.indexOf("dev");
        if (devIdx === -1 || !args[devIdx + 1]) return "Usage: ip addr add <ip>/<cidr> dev <interface>";
        const cidr = args[2];
        const iface = args[devIdx + 1];
        if (!node.interfaces.includes(iface)) return `Interface ${iface} inconnue`;
        if (!parseCidr(cidr)) return "Format IP invalide (ex: 192.168.1.1/24)";
        setStates((s) => ({
          ...s,
          [nodeId]: {
            ...s[nodeId],
            volatile: { ...s[nodeId].volatile, [iface]: cidr },
          },
        }));
        return `IP ${cidr} configurée sur ${iface} (volatile)`;
      }

      // ip addr flush dev <iface>
      if (cmd === "ip" && args[0] === "addr" && args[1] === "flush") {
        const devIdx = args.indexOf("dev");
        if (devIdx === -1 || !args[devIdx + 1]) return "Usage: ip addr flush dev <interface>";
        const iface = args[devIdx + 1];
        setStates((s) => ({
          ...s,
          [nodeId]: {
            ...s[nodeId],
            volatile: Object.fromEntries(Object.entries(s[nodeId].volatile).filter(([k]) => k !== iface)),
          },
        }));
        return `Interface ${iface} flushed`;
      }

      // ping <ip>
      if (cmd === "ping" && args[0]) {
        const target = findNodeWithIp(states, args[0]);
        if (!target) return `PING ${args[0]}: destination unreachable (host inconnu)`;
        if (!canReach(nodeId, target.nodeId, states)) return `PING ${args[0]}: destination unreachable (pas de route)`;
        return `64 bytes from ${args[0]}: icmp_seq=1 ttl=64 time=1.2 ms\n--- ${args[0]} ping statistics ---\n1 packets transmitted, 1 received, 0% packet loss`;
      }

      // dhclient <iface>
      if (cmd === "dhclient" && args[0]) {
        const iface = args[0];
        if (!node.interfaces.includes(iface)) return `Interface ${iface} inconnue`;
        const conn = getConnectedNode(nodeId, iface, LINKS);
        if (!conn) return `Pas de lien sur ${iface}`;

        const ip = DHCP_MAP[nodeId]?.[iface];
        if (!ip) return `Pas de config DHCP pour ${iface} sur cette machine`;
        setStates((s) => ({
          ...s,
          [nodeId]: {
            ...s[nodeId],
            volatile: { ...s[nodeId].volatile, [iface]: ip },
          },
        }));
        return `DHCP: adresse ${ip} obtenue sur ${iface} (volatile)`;
      }

      // hostname
      if (cmd === "hostname") {
        if (args.length === 0) return state.hostname;
        setStates((s) => ({ ...s, [nodeId]: { ...s[nodeId], hostname: args[0] } }));
        return "";
      }

      // save
      if (cmd === "save") {
        setStates((s) => ({
          ...s,
          [nodeId]: { ...s[nodeId], persistent: { ...s[nodeId].volatile } },
        }));
        return "Configuration sauvegardée (persistante)";
      }

      // reboot
      if (cmd === "reboot") {
        setStates((s) => ({
          ...s,
          [nodeId]: { ...s[nodeId], volatile: { ...s[nodeId].persistent } },
        }));
        return "Redémarrage... Configuration volatile effacée, configuration persistante appliquée.";
      }

      // ip route show / ip route / route -n
      if ((cmd === "ip" && (args[0] === "route" || args[0] === "r")) || cmd === "route") {
        if (cmd === "route" && args[0] && !["-n", "-C", "-e"].includes(args[0])) return "Usage: route -n";
        let out = "Destination     Gateway         Genmask         Iface\n";
        for (const iface of node.interfaces) {
          const ip = config[iface];
          if (!ip) continue;
          const parsed = parseCidr(ip);
          if (!parsed) continue;
          const parts2 = parsed.ip.split(".");
          const net = `${parts2[0]}.${parts2[1]}.${parts2[2]}.0`;
          const mask = parsed.prefix === 24 ? "255.255.255.0" : "255.255.255.255";
          out += `${net.padEnd(16)}0.0.0.0${"".padEnd(12)}${mask.padEnd(16)}${iface}\n`;
        }
        return out || "Table de routage vide. Configurez les interfaces (dhclient/ip addr add).";
      }

      // ip route add (simplifié)
      if (cmd === "ip" && args[0] === "route" && args[1] === "add") {
        return "Route ajoutée (simulation). Le routage utilise la topologie automatique.";
      }

      // arp -a / arp
      if (cmd === "arp") {
        let out = "Adresse                  HWtype  Adresse HW\n";
        const seen = new Set<string>();
        for (const iface of node.interfaces) {
          const conn = getConnectedNode(nodeId, iface, LINKS);
          if (!conn) continue;
          const connConfig = getConfig(conn.nodeId, states);
          const connIp = connConfig[conn.iface];
          if (!connIp || seen.has(connIp)) continue;
          seen.add(connIp);
          const mac = getMac(conn.nodeId);
          const ip = parseCidr(connIp)?.ip || connIp;
          out += `${ip.padEnd(24)}ether   ${mac}\n`;
        }
        return out || "Cache ARP vide. Configurez le réseau (dhclient/ip addr add) et faites un ping.";
      }

      // ip neigh flush all
      if (cmd === "ip" && args[0] === "neigh" && args[1] === "flush") {
        return "Cache ARP vidé (simulation).";
      }

      // traceroute <ip>
      if ((cmd === "traceroute" || cmd === "tracert") && args[0]) {
        const target = findNodeWithIp(states, args[0]);
        if (!target) return `traceroute: ${args[0]}: Host unreachable`;
        const path = getPath(nodeId, target.nodeId, states);
        if (!path) return `traceroute: ${args[0]}: No route to host`;
        let out = `traceroute to ${args[0]} (${args[0]}), 30 hops max\n`;
        path.forEach((nid, i) => {
          const n = NODES.find((x) => x.id === nid)!;
          const cfg = getConfig(nid, states);
          const nip = n.interfaces.map((ifc) => cfg[ifc]).find(Boolean);
          const ip = (nip ? parseCidr(nip)?.ip : undefined) ?? "?";
          out += ` ${i + 1}  ${ip.padEnd(15)} (${n.label})  1.2 ms\n`;
        });
        return out;
      }

      // dig / nslookup (TP1 DNS)
      if ((cmd === "dig" || cmd === "nslookup") && args.length > 0) {
        const domain =
          args.filter((a) => !a.startsWith("@") && !a.startsWith("-"))[0]?.replace(/[;.]$/, "") || "";
        const resolved = SIMULATED_DNS[domain] || SIMULATED_DNS[`www.${domain}`];
        if (!resolved)
          return `;; ANSWER SECTION:\n${domain}.\t\t0\tIN\tA\t(non trouvé - simulation)\n\nDomaines simulés: google.fr, www.google.fr, u-psud.fr, iut-orsay.u-psud.fr`;
        return `;; ANSWER SECTION:\n${domain}.\t\t300\tIN\tA\t${resolved[0]}\n\n;; Query time: 1 msec`;
      }

      // netstat -atu / ss -tuln
      if ((cmd === "netstat" || cmd === "ss") && (args.includes("-atu") || args.includes("-tuln") || args.includes("-tln"))) {
        return "Proto Recv-Q Send-Q Local           Foreign         State\n(Simulation: aucun service en écoute)";
      }

      // iptables -L -v
      if (cmd === "iptables" && (args.includes("-L") || args.length === 0)) {
        return `Chain INPUT (policy ACCEPT)\nChain FORWARD (policy ACCEPT)\nChain OUTPUT (policy ACCEPT)\n(Simulation: parefeu vide, tout est accepté)`;
      }

      // ip link set <iface> up/down
      if (cmd === "ip" && args[0] === "link") {
        return "Interface déjà active (simulation).";
      }

      // help
      if (cmd === "help") return helpText();

      return `Commande inconnue: ${cmd}. Tapez 'help' pour l'aide.`;
    },
    [states, setStates]
  );

  const wrappedHandleCommand = useCallback(
    (nodeId: string) => (line: string) => handleCommand(nodeId, line),
    [handleCommand]
  );

  return { handleCommand, wrappedHandleCommand };
}

