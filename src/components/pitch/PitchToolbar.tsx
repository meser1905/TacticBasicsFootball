"use client";

import { MousePointer2, Pencil, Cone, Eraser, Trash2 } from "lucide-react";
import { useBoardStore } from "@/stores/boardStore";
import { cn } from "@/lib/utils";
import type { DrawingTool } from "@/types";

const COLORS = ["#fbbf24", "#3b82f6", "#ef4444", "#22c55e", "#f8fafc"];

export function PitchToolbar() {
  const tool = useBoardStore((s) => s.tool);
  const setTool = useBoardStore((s) => s.setTool);
  const color = useBoardStore((s) => s.color);
  const setColor = useBoardStore((s) => s.setColor);
  const clearDrawings = useBoardStore((s) => s.clearDrawings);
  const clearEquipment = useBoardStore((s) => s.clearEquipment);

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-lg border border-border bg-card/50 p-2">
      <span className="px-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        Pizarra
      </span>
      <div className="flex items-center gap-1 rounded-md border border-border bg-background/60 p-0.5">
        <ToolButton tool="none" active={tool === "none"} onClick={setTool} icon={<MousePointer2 className="h-3.5 w-3.5" />} label="Mover" />
        <ToolButton tool="marker" active={tool === "marker"} onClick={setTool} icon={<Pencil className="h-3.5 w-3.5" />} label="Marcador" />
        <ToolButton tool="cone" active={tool === "cone"} onClick={setTool} icon={<Cone className="h-3.5 w-3.5" />} label="Cono" />
        <ToolButton tool="eraser" active={tool === "eraser"} onClick={setTool} icon={<Eraser className="h-3.5 w-3.5" />} label="Borrar" />
      </div>

      <div className="flex items-center gap-1.5 rounded-md border border-border bg-background/60 p-1">
        {COLORS.map((c) => (
          <button
            key={c}
            onClick={() => setColor(c)}
            aria-label={`Color ${c}`}
            className={cn(
              "h-5 w-5 rounded-full border-2 transition",
              color === c ? "border-foreground scale-110" : "border-transparent opacity-70 hover:opacity-100",
            )}
            style={{ backgroundColor: c }}
          />
        ))}
      </div>

      <button
        onClick={clearDrawings}
        className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1 text-xs font-medium text-foreground transition hover:bg-secondary"
        title="Borrar todos los dibujos"
      >
        <Trash2 className="h-3.5 w-3.5" />
        Trazos
      </button>
      <button
        onClick={clearEquipment}
        className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1 text-xs font-medium text-foreground transition hover:bg-secondary"
        title="Quitar todo el equipamiento"
      >
        <Trash2 className="h-3.5 w-3.5" />
        Equipo
      </button>
    </div>
  );
}

function ToolButton({
  tool,
  active,
  onClick,
  icon,
  label,
}: {
  tool: DrawingTool;
  active: boolean;
  onClick: (t: DrawingTool) => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={() => onClick(tool)}
      aria-pressed={active}
      title={label}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-sm px-2.5 py-1 text-xs font-medium transition",
        active
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:bg-secondary hover:text-foreground",
      )}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}
