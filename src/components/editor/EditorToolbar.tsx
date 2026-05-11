"use client";

import { Box, Square, RotateCw, Users, User, RefreshCw } from "lucide-react";
import { useEditorStore } from "@/stores/editorStore";
import { usePlayersStore } from "@/stores/playersStore";
import { findFormationById } from "@/lib/formations";
import { cn } from "@/lib/utils";

export function EditorToolbar() {
  const pitchMode = useEditorStore((s) => s.pitchMode);
  const togglePitchMode = useEditorStore((s) => s.togglePitchMode);
  const orientation = useEditorStore((s) => s.pitchOrientation);
  const togglePitchOrientation = useEditorStore((s) => s.togglePitchOrientation);
  const viewMode = useEditorStore((s) => s.viewMode);
  const setViewMode = useEditorStore((s) => s.setViewMode);
  const soloTeam = useEditorStore((s) => s.soloTeam);
  const setSoloTeam = useEditorStore((s) => s.setSoloTeam);

  const homeId = usePlayersStore((s) => s.homeFormationId);
  const awayId = usePlayersStore((s) => s.awayFormationId);
  const resetTeam = usePlayersStore((s) => s.resetTeam);

  const handleReset = () => {
    const home = findFormationById(homeId);
    const away = findFormationById(awayId);
    if (home) resetTeam(home, "home");
    if (away) resetTeam(away, "away");
  };

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-lg border border-border bg-card/50 p-2">
      <ToggleGroup label="Vista">
        <ToggleButton
          active={pitchMode === "2d"}
          onClick={() => pitchMode !== "2d" && togglePitchMode()}
          icon={<Square className="h-3.5 w-3.5" />}
          label="2D"
        />
        <ToggleButton
          active={pitchMode === "3d"}
          onClick={() => pitchMode !== "3d" && togglePitchMode()}
          icon={<Box className="h-3.5 w-3.5" />}
          label="3D"
        />
      </ToggleGroup>

      {pitchMode === "2d" && (
        <ToggleGroup label="Orientacion">
          <button
            onClick={togglePitchOrientation}
            className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium text-foreground transition hover:bg-secondary"
            aria-label="Cambiar orientacion"
          >
            <RotateCw className="h-3.5 w-3.5" />
            <span className="capitalize">{orientation === "vertical" ? "Vertical" : "Horizontal"}</span>
          </button>
        </ToggleGroup>
      )}

      <ToggleGroup label="Modo">
        <ToggleButton
          active={viewMode === "solo"}
          onClick={() => setViewMode("solo")}
          icon={<User className="h-3.5 w-3.5" />}
          label="Solo"
        />
        <ToggleButton
          active={viewMode === "versus"}
          onClick={() => setViewMode("versus")}
          icon={<Users className="h-3.5 w-3.5" />}
          label="Versus"
        />
      </ToggleGroup>

      {viewMode === "solo" && (
        <ToggleGroup label="Equipo">
          <ToggleButton
            active={soloTeam === "home"}
            onClick={() => setSoloTeam("home")}
            label="Local"
            accent="blue"
          />
          <ToggleButton
            active={soloTeam === "away"}
            onClick={() => setSoloTeam("away")}
            label="Visitante"
            accent="red"
          />
        </ToggleGroup>
      )}

      <div className="ml-auto">
        <button
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground transition hover:bg-secondary"
          aria-label="Resetear posiciones a la formacion"
          title="Resetear posiciones a la formacion"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Reset
        </button>
      </div>
    </div>
  );
}

function ToggleGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-1 rounded-md border border-border bg-background/60 p-0.5">
      <span className="px-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      {children}
    </div>
  );
}

function ToggleButton({
  active,
  onClick,
  icon,
  label,
  accent,
}: {
  active: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
  label: string;
  accent?: "blue" | "red";
}) {
  const activeAccent =
    accent === "blue"
      ? "bg-blue-500/20 text-blue-300"
      : accent === "red"
        ? "bg-red-500/20 text-red-300"
        : "bg-primary text-primary-foreground";

  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-sm px-2.5 py-1 text-xs font-medium transition",
        active
          ? activeAccent
          : "text-muted-foreground hover:bg-secondary hover:text-foreground",
      )}
    >
      {icon}
      {label}
    </button>
  );
}
