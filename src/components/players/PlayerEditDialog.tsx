"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useEditorStore } from "@/stores/editorStore";
import { usePlayersStore } from "@/stores/playersStore";
import type { PlayerRole } from "@/types";

const ROLES: PlayerRole[] = [
  "GK",
  "CB",
  "LB",
  "RB",
  "LWB",
  "RWB",
  "DMF",
  "CMF",
  "AMF",
  "LMF",
  "RMF",
  "LW",
  "RW",
  "SS",
  "CF",
];

export function PlayerEditDialog() {
  const selectedId = useEditorStore((s) => s.selectedPlayerId);
  const setSelected = useEditorStore((s) => s.setSelectedPlayer);
  const player = usePlayersStore((s) => s.players.find((p) => p.id === selectedId));
  const updatePlayer = usePlayersStore((s) => s.updatePlayer);

  const [name, setName] = useState("");
  const [numberStr, setNumberStr] = useState("");
  const [role, setRole] = useState<PlayerRole>("CF");

  useEffect(() => {
    if (player) {
      setName(player.name);
      setNumberStr(String(player.number));
      setRole(player.role);
    }
  }, [player]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setSelected(null);
    }
    if (selectedId) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedId, setSelected]);

  if (!player) return null;

  const teamLabel = player.team === "home" ? "Local" : "Visitante";
  const teamDot = player.team === "home" ? "bg-blue-400" : "bg-red-400";

  const handleSave = () => {
    const parsedNumber = Number.parseInt(numberStr, 10);
    const safeNumber =
      Number.isFinite(parsedNumber) && parsedNumber >= 1 && parsedNumber <= 99
        ? parsedNumber
        : player.number;
    updatePlayer(player.id, {
      name: name.trim(),
      number: safeNumber,
      role,
    });
    setSelected(null);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={() => setSelected(null)}
    >
      <div
        className="w-full max-w-sm rounded-lg border border-border bg-card p-5 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground">
            <span className={`h-2 w-2 rounded-full ${teamDot}`} />
            <span>{teamLabel}</span>
          </div>
          <button
            type="button"
            onClick={() => setSelected(null)}
            className="rounded-md p-1 text-muted-foreground transition hover:bg-secondary hover:text-foreground"
            aria-label="Cerrar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <h2 className="mb-4 text-lg font-bold">Editar jugador</h2>

        <div className="space-y-4">
          <div>
            <label htmlFor="player-number" className="mb-1 block text-xs font-medium text-muted-foreground">
              Numero
            </label>
            <input
              id="player-number"
              type="number"
              min={1}
              max={99}
              value={numberStr}
              onChange={(e) => setNumberStr(e.target.value)}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition focus:border-primary"
            />
          </div>

          <div>
            <label htmlFor="player-name" className="mb-1 block text-xs font-medium text-muted-foreground">
              Nombre
            </label>
            <input
              id="player-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Opcional"
              maxLength={20}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition focus:border-primary"
            />
          </div>

          <div>
            <label htmlFor="player-role" className="mb-1 block text-xs font-medium text-muted-foreground">
              Rol
            </label>
            <select
              id="player-role"
              value={role}
              onChange={(e) => setRole(e.target.value as PlayerRole)}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition focus:border-primary"
            >
              {ROLES.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6 flex gap-2">
          <button
            type="button"
            onClick={() => setSelected(null)}
            className="flex-1 rounded-md border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition hover:bg-secondary"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="flex-1 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}
