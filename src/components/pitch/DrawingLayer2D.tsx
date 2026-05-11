"use client";

import { useBoardStore } from "@/stores/boardStore";
import type { DrawingStroke } from "@/types";
import type { PitchDimensions } from "@/lib/pitchDimensions";

type Props = {
  dimensions: PitchDimensions;
};

export function DrawingLayer2D({ dimensions }: Props) {
  const strokes = useBoardStore((s) => s.strokes);
  const active = useBoardStore((s) => s.activeStroke);
  const removeStroke = useBoardStore((s) => s.removeStroke);
  const tool = useBoardStore((s) => s.tool);

  const W = dimensions.width;
  const strokeWidth = (W / 68) * 0.6;

  return (
    <g pointerEvents={tool === "eraser" ? "auto" : "none"}>
      {strokes.map((stroke) => (
        <StrokePath
          key={stroke.id}
          stroke={stroke}
          width={strokeWidth}
          onErase={() => tool === "eraser" && removeStroke(stroke.id)}
        />
      ))}
      {active && <StrokePath stroke={active} width={strokeWidth} />}
    </g>
  );
}

function StrokePath({
  stroke,
  width,
  onErase,
}: {
  stroke: DrawingStroke;
  width: number;
  onErase?: () => void;
}) {
  if (stroke.points.length < 2) return null;
  const first = stroke.points[0];
  if (!first) return null;
  let d = `M ${first.x} ${first.y}`;
  for (let i = 1; i < stroke.points.length; i++) {
    const p = stroke.points[i];
    if (!p) continue;
    d += ` L ${p.x} ${p.y}`;
  }
  return (
    <path
      d={d}
      stroke={stroke.color}
      strokeWidth={width}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      onPointerDown={onErase}
      style={{ cursor: onErase ? "crosshair" : "default" }}
      pointerEvents={onErase ? "stroke" : "none"}
    />
  );
}
