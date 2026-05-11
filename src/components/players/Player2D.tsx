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
  const radius = Math.min(W, H) * 0.022;

  const cx = player.px * W;
  const cy = player.py * H;

  const fill = player.team === "home" ? "#2563eb" : "#dc2626";
  const stroke = "#ffffff";

  const labelText = (player.name ? player.name : player.role).toUpperCase();
  const labelFontSize = radius * 0.85;
  const labelY = cy + radius + labelFontSize * 1.05;

  const numberFontSize = radius * 1.05;
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
        cy={cy + radius * 1.05}
        rx={radius * 0.78}
        ry={radius * 0.18}
        fill="black"
        opacity={dragging ? 0.45 : 0.32}
      />
      <circle
        cx={cx}
        cy={cy}
        r={radius}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeW}
        opacity={dragging ? 0.92 : 1}
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
      <text
        x={cx}
        y={labelY}
        textAnchor="middle"
        dominantBaseline="central"
        fill="white"
        fontSize={labelFontSize}
        fontWeight={800}
        paintOrder="stroke"
        stroke="rgba(0,0,0,0.75)"
        strokeWidth={labelFontSize * 0.25}
        strokeLinejoin="round"
        pointerEvents="none"
        style={{ userSelect: "none", letterSpacing: "0.03em" }}
      >
        {labelText}
      </text>
    </g>
  );
}
