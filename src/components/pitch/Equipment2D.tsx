"use client";

import { useState } from "react";
import { useBoardStore } from "@/stores/boardStore";
import { EquipmentShape } from "./EquipmentShape";
import type { EquipmentItem } from "@/types";
import type { PitchDimensions } from "@/lib/pitchDimensions";

type Props = {
  item: EquipmentItem;
  dimensions: PitchDimensions;
};

export function Equipment2D({ item, dimensions }: Props) {
  const moveEquipment = useBoardStore((s) => s.moveEquipment);
  const removeEquipment = useBoardStore((s) => s.removeEquipment);
  const tool = useBoardStore((s) => s.tool);
  const [dragging, setDragging] = useState(false);

  const W = dimensions.width;
  const H = dimensions.length;
  const baseSize = Math.min(W, H) * 0.02;
  const cx = item.px * W;
  const cy = item.py * H;

  const onPointerDown = (e: React.PointerEvent<SVGGElement>) => {
    if (tool === "eraser") {
      e.stopPropagation();
      removeEquipment(item.id);
      return;
    }
    if (tool !== "none") return;
    if (e.button === 2) return;
    e.stopPropagation();
    setDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<SVGGElement>) => {
    if (!dragging) return;
    const svg = e.currentTarget.ownerSVGElement;
    if (!svg) return;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const ctm = e.currentTarget.getScreenCTM();
    if (!ctm) return;
    const local = pt.matrixTransform(ctm.inverse());
    moveEquipment(item.id, local.x / W, local.y / H);
  };

  const onPointerUp = (e: React.PointerEvent<SVGGElement>) => {
    setDragging(false);
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  return (
    <g
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      style={{
        cursor: tool === "eraser" ? "crosshair" : dragging ? "grabbing" : "grab",
        touchAction: "none",
      }}
    >
      <EquipmentShape type={item.type} cx={cx} cy={cy} size={baseSize} />
    </g>
  );
}
