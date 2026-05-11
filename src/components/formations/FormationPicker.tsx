"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { formations } from "@/lib/formations";
import { usePlayersStore } from "@/stores/playersStore";
import { cn } from "@/lib/utils";
import type { Side } from "@/types";

type Props = {
  team: Side;
};

export function FormationPicker({ team }: Props) {
  const loadFormation = usePlayersStore((s) => s.loadFormation);
  const currentId = usePlayersStore((s) =>
    team === "home" ? s.homeFormationId : s.awayFormationId,
  );
  const [open, setOpen] = useState(false);

  const current = formations.find((f) => f.id === currentId) ?? formations[0];
  if (!current) return null;

  const teamLabel = team === "home" ? "Local" : "Visitante";
  const dotColor =
    team === "home" ? "bg-blue-400 shadow-blue-400/40" : "bg-red-400 shadow-red-400/40";
  const buttonStyle =
    team === "home"
      ? "border-blue-500/30 bg-blue-500/10 hover:bg-blue-500/20"
      : "border-red-500/30 bg-red-500/10 hover:bg-red-500/20";

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm font-medium text-foreground transition",
          buttonStyle,
        )}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={cn("h-2 w-2 rounded-full shadow-md", dotColor)} />
        <span className="text-muted-foreground">{teamLabel}</span>
        <span className="font-bold">{current.name}</span>
        <ChevronDown className="h-3.5 w-3.5 opacity-70" />
      </button>

      {open && (
        <>
          <button
            className="fixed inset-0 z-10 cursor-default"
            onClick={() => setOpen(false)}
            aria-label="Cerrar"
          />
          <div
            role="listbox"
            className="absolute left-0 top-full z-20 mt-2 min-w-[320px] overflow-hidden rounded-lg border border-border bg-card shadow-xl"
          >
            {formations.map((f) => (
              <button
                key={f.id}
                onClick={() => {
                  loadFormation(f, team);
                  setOpen(false);
                }}
                className={cn(
                  "block w-full px-4 py-3 text-left transition hover:bg-secondary",
                  f.id === currentId && "bg-secondary",
                )}
              >
                <div className="font-semibold">{f.name}</div>
                <div className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
                  {f.description}
                </div>
                <div className="mt-1 text-[10px] uppercase tracking-wide text-muted-foreground/70">
                  {f.famousFor}
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
