import { NODES, LINKS, getConnectedNode, parseCidr, sameSubnet } from "./topology";
import type { MachineState } from "./types";

export const INITIAL_STATE: Record<string, MachineState> = {
  pc1: { volatile: {}, persistent: {}, hostname: "user" },
  pc2: { volatile: {}, persistent: {}, hostname: "user" },
  pc3: { volatile: {}, persistent: {}, hostname: "user" },
  router: { volatile: {}, persistent: {}, hostname: "root" },
  router2: { volatile: {}, persistent: {}, hostname: "root" },
};

export function getConfig(nodeId: string, states: Record<string, MachineState>) {
  const s = states[nodeId];
  return { ...s.persistent, ...s.volatile };
}

export function findNodeWithIp(
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

export function canReach(
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
    if (!p1 || !p2 || !sameSubnet(p1.ip, p2.ip, p1.prefix)) continue;

    if (canReach(conn.nodeId, to, states, visited)) return true;
  }
  return false;
}

export function getPath(
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

