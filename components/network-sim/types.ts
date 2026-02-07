export type NodeType = "pc" | "router" | "switch";

export interface NetworkNode {
  id: string;
  label: string;
  type: NodeType;
  interfaces: string[];
  x: number;
  y: number;
}

export interface NetworkLink {
  from: string;
  fromIf: string;
  to: string;
  toIf: string;
}

export interface InterfaceConfig {
  [iface: string]: string; // "192.168.1.1/24"
}

export interface MachineState {
  volatile: InterfaceConfig;
  persistent: InterfaceConfig;
  hostname: string;
  routes?: { dest: string; gateway: string; iface: string }[];
}

// DNS simulé (TP1, DNS.pdf)
export const SIMULATED_DNS: Record<string, string[]> = {
  "google.fr": ["142.250.185.78"],
  "www.google.fr": ["142.250.185.78"],
  "u-psud.fr": ["129.175.12.10"],
  "iut-orsay.u-psud.fr": ["129.175.12.10"],
};
