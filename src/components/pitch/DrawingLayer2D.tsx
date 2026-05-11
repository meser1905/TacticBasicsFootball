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
        <StrokeRender
          key={stroke.id}
          stroke={stroke}
          width={strokeWidth}
          onErase={() => tool === "eraser" && removeStroke(stroke.id)}
        />
      ))}
      {active && <StrokeRender stroke={active} width={strokeWidth} />}
    </g>
  );
}

function StrokeRender({
  stroke,
  width,
  onErase,
}: {
  stroke: DrawingStroke;
  width: number;
  onErase?: () => void;
}) {
  if (stroke.points.length < 2) return null;

  if (stroke.kind === "arrow") {
    return <ArrowShape stroke={stroke} width={width} onErase={onErase} />;
  }

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

function ArrowShape({
  stroke,
  width,
  onErase,
}: {
  stroke: DrawingStroke;
  width: number;
  onErase?: () => void;
}) {
  const start = stroke.points[0];
  const end = stroke.points[stroke.points.length - 1];
  if (!start || !end) return null;

  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const length = Math.sqrt(dx * dx + dy * dy);
  if (length < 0.001) return null;

  const headLen = Math.min(width * 5, length * 0.5);
  const ratio = (length - headLen * 0.6) / length;
  const lineEndX = start.x + dx * ratio;
  const lineEndY = start.y + dy * ratio;

  const angle = Math.atan2(dy, dx);
  const headHalfAngle = Math.PI / 7;
  const leftX = end.x - headLen * Math.cos(angle - headHalfAngle);
  const leftY = end.y - headLen * Math.sin(angle - headHalfAngle);
  const rightX = end.x - headLen * Math.cos(angle + headHalfAngle);
  const rightY = end.y - headLen * Math.sin(angle + headHalfAngle);

  return (
    <g
      onPointerDown={onErase}
      style={{ cursor: onErase ? "crosshair" : "default" }}
      pointerEvents={onErase ? "auto" : "none"}
    >
      <line
        x1={start.x}
        y1={start.y}
        x2={lineEndX}
        y2={lineEndY}
        stroke={stroke.color}
        strokeWidth={width}
        strokeLinecap="round"
      />
      <polygon
        points={`${end.x},${end.y} ${leftX},${leftY} ${rightX},${rightY}`}
        fill={stroke.color}
      />
    </g>
  );
}
