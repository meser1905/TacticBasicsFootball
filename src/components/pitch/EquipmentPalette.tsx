"use client";

import { useBoardStore } from "@/stores/boardStore";
import { EquipmentShape, EQUIPMENT_CATALOG } from "./EquipmentShape";
import { cn } from "@/lib/utils";
import type { EquipmentType } from "@/types";

export function EquipmentPalette() {
  const startPaletteDrag = useBoardStore((s) => s.startPaletteDrag);
  const paletteDragType = useBoardStore((s) => s.paletteDragType);

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-lg border border-border bg-card/50 p-2">
      <span className="px-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        Equipo
      </span>
      <div className="flex flex-wrap gap-1.5">
        {EQUIPMENT_CATALOG.map((item) => (
          <PaletteItem
            key={item.type}
            type={item.type}
            label={item.label}
            isDragging={paletteDragType === item.type}
            onStartDrag={() => startPaletteDrag(item.type)}
          />
        ))}
      </div>
      <span className="ml-2 hidden text-[11px] text-muted-foreground sm:inline">
        Manten apretado y arrastra a la cancha para colocarlo
      </span>
    </div>
  );
}

function PaletteItem({
  type,
  label,
  isDragging,
  onStartDrag,
}: {
  type: EquipmentType;
  label: string;
  isDragging: boolean;
  onStartDrag: () => void;
}) {
  const onPointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (e.button !== 0) return;
    e.preventDefault();
    onStartDrag();
  };

  return (
    <button
      onPointerDown={onPointerDown}
      onContextMenu={(e) => e.preventDefault()}
      aria-pressed={isDragging}
      title={`Arrastrar ${label} a la cancha`}
      className={cn(
        "group flex select-none flex-col items-center justify-end gap-1 rounded-md border px-2.5 pb-1.5 pt-2 transition",
        isDragging
          ? "border-primary bg-primary/15 shadow-inner"
          : "border-border bg-background/60 hover:border-foreground/30 hover:bg-secondary",
      )}
      style={{ touchAction: "none", cursor: isDragging ? "grabbing" : "grab" }}
    >
      <svg
        viewBox="-6 -8 12 12"
        className="h-9 w-9"
        preserveAspectRatio="xMidYMid meet"
        style={{ pointerEvents: "none" }}
      >
        <EquipmentShape type={type} cx={0} cy={0} size={2.6} />
      </svg>
      <span
        className={cn(
          "text-[10px] font-semibold uppercase tracking-wider",
          isDragging
            ? "text-primary-foreground"
            : "text-muted-foreground group-hover:text-foreground",
        )}
      >
        {label}
      </span>
    </button>
  );
}
