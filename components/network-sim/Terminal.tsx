"use client";

import { useState, useRef, useEffect } from "react";

interface TerminalProps {
  nodeId: string;
  nodeLabel: string;
  nodeType: string;
  interfaces: string[];
  config: { [iface: string]: string };
  hostname: string;
  history: { cmd: string; output: string }[];
  onAddToHistory: (cmd: string, output: string) => void;
  onClearHistory: () => void;
  onCommand: (line: string) => string;
  onClose: () => void;
}

export function Terminal({
  nodeId,
  nodeLabel,
  nodeType,
  interfaces,
  config,
  hostname,
  history,
  onAddToHistory,
  onClearHistory,
  onCommand,
  onClose,
}: TerminalProps) {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const line = input.trim();
    if (!line) return;

    if (line.toLowerCase() === "clear") {
      onClearHistory();
      setInput("");
      return;
    }

    const output = onCommand(line);
    onAddToHistory(line, output);
    setInput("");
  };

  return (
    <div className="bg-[#0a0a0a] rounded-xl border border-white/10 overflow-hidden flex flex-col h-[360px]">
      <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10">
        <span className="text-sm font-mono text-tech-blue">
          {hostname}@{nodeLabel} ({nodeType})
        </span>
        <button
          onClick={onClose}
          className="text-foreground/50 hover:text-foreground text-lg leading-none"
        >
          ×
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-3 font-mono text-xs text-foreground/90 space-y-1">
          <div className="text-foreground/50 text-[10px] mb-2">
          Commandes : ip, route, arp, ping, traceroute, dig, dhclient, iptables, save, reboot, help
          </div>
        {history.map((h, i) => (
          <div key={i} className="space-y-1">
            <div className="text-success-green">
              {hostname}@{nodeLabel}:~$ {h.cmd}
            </div>
            <pre className="text-foreground/80 whitespace-pre-wrap break-all">
              {h.output}
            </pre>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex border-t border-white/10">
        <span className="px-3 py-2 text-success-green text-xs">
          {hostname}@{nodeLabel}:~$
        </span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent px-2 py-2 text-foreground text-xs outline-none font-mono"
          spellCheck={false}
          autoComplete="off"
        />
      </form>
    </div>
  );
}
