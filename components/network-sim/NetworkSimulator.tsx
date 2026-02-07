"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Monitor, Cable, Route } from "lucide-react";
import { RadarScan } from "../backgrounds/RadarScan";
import { SectionWrapper } from "../SectionWrapper";
import { Oscilloscope } from "../Oscilloscope";
import { NODES, LINKS, getConnectedNode, parseCidr, sameSubnet, getMac } from "./topology";
import { SIMULATED_DNS } from "./types";
import { Terminal } from "./Terminal";
import { Guide } from "./Guide";
import type { MachineState } from "./types";

const INITIAL_STATE: Record<string, MachineState> = {
  pc1: { volatile: {}, persistent: {}, hostname: "user" },
  pc2: { volatile: {}, persistent: {}, hostname: "user" },
  pc3: { volatile: {}, persistent: {}, hostname: "user" },
  router: { volatile: {}, persistent: {}, hostname: "root" },
  router2: { volatile: {}, persistent: {}, hostname: "root" },
};

function findNodeWithIp(
  states: Record<string, MachineState>,
  targetIp: string
): { nodeId: string; iface: string; cidr: string } | null {
  for (const [nodeId, state] of Object.entries(states)) {
    const config = { ...state.volatile, ...state.persistent };
    for (const [iface, cidr] of Object.entries(config)) {
      const parsed = parseCidr(cidr);
      if (parsed && parsed.ip === targetIp) return { nodeId, iface, cidr };
    }
  }
  return null;
}

function getConfig(nodeId: string, states: Record<string, MachineState>) {
  const s = states[nodeId];
  return { ...s.persistent, ...s.volatile };
}

function canReach(
  from: string,
  to: string,
  states: Record<string, MachineState>,
  visited: Set<string> = new Set()
): boolean {
  if (from === to) return true;
  if (visited.has(from)) return false;
  visited.add(from);

  const node = NODES.find((n) => n.id === from);
  if (!node) return false;

  for (const iface of node.interfaces) {
    const conn = getConnectedNode(from, iface, LINKS);
    if (!conn) continue;

    const fromConfig = getConfig(from, states);
    const toConfig = getConfig(conn.nodeId, states);
    const fromIp = fromConfig[iface];
    const toIp = toConfig[conn.iface];

    if (!fromIp || !toIp) continue;
    const p1 = parseCidr(fromIp);
    const p2 = parseCidr(toIp);
    if (!p1 || !p2 || !sameSubnet(p1.ip, p2.ip, p1.prefix))
      continue;

    if (canReach(conn.nodeId, to, states, visited)) return true;
  }
  return false;
}

function getPath(
  from: string,
  to: string,
  states: Record<string, MachineState>,
  path: string[] = []
): string[] | null {
  if (from === to) return [...path, to];
  if (path.includes(from)) return null;

  const node = NODES.find((n) => n.id === from);
  if (!node) return null;

  for (const iface of node.interfaces) {
    const conn = getConnectedNode(from, iface, LINKS);
    if (!conn) continue;

    const fromConfig = getConfig(from, states);
    const toConfig = getConfig(conn.nodeId, states);
    const fromIp = fromConfig[iface];
    const toIp = toConfig[conn.iface];

    if (!fromIp || !toIp) continue;
    const p1 = parseCidr(fromIp);
    const p2 = parseCidr(toIp);
    if (!p1 || !p2 || !sameSubnet(p1.ip, p2.ip, p1.prefix)) continue;

    const result = getPath(conn.nodeId, to, states, [...path, from]);
    if (result) return result;
  }
  return null;
}

