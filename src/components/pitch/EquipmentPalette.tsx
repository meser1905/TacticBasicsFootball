"use client";

import { useBoardStore } from "@/stores/boardStore";
import { EquipmentShape, EQUIPMENT_CATALOG } from "./EquipmentShape";
import { cn } from "@/lib/utils";
import type { EquipmentType } from "@/types";

export function EquipmentPalette() {
  const tool = useBoardStore((s) => s.tool);
  const selectedType = useBoardStore((s) => s.selectedEquipmentType);
  const selectEquipmentType = useBoardStore((s) => s.selectEquipmentType);

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
            active={tool === "cone" && selectedType === item.type}
            onSelect={() => selectEquipmentType(item.type)}
          />
        ))}
      </div>
      <span className="ml-2 hidden text-[11px] text-muted-foreground sm:inline">
        Cliclea uno y despues click en la cancha para colocarlo
      </span>
    </div>
  );
}

function PaletteItem({
  type,
  label,
  active,
  onSelect,
}: {
  type: EquipmentType;
  label: string;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      aria-pressed={active}
      title={label}
      className={cn(
        "group flex flex-col items-center justify-end gap-1 rounded-md border px-2.5 pb-1.5 pt-2 transition",
        active
          ? "border-primary bg-primary/15 shadow-inner"
          : "border-border bg-background/60 hover:border-foreground/30 hover:bg-secondary",
      )}
    >
      <svg
        viewBox="-6 -8 12 12"
        className="h-9 w-9"
        preserveAspectRatio="xMidYMid meet"
      >
        <EquipmentShape type={type} cx={0} cy={0} size={2.6} />
      </svg>
      <span
        className={cn(
          "text-[10px] font-semibold uppercase tracking-wider",
          active ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground",
        )}
      >
        {label}
      </span>
    </button>
  );
}
