"use client";

import { useState } from "react";
import {
  Box,
  Square,
  RotateCw,
  Users,
  User,
  RefreshCw,
  Grid3x3,
  ChevronDown,
} from "lucide-react";
import { useEditorStore } from "@/stores/editorStore";
import { usePlayersStore } from "@/stores/playersStore";
import { findFormationById } from "@/lib/formations";
import { PITCH_DIMENSIONS, PITCH_FORMATS } from "@/lib/pitchDimensions";
import { cn } from "@/lib/utils";
import type { PitchFormat } from "@/types";

export function EditorToolbar() {
  const pitchFormat = useEditorStore((s) => s.pitchFormat);
  const setPitchFormat = useEditorStore((s) => s.setPitchFormat);
  const pitchMode = useEditorStore((s) => s.pitchMode);
  const togglePitchMode = useEditorStore((s) => s.togglePitchMode);
  const orientation = useEditorStore((s) => s.pitchOrientation);
  const togglePitchOrientation = useEditorStore((s) => s.togglePitchOrientation);
  const viewMode = useEditorStore((s) => s.viewMode);
  const setViewMode = useEditorStore((s) => s.setViewMode);
  const soloTeam = useEditorStore((s) => s.soloTeam);
  const setSoloTeam = useEditorStore((s) => s.setSoloTeam);
  const showZones = useEditorStore((s) => s.showZones);
  const toggleZones = useEditorStore((s) => s.toggleZones);

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
      <FormatSelector current={pitchFormat} onChange={setPitchFormat} />

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
        <ToggleGroup label="Orient">
          <button
            onClick={togglePitchOrientation}
            className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium text-foreground transition hover:bg-secondary"
            aria-label="Cambiar orientacion"
          >
            <RotateCw className="h-3.5 w-3.5" />
            <span className="capitalize">{orientation === "vertical" ? "Vert" : "Horiz"}</span>
          </button>
        </ToggleGroup>
      )}

      <ToggleGroup label="Zonas">
        <ToggleButton
          active={showZones}
          onClick={toggleZones}
          icon={<Grid3x3 className="h-3.5 w-3.5" />}
          label={showZones ? "ON" : "OFF"}
        />
      </ToggleGroup>

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
            label="Visit."
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

function FormatSelector({
  current,
  onChange,
}: {
  current: PitchFormat;
  onChange: (f: PitchFormat) => void;
}) {
  const [open, setOpen] = useState(false);
  const currentDims = PITCH_DIMENSIONS[current];

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 rounded-md border border-primary/40 bg-primary/15 px-3 py-1.5 text-xs font-bold text-primary-foreground transition hover:bg-primary/25"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="text-[10px] uppercase tracking-wider opacity-70">Formato</span>
        <span>{currentDims.label}</span>
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
            className="absolute left-0 top-full z-20 mt-2 min-w-[220px] overflow-hidden rounded-lg border border-border bg-card shadow-xl"
          >
            {PITCH_FORMATS.map((f) => {
              const dims = PITCH_DIMENSIONS[f];
              const active = f === current;
              return (
                <button
                  key={f}
                  onClick={() => {
                    onChange(f);
                    setOpen(false);
                  }}
                  className={cn(
                    "block w-full px-4 py-2.5 text-left transition hover:bg-secondary",
                    active && "bg-secondary",
                  )}
                >
                  <div className="text-sm font-semibold">{dims.label}</div>
                  <div className="text-[11px] text-muted-foreground">
                    {dims.length}m x {dims.width}m, {dims.playersPerTeam}v{dims.playersPerTeam}
                  </div>
                </button>
              );
            })}
          </div>
        </>
      )}
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
        active ? activeAccent : "text-muted-foreground hover:bg-secondary hover:text-foreground",
      )}
    >
      {icon}
      {label}
    </button>
  );
}