export function NetworkSimulator() {
  const [states, setStates] = useState<Record<string, MachineState>>(INITIAL_STATE);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [terminalHistory, setTerminalHistory] = useState<Record<string, { cmd: string; output: string }[]>>({});

  const handleCommand = useCallback(
    (nodeId: string, line: string): string => {
      const parts = line.trim().split(/\s+/);
      const cmd = parts[0].toLowerCase();
      const args = parts.slice(1);
      const node = NODES.find((n) => n.id === nodeId)!;
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
        if (devIdx === -1 || !args[devIdx + 1])
          return "Usage: ip addr add <ip>/<cidr> dev <interface>";
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
        if (devIdx === -1 || !args[devIdx + 1])
          return "Usage: ip addr flush dev <interface>";
        const iface = args[devIdx + 1];
        setStates((s) => ({
          ...s,
          [nodeId]: {
            ...s[nodeId],
            volatile: Object.fromEntries(
              Object.entries(s[nodeId].volatile).filter(([k]) => k !== iface)
            ),
          },
        }));
        return `Interface ${iface} flushed`;
      }

      // ping <ip>
      if (cmd === "ping" && args[0]) {
        const target = findNodeWithIp(states, args[0]);
        if (!target) return `PING ${args[0]}: destination unreachable (host inconnu)`;
        if (!canReach(nodeId, target.nodeId, states))
          return `PING ${args[0]}: destination unreachable (pas de route)`;
        return `64 bytes from ${args[0]}: icmp_seq=1 ttl=64 time=1.2 ms\n--- ${args[0]} ping statistics ---\n1 packets transmitted, 1 received, 0% packet loss`;
      }

      // dhclient <iface>
      if (cmd === "dhclient" && args[0]) {
        const iface = args[0];
        if (!node.interfaces.includes(iface)) return `Interface ${iface} inconnue`;
        const conn = getConnectedNode(nodeId, iface, LINKS);
        if (!conn) return `Pas de lien sur ${iface}`;

        // Simulated DHCP
        const dhcpMap: Record<string, Record<string, string>> = {
          pc1: { eth0: "192.168.1.2/24" },
          pc2: { eth0: "192.168.3.2/24" },
          pc3: { eth0: "192.168.4.2/24" },
          router: { eth0: "192.168.1.1/24", eth1: "192.168.2.1/24", eth2: "192.168.4.1/24" },
          router2: { eth0: "192.168.2.2/24", eth1: "192.168.3.1/24" },
        };
        const ip = dhcpMap[nodeId]?.[iface];
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
        setStates((s) => ({
          ...s,
          [nodeId]: { ...s[nodeId], hostname: args[0] },
        }));
        return "";
      }

      // save
      if (cmd === "save") {
        setStates((s) => ({
          ...s,
          [nodeId]: {
            ...s[nodeId],
            persistent: { ...s[nodeId].volatile },
          },
        }));
        return "Configuration sauvegardée (persistante)";
      }

      // reboot
      if (cmd === "reboot") {
        setStates((s) => ({
          ...s,
          [nodeId]: {
            ...s[nodeId],
            volatile: { ...s[nodeId].persistent },
          },
        }));
        return "Redémarrage... Configuration volatile effacée, configuration persistante appliquée.";
      }

      // ip route show / ip route / route -n
      if ((cmd === "ip" && (args[0] === "route" || args[0] === "r")) || cmd === "route") {
        if (cmd === "route" && args[0] && !["-n", "-C", "-e"].includes(args[0])) return "Usage: route -n";
        let out = "Destination     Gateway         Genmask         Iface\n";
        for (const iface of node.interfaces) {
          const ip = config[iface];
          if (ip) {
            const parsed = parseCidr(ip);
            if (parsed) {
              const parts = parsed.ip.split(".");
              const net = `${parts[0]}.${parts[1]}.${parts[2]}.0`;
              const mask = parsed.prefix === 24 ? "255.255.255.0" : "255.255.255.255";
              out += `${net.padEnd(16)}0.0.0.0${"".padEnd(12)}${mask.padEnd(16)}${iface}\n`;
            }
          }
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
        const domain = args.filter((a) => !a.startsWith("@") && !a.startsWith("-"))[0]?.replace(/[;.]$/, "") || "";
        const resolved = SIMULATED_DNS[domain] || SIMULATED_DNS[`www.${domain}`];
        if (!resolved) return `;; ANSWER SECTION:\n${domain}.\t\t0\tIN\tA\t(non trouvé - simulation)\n\nDomaines simulés: google.fr, www.google.fr, u-psud.fr, iut-orsay.u-psud.fr`;
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
      if (cmd === "help") {
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

      return `Commande inconnue: ${cmd}. Tapez 'help' pour l'aide.`;
    },
    [states]
  );

  const wrappedHandleCommand = useCallback(
    (nodeId: string) => (line: string) => handleCommand(nodeId, line),
    [handleCommand]
  );

  return (
    <SectionWrapper id="game" className="bg-white/[0.01]">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center gap-4 mb-6 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 font-mono text-sm text-foreground/60"
        >
          <span className="flex items-center gap-2">
            <RadarScan size={28} />
            <span>Topologie : PC1 — R1 — R2 — PC2, PC3 sur R1</span>
          </span>
          <span className="text-white/30">|</span>
          <span>4 sous-réseaux 192.168.1–4.0/24</span>
          <span className="text-white/30">|</span>
          <span className="flex items-center gap-1.5">
            <Cable className="w-4 h-4 text-tech-blue/80" />
            2 routeurs
          </span>
        </motion.div>
        <div className="mb-6">
          <Oscilloscope />
        </div>

        {/* Guide en spoilers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl p-6 mb-6 border border-white/10 bg-white/[0.02] hover:border-tech-blue/20 transition-colors"
        >
          <Guide />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Topology */}
          <div className="lg:col-span-2 rounded-2xl p-6 border border-white/10 bg-white/[0.02] hover:border-tech-blue/20 transition-colors">
            <div className="relative w-full aspect-[16/10] min-h-[260px]">
              <svg viewBox="0 0 600 280" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
                <defs>
                  {/* Gradient 3D sphère - bleu (routeur) */}
                  <radialGradient id="grad3d-router" cx="35%" cy="35%" r="65%">
                    <stop offset="0%" stopColor="#60a5fa" />
                    <stop offset="50%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#1d4ed8" />
                  </radialGradient>
                  {/* Gradient 3D sphère - gris (PC) */}
                  <radialGradient id="grad3d-pc" cx="35%" cy="35%" r="65%">
                    <stop offset="0%" stopColor="#94a3b8" />
                    <stop offset="50%" stopColor="#64748b" />
                    <stop offset="100%" stopColor="#334155" />
                  </radialGradient>
                  {/* Gradient 3D - sélectionné */}
                  <radialGradient id="grad3d-selected" cx="35%" cy="35%" r="65%">
                    <stop offset="0%" stopColor="#93c5fd" />
                    <stop offset="50%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#1e40af" />
                  </radialGradient>
                  {/* Ombre portée 3D */}
                  <filter id="shadow3d" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000" floodOpacity="0.5" />
                  </filter>
                  {/* Glow sélection */}
                  <filter id="glow-select" x="-100%" y="-100%" width="300%" height="300%">
                    <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#3b82f6" floodOpacity="0.6" />
                  </filter>
                </defs>
                {LINKS.map((link, i) => {
                  const fromNode = NODES.find((n) => n.id === link.from)!;
                  const toNode = NODES.find((n) => n.id === link.to)!;
                  return (
                    <line
                      key={i}
                      x1={fromNode.x}
                      y1={fromNode.y}
                      x2={toNode.x}
                      y2={toNode.y}
                      stroke="rgba(59, 130, 246, 0.3)"
                      strokeWidth={2}
                    />
                  );
                })}
                {NODES.map((node) => {
                  const isSelected = selectedNode === node.id;
                  const hasConfig = Object.keys(getConfig(node.id, states)).length > 0;
                  const isRouter = node.type === "router";
                  const gradId = isSelected ? "grad3d-selected" : isRouter ? "grad3d-router" : "grad3d-pc";
                  return (
                    <g key={node.id}>
                      <motion.g
                        onClick={() => setSelectedNode(node.id)}
                        style={{ cursor: "pointer" }}
                        whileHover={{ scale: 1.15 }}
                        animate={{ scale: isSelected ? 1.08 : 1 }}
                        filter={isSelected ? "url(#glow-select)" : undefined}
                      >
                        {/* Ombre au sol (ellipse 3D) */}
                        <ellipse
                          cx={node.x + 2}
                          cy={node.y + 40}
                          rx={30}
                          ry={6}
                          fill="rgba(0,0,0,0.35)"
                        />
                        {/* Cercle principal 3D avec gradient */}
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r={34}
                          fill={`url(#${gradId})`}
                          stroke={isSelected ? "#93c5fd" : "rgba(255,255,255,0.3)"}
                          strokeWidth={isSelected ? 2.5 : 1}
                        />
                        {/* Reflet (highlight) pour effet 3D */}
                        <ellipse
                          cx={node.x - 10}
                          cy={node.y - 10}
                          rx={8}
                          ry={5}
                          fill="rgba(255,255,255,0.4)"
                        />
                        <text
                          x={node.x}
                          y={node.y + 5}
                          textAnchor="middle"
                          className="fill-white text-xl font-bold"
                          style={{ textShadow: "0 1px 2px rgba(0,0,0,0.5)" }}
                        >
                          {node.type === "router" ? "R" : node.type === "switch" ? "S" : "P"}
                        </text>
                        <text x={node.x} y={node.y + 52} textAnchor="middle" className="fill-foreground/90 text-xs font-medium">
                          {node.label}
                          {hasConfig && " ●"}
                        </text>
                      </motion.g>
                    </g>
                  );
                })}
              </svg>
            </div>
            <p className="text-center text-xs text-foreground/50 mt-2">
              ● = machine configurée
            </p>
          </div>

          {/* Terminal */}
          <div className="lg:col-span-1">
            <AnimatePresence mode="wait">
              {selectedNode ? (
                <motion.div
                  key={selectedNode}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="h-full"
                >
                  <Terminal
                    nodeId={selectedNode}
                    nodeLabel={NODES.find((n) => n.id === selectedNode)!.label}
                    nodeType={NODES.find((n) => n.id === selectedNode)!.type}
                    interfaces={NODES.find((n) => n.id === selectedNode)!.interfaces}
                    config={getConfig(selectedNode, states)}
                    hostname={states[selectedNode].hostname}
                    history={terminalHistory[selectedNode] || []}
                    onAddToHistory={(cmd, output) =>
                      setTerminalHistory((h) => ({
                        ...h,
                        [selectedNode]: [...(h[selectedNode] || []), { cmd, output }],
                      }))
                    }
                    onClearHistory={() =>
                      setTerminalHistory((h) => ({ ...h, [selectedNode]: [] }))
                    }
                    onCommand={wrappedHandleCommand(selectedNode)}
                    onClose={() => setSelectedNode(null)}
                  />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-2xl p-8 h-[360px] flex flex-col items-center justify-center text-center border border-white/10 bg-white/[0.02] border-dashed"
                >
                  <Monitor className="w-16 h-16 text-foreground/20 mb-4" />
                  <p className="text-foreground/60 text-sm">
                    Clique sur une machine
                  </p>
                  <p className="text-foreground/40 text-xs mt-1">
                    pour ouvrir son terminal
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
