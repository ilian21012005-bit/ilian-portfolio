import type { NetworkNode, NetworkLink } from "./types";

// Topologie : PC1 -- R1 -- R2 -- PC2, avec PC3 sur R1 (4 sous-réseaux, 2 routeurs)
export const NODES: NetworkNode[] = [
  { id: "pc1", label: "PC1", type: "pc", interfaces: ["eth0"], x: 80, y: 120 },
  { id: "router", label: "R1", type: "router", interfaces: ["eth0", "eth1", "eth2"], x: 240, y: 120 },
  { id: "router2", label: "R2", type: "router", interfaces: ["eth0", "eth1"], x: 400, y: 120 },
  { id: "pc2", label: "PC2", type: "pc", interfaces: ["eth0"], x: 560, y: 120 },
  { id: "pc3", label: "PC3", type: "pc", interfaces: ["eth0"], x: 240, y: 220 },
];

export const LINKS: NetworkLink[] = [
  { from: "pc1", fromIf: "eth0", to: "router", toIf: "eth0" },
  { from: "router", fromIf: "eth1", to: "router2", toIf: "eth0" },
  { from: "router2", fromIf: "eth1", to: "pc2", toIf: "eth0" },
  { from: "router", fromIf: "eth2", to: "pc3", toIf: "eth0" },
];

export function getConnectedNode(
  nodeId: string,
  iface: string,
  links: NetworkLink[]
): { nodeId: string; iface: string } | null {
  const link = links.find(
    (l) =>
      (l.from === nodeId && l.fromIf === iface) ||
      (l.to === nodeId && l.toIf === iface)
  );
  if (!link) return null;
  if (link.from === nodeId) return { nodeId: link.to, iface: link.toIf };
  return { nodeId: link.from, iface: link.fromIf };
}

export function getInterfaceIp(
  config: { [iface: string]: string },
  iface: string
): string | null {
  return config[iface] || null;
}

export function parseCidr(cidr: string): { ip: string; prefix: number } | null {
  const match = cidr.match(/^(\d+\.\d+\.\d+\.\d+)\/(\d+)$/);
  if (!match) return null;
  return { ip: match[1], prefix: parseInt(match[2], 10) };
}

export function sameSubnet(ip1: string, ip2: string, prefix: number): boolean {
  const mask = (0xffffffff << (32 - prefix)) >>> 0;
  const a = ip1.split(".").reduce((acc, o) => (acc << 8) + parseInt(o, 10), 0) >>> 0;
  const b = ip2.split(".").reduce((acc, o) => (acc << 8) + parseInt(o, 10), 0) >>> 0;
  return (a & mask) === (b & mask);
}

// MAC simulées (TP5 ARP, services réseaux)
const MAC_BASE: Record<string, string> = {
  pc1: "02:00:00:00:01:01",
  pc2: "02:00:00:00:02:02",
  pc3: "02:00:00:00:03:03",
  router: "02:00:00:00:0a:0a",
  router2: "02:00:00:00:0b:0b",
};
export function getMac(nodeId: string, _iface?: string): string {
  return MAC_BASE[nodeId] || "02:00:00:00:ff:ff";
}
