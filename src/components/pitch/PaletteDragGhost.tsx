"use client";

import { useEffect, useState } from "react";
import { useBoardStore } from "@/stores/boardStore";
import { EquipmentShape } from "./EquipmentShape";

export function PaletteDragGhost() {
  const paletteDragType = useBoardStore((s) => s.paletteDragType);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (!paletteDragType) {
      setPos(null);
      return;
    }
    const handleMove = (e: PointerEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, [paletteDragType]);

  if (!paletteDragType || !pos) return null;

  return (
    <div
      className="pointer-events-none fixed z-[100] transition-none"
      style={{ top: pos.y - 32, left: pos.x - 32 }}
    >
      <div className="rounded-md border-2 border-primary bg-card/90 p-1 shadow-2xl">
        <svg viewBox="-6 -8 12 12" width={56} height={56}>
          <EquipmentShape type={paletteDragType} cx={0} cy={0} size={2.6} />
        </svg>
      </div>
    </div>
  );
}
