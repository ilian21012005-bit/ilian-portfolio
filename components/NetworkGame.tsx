"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Route, RotateCcw, Trophy } from "lucide-react";

// Graph: nodes with positions (x, y) and connections - Réseau étendu
const NODES = [
  { id: "source", label: "Client", x: 60, y: 120, type: "client" as const },
  // Couche 1
  { id: "r1", label: "R1", x: 180, y: 50, type: "router" as const },
  { id: "r2", label: "R2", x: 180, y: 120, type: "router" as const },
  { id: "r3", label: "R3", x: 180, y: 190, type: "router" as const },
  // Couche 2
  { id: "r4", label: "R4", x: 320, y: 70, type: "router" as const },
  { id: "r5", label: "R5", x: 320, y: 120, type: "router" as const },
  { id: "r6", label: "R6", x: 320, y: 170, type: "router" as const },
  // Couche 3
  { id: "r7", label: "R7", x: 460, y: 70, type: "router" as const },
  { id: "r8", label: "R8", x: 460, y: 120, type: "router" as const },
  { id: "r9", label: "R9", x: 460, y: 170, type: "router" as const },
  // Couche 4
  { id: "r10", label: "R10", x: 580, y: 90, type: "router" as const },
  { id: "r11", label: "R11", x: 580, y: 150, type: "router" as const },
  { id: "dest", label: "Serveur", x: 700, y: 120, type: "server" as const },
];

const EDGES: [string, string][] = [
  // Client → Couche 1
  ["source", "r1"], ["source", "r2"], ["source", "r3"],
  // Couche 1 interne
  ["r1", "r2"], ["r2", "r3"],
  // Couche 1 → Couche 2
  ["r1", "r4"], ["r1", "r5"], ["r2", "r4"], ["r2", "r5"], ["r2", "r6"], ["r3", "r5"], ["r3", "r6"],
  // Couche 2 interne
  ["r4", "r5"], ["r5", "r6"],
  // Couche 2 → Couche 3
  ["r4", "r7"], ["r4", "r8"], ["r5", "r7"], ["r5", "r8"], ["r5", "r9"], ["r6", "r8"], ["r6", "r9"],
  // Couche 3 interne
  ["r7", "r8"], ["r8", "r9"],
  // Couche 3 → Couche 4
  ["r7", "r10"], ["r7", "r11"], ["r8", "r10"], ["r8", "r11"], ["r9", "r10"], ["r9", "r11"],
  // Couche 4 → Serveur
  ["r10", "dest"], ["r11", "dest"], ["r10", "r11"],
];

function getNeighbors(nodeId: string): string[] {
  return EDGES
    .flatMap(([a, b]) => (a === nodeId ? [b] : b === nodeId ? [a] : []))
    .filter((id) => id !== nodeId);
}

const OPTIMAL_HOPS = 5; // source -> r1 -> r4 -> r7 -> r10 -> dest

