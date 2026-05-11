"use client";

import { useState } from "react";
import { useBoardStore } from "@/stores/boardStore";
import type { EquipmentItem, EquipmentType } from "@/types";
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

function EquipmentShape({
  type,
  cx,
  cy,
  size,
}: {
  type: EquipmentType;
  cx: number;
  cy: number;
  size: number;
}) {
  if (type === "cone") {
    return (
      <>
        <polygon
          points={`${cx},${cy - size * 1.2} ${cx - size},${cy + size * 0.4} ${cx + size},${cy + size * 0.4}`}
          fill="#ff7a00"
          stroke="#1a1a1a"
          strokeWidth={size * 0.08}
        />
        <line
          x1={cx - size * 0.8}
          y1={cy - size * 0.1}
          x2={cx + size * 0.8}
          y2={cy - size * 0.1}
          stroke="white"
          strokeWidth={size * 0.12}
          opacity={0.85}
        />
      </>
    );
  }
  if (type === "tallcone") {
    return (
      <>
        <line
          x1={cx}
          y1={cy + size * 0.4}
          x2={cx}
          y2={cy - size * 2}
          stroke="#ff7a00"
          strokeWidth={size * 0.4}
          strokeLinecap="round"
        />
        <circle cx={cx} cy={cy + size * 0.4} r={size * 0.5} fill="#1a1a1a" />
      </>
    );
  }
  if (type === "hurdle") {
    return (
      <g>
        <rect
          x={cx - size * 1.4}
          y={cy - size * 0.9}
          width={size * 2.8}
          height={size * 0.35}
          fill="#fbbf24"
          stroke="#1a1a1a"
          strokeWidth={size * 0.08}
        />
        <rect
          x={cx - size * 1.4}
          y={cy + size * 0.3}
          width={size * 0.3}
          height={size * 0.5}
          fill="#fbbf24"
        />
        <rect
          x={cx + size * 1.1}
          y={cy + size * 0.3}
          width={size * 0.3}
          height={size * 0.5}
          fill="#fbbf24"
        />
      </g>
    );
  }
  if (type === "minigoal") {
    return (
      <g>
        <rect
          x={cx - size * 2.2}
          y={cy - size * 0.4}
          width={size * 4.4}
          height={size * 1.2}
          fill="none"
          stroke="white"
          strokeWidth={size * 0.18}
        />
        <line
          x1={cx - size * 2.2}
          y1={cy + size * 0.8}
          x2={cx + size * 2.2}
          y2={cy + size * 0.8}
          stroke="white"
          strokeWidth={size * 0.18}
        />
      </g>
    );
  }
  if (type === "ladder") {
    return (
      <g>
        {[0, 1, 2, 3, 4].map((i) => (
          <rect
            key={i}
            x={cx - size * 0.9}
            y={cy - size * 2 + i * size * 0.8}
            width={size * 1.8}
            height={size * 0.12}
            fill="#fbbf24"
            opacity={0.85}
          />
        ))}
        <line x1={cx - size * 0.9} y1={cy - size * 2} x2={cx - size * 0.9} y2={cy + size * 1.2} stroke="#fbbf24" strokeWidth={size * 0.1} />
        <line x1={cx + size * 0.9} y1={cy - size * 2} x2={cx + size * 0.9} y2={cy + size * 1.2} stroke="#fbbf24" strokeWidth={size * 0.1} />
      </g>
    );
  }
  return null;
}
