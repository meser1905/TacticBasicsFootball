"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { formationsForFormat, groupFormationsByCategory } from "@/lib/formations";
import { usePlayersStore } from "@/stores/playersStore";
import { useEditorStore } from "@/stores/editorStore";
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
  const format = useEditorStore((s) => s.pitchFormat);
  const [open, setOpen] = useState(false);

  const list = formationsForFormat(format);
  const current = list.find((f) => f.id === currentId) ?? list[0];
  if (!current) return null;

  const groups = groupFormationsByCategory(format);

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
            className="absolute left-0 top-full z-20 mt-2 max-h-[70vh] w-[360px] overflow-y-auto rounded-lg border border-border bg-card shadow-xl"
          >
            {groups.map((group) => (
              <div key={group.category}>
                <div className="sticky top-0 z-10 border-b border-border bg-card/95 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground backdrop-blur">
                  {group.label}
                </div>
                {group.items.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => {
                      loadFormation(f, team);
                      setOpen(false);
                    }}
                    className={cn(
                      "block w-full px-4 py-2.5 text-left transition hover:bg-secondary",
                      f.id === currentId && "bg-secondary",
                    )}
                  >
                    <div className="text-sm font-semibold">{f.name}</div>
                    <div className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
                      {f.description}
                    </div>
                  </button>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
