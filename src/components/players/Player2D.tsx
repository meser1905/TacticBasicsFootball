"use client";

import { useState } from "react";
import { usePlayersStore } from "@/stores/playersStore";
import { useEditorStore } from "@/stores/editorStore";
import type { Player } from "@/types";
import type { PitchDimensions } from "@/lib/pitchDimensions";

type Props = {
  player: Player;
  dimensions: PitchDimensions;
};

export function Player2D({ player, dimensions }: Props) {
  const movePlayer = usePlayersStore((s) => s.movePlayer);
  const setSelectedPlayer = useEditorStore((s) => s.setSelectedPlayer);
  const [dragging, setDragging] = useState(false);

  const W = dimensions.width;
  const H = dimensions.length;
  const radius = Math.min(W, H) * 0.034;

  const cx = player.px * W;
  const cy = player.py * H;

  const fill =
    player.team === "home" ? "oklch(0.58 0.18 245)" : "oklch(0.6 0.2 25)";
  const stroke = "oklch(0.98 0 0)";

  const labelText = (player.name ? player.name : player.role).toUpperCase();
  const labelFontSize = radius * 0.65;
  const charWidth = labelFontSize * 0.62;
  const labelPadding = radius * 0.5;
  const labelWidth = Math.max(
    labelText.length * charWidth + labelPadding * 2,
    radius * 2,
  );
  const labelHeight = labelFontSize * 1.85;
  const labelY = cy + radius + labelHeight * 0.55 + radius * 0.15;

  const numberFontSize = radius * 1.1;
  const strokeW = radius * 0.12;

  const onPointerDown = (e: React.PointerEvent<SVGGElement>) => {
    if (e.button === 2) return;
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
    movePlayer(player.id, local.x / W, local.y / H);
  };

  const onPointerUp = (e: React.PointerEvent<SVGGElement>) => {
    setDragging(false);
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  const onContextMenu = (e: React.MouseEvent<SVGGElement>) => {
    e.preventDefault();
    setSelectedPlayer(player.id);
  };

  const onDoubleClick = (e: React.MouseEvent<SVGGElement>) => {
    e.preventDefault();
    setSelectedPlayer(player.id);
  };

  return (
    <g
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onContextMenu={onContextMenu}
      onDoubleClick={onDoubleClick}
      style={{ cursor: dragging ? "grabbing" : "grab", touchAction: "none" }}
    >
      <ellipse
        cx={cx}
        cy={cy + radius * 0.95}
        rx={radius * 0.85}
        ry={radius * 0.2}
        fill="black"
        opacity={dragging ? 0.45 : 0.3}
      />
      <circle
        cx={cx}
        cy={cy}
        r={radius}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeW * 1.3}
        opacity={dragging ? 0.92 : 1}
      />
      <path
        d={`M ${cx - radius * 0.55} ${cy - radius * 0.78} A ${radius * 0.9} ${radius * 0.9} 0 0 1 ${cx + radius * 0.55} ${cy - radius * 0.78}`}
        stroke={stroke}
        strokeWidth={strokeW * 0.55}
        fill="none"
        opacity={0.5}
      />
      <text
        x={cx}
        y={cy}
        textAnchor="middle"
        dominantBaseline="central"
        fill="white"
        fontSize={numberFontSize}
        fontWeight={800}
        pointerEvents="none"
        style={{ userSelect: "none" }}
      >
        {player.number}
      </text>

      <g pointerEvents="none">
        <rect
          x={cx - labelWidth / 2}
          y={labelY - labelHeight / 2}
          width={labelWidth}
          height={labelHeight}
          rx={labelHeight / 2}
          fill="oklch(0.12 0 0 / 0.88)"
          stroke="oklch(0.98 0 0 / 0.22)"
          strokeWidth={0.08}
        />
        <text
          x={cx}
          y={labelY}
          textAnchor="middle"
          dominantBaseline="central"
          fill="white"
          fontSize={labelFontSize}
          fontWeight={700}
          style={{ userSelect: "none", letterSpacing: "0.04em" }}
        >
          {labelText}
        </text>
      </g>
    </g>
  );
}