export function NetworkGame() {
  const [currentNode, setCurrentNode] = useState("source");
  const [path, setPath] = useState<string[]>(["source"]);
  const [isWon, setIsWon] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const currentNodeData = NODES.find((n) => n.id === currentNode)!;
  const neighbors = getNeighbors(currentNode);
  const canClick = !isAnimating && !isWon;

  const handleNodeClick = (nodeId: string) => {
    if (!canClick || !neighbors.includes(nodeId)) return;

    setIsAnimating(true);
    setPath((prev) => [...prev, nodeId]);
    setCurrentNode(nodeId);

    setTimeout(() => {
      setIsAnimating(false);
      if (nodeId === "dest") {
        setIsWon(true);
      }
    }, 400);
  };

  const handleReset = () => {
    setCurrentNode("source");
    setPath(["source"]);
    setIsWon(false);
    setIsAnimating(false);
  };

  return (
    <section id="game" className="py-24 px-6 bg-white/[0.01]">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-4"
        >
          <div className="p-2 rounded-xl bg-tech-blue/20">
            <Route className="w-8 h-8 text-tech-blue" />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Packet Routing
            </h2>
            <p className="text-foreground/60 text-sm">
              Route le paquet du client jusqu&apos;au serveur
            </p>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-foreground/70 mb-6"
        >
          Clique sur les routeurs connectés pour faire voyager le paquet. Trouve le chemin le plus court !
        </motion.p>

        <AnimatePresence mode="wait">
          {isWon ? (
            <motion.div
              key="won"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="glass rounded-2xl p-8 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="inline-flex p-4 rounded-full bg-success-green/20 mb-4"
              >
                <Trophy className="w-16 h-16 text-success-green" />
              </motion.div>
              <h3 className="text-2xl font-bold text-success-green mb-2">
                Paquet livré !
              </h3>
              <p className="text-foreground/80 mb-2">
                {path.length} sauts — {path.length <= OPTIMAL_HOPS + 1 ? "Chemin optimal !" : "Bien joué !"}
              </p>
              <p className="text-foreground/50 text-sm mb-6">
                Chemin emprunté : {path.join(" → ")}
              </p>
              <motion.button
                onClick={handleReset}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-tech-blue text-white font-medium"
              >
                <RotateCcw className="w-5 h-5" />
                Rejouer
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="game"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="glass rounded-2xl p-6 md:p-8 overflow-hidden"
            >
              {/* Stats */}
              <div className="flex justify-between items-center mb-6">
                <span className="text-sm text-foreground/60">
                  Sauts : <strong className="text-tech-blue">{path.length}</strong>
                </span>
                <button
                  onClick={handleReset}
                  className="p-2 rounded-lg glass-hover text-foreground/70"
                  title="Recommencer"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
              </div>

              {/* Network diagram */}
              <div className="relative w-full aspect-[16/9] min-h-[280px]">
                <svg
                  viewBox="0 0 760 250"
                  className="w-full h-full"
                  preserveAspectRatio="xMidYMid meet"
                >
                  {/* Edges */}
                  <g>
                    {EDGES.map(([a, b], i) => {
                      const nodeA = NODES.find((n) => n.id === a)!;
                      const nodeB = NODES.find((n) => n.id === b)!;
                      const inPath =
                        path.includes(a) && path[path.indexOf(a) + 1] === b;
                      return (
                        <line
                          key={i}
                          x1={nodeA.x}
                          y1={nodeA.y}
                          x2={nodeB.x}
                          y2={nodeB.y}
                          stroke={inPath ? "#3B82F6" : "rgba(255,255,255,0.15)"}
                          strokeWidth={inPath ? 3 : 1.5}
                          className="transition-all duration-300"
                        />
                      );
                    })}
                  </g>

                  {/* Nodes */}
                  {NODES.map((node) => {
                    const isCurrent = currentNode === node.id;
                    const isNeighbor = neighbors.includes(node.id);
                    const isClickable = canClick && isNeighbor;
                    const inPath = path.includes(node.id);

                    return (
                      <g key={node.id}>
                        <motion.circle
                          cx={node.x}
                          cy={node.y}
                          r={node.type === "router" ? 12 : 16}
                          fill={
                            node.type === "client"
                              ? "rgba(59, 130, 246, 0.3)"
                              : node.type === "server"
                              ? "rgba(16, 185, 129, 0.3)"
                              : "rgba(255,255,255,0.05)"
                          }
                          stroke={
                            isCurrent
                              ? "#3B82F6"
                              : isClickable
                              ? "rgba(59, 130, 246, 0.6)"
                              : inPath
                              ? "rgba(59, 130, 246, 0.4)"
                              : "rgba(255,255,255,0.2)"
                          }
                          strokeWidth={isCurrent ? 3 : 1.5}
                          className="cursor-pointer transition-all"
                          onClick={() => handleNodeClick(node.id)}
                          style={{
                            cursor: isClickable ? "pointer" : "default",
                            filter: isClickable ? "drop-shadow(0 0 8px rgba(59,130,246,0.5))" : "none",
                          }}
                          whileHover={isClickable ? { scale: 1.15 } : {}}
                          animate={{
                            scale: isCurrent ? [1, 1.1, 1] : 1,
                            transition: { duration: 0.5, repeat: isCurrent && isAnimating ? Infinity : 0 },
                          }}
                        />
                        <text
                          x={node.x}
                          y={node.y + (node.type === "router" ? 28 : 32)}
                          textAnchor="middle"
                          className="fill-foreground/80 text-[9px] font-medium"
                        >
                          {node.label}
                        </text>
                      </g>
                    );
                  })}

                  {/* Animated packet */}
                  <motion.g
                    initial={false}
                    animate={{
                      x: currentNodeData.x,
                      y: currentNodeData.y,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  >
                    <motion.circle
                      r={8}
                      fill="#3B82F6"
                      animate={{ opacity: [1, 0.6, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  </motion.g>
                </svg>
              </div>

              {/* Instructions */}
              <p className="text-center text-xs text-foreground/50 mt-4">
                {currentNode === "source"
                  ? "Clique sur R1, R2 ou R3 pour démarrer"
                  : currentNode === "dest"
                  ? ""
                  : `Routeurs disponibles : ${neighbors.map((n) => NODES.find((x) => x.id === n)?.label).join(", ")}`}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
