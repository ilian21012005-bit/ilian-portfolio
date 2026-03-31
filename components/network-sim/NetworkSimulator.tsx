"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Monitor, Cable, Route } from "lucide-react";
import { RadarScan } from "../backgrounds/RadarScan";
import { SectionWrapper } from "../SectionWrapper";
import { Oscilloscope } from "../Oscilloscope";
import { NODES, LINKS, parseCidr } from "./topology";
import { Terminal } from "./Terminal";
import { Guide } from "./Guide";
import type { MachineState } from "./types";
import { INITIAL_STATE, getConfig } from "./networkLogic";
import { useNetworkCommands } from "./useNetworkCommands";

export function NetworkSimulator() {
  const [states, setStates] = useState<Record<string, MachineState>>(INITIAL_STATE);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [terminalHistory, setTerminalHistory] = useState<Record<string, { cmd: string; output: string }[]>>({});
  const { wrappedHandleCommand } = useNetworkCommands(states, setStates);

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
            <Cable className="w-4 h-4 text-accent/80" />
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
          className="rounded-2xl p-6 mb-6 border border-white/10 bg-white/[0.02] hover:border-accent/20 transition-colors"
        >
          <Guide />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Topology */}
          <div className="lg:col-span-2 rounded-2xl p-6 border border-white/10 bg-white/[0.02] hover:border-accent/20 transition-colors">
            <div className="relative w-full aspect-[16/10] min-h-[260px]">
              <svg viewBox="0 0 600 280" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
                <defs>
                  {/* Gradient 3D sphère - bleu (routeur) */}
                  <radialGradient id="grad3d-router" cx="35%" cy="35%" r="65%">
                    <stop offset="0%" stopColor="#60a5fa" />
                    <stop offset="50%" stopColor="rgb(var(--accent-rgb))" />
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
                    <stop offset="50%" stopColor="rgb(var(--accent-rgb))" />
                    <stop offset="100%" stopColor="#1e40af" />
                  </radialGradient>
                  {/* Ombre portée 3D */}
                  <filter id="shadow3d" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000" floodOpacity="0.5" />
                  </filter>
                  {/* Glow sélection */}
                  <filter id="glow-select" x="-100%" y="-100%" width="300%" height="300%">
                    <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="rgb(var(--accent-rgb))" floodOpacity="0.6" />
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
                      stroke="rgb(var(--accent-rgb) / 0.3)"
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
