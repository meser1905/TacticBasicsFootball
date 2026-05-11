"use client";

import { useRef, useState } from "react";
import { usePlayersStore } from "@/stores/playersStore";
import { useEditorStore } from "@/stores/editorStore";
import type { Player } from "@/types";

const PITCH_W = 68;
const PITCH_H = 105;
const PLAYER_R = 2.4;

type Props = {
  player: Player;
};

export function Player2D({ player }: Props) {
  const movePlayer = usePlayersStore((s) => s.movePlayer);
  const setSelectedPlayer = useEditorStore((s) => s.setSelectedPlayer);
  const [dragging, setDragging] = useState(false);
  const groupRef = useRef<SVGGElement>(null);
  const moved = useRef(false);

  const cx = player.px * PITCH_W;
  const cy = player.py * PITCH_H;

  const fill =
    player.team === "home" ? "oklch(0.55 0.18 245)" : "oklch(0.58 0.18 25)";
  const stroke = "oklch(0.98 0 0)";

  const onPointerDown = (e: React.PointerEvent<SVGGElement>) => {
    if (e.button === 2) return;
    setDragging(true);
    moved.current = false;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<SVGGElement>) => {
    if (!dragging) return;
    moved.current = true;
    const svg = e.currentTarget.ownerSVGElement;
    if (!svg) return;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const ctm = e.currentTarget.getScreenCTM();
    if (!ctm) return;
    const local = pt.matrixTransform(ctm.inverse());
    movePlayer(player.id, local.x / PITCH_W, local.y / PITCH_H);
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

  const label = player.name ? player.name : player.role;

  return (
    <g
      ref={groupRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onContextMenu={onContextMenu}
      onDoubleClick={onDoubleClick}
      style={{ cursor: dragging ? "grabbing" : "grab", touchAction: "none" }}
    >
      <circle
        cx={cx}
        cy={cy + PLAYER_R * 0.18}
        r={PLAYER_R * 0.95}
        fill="black"
        opacity={dragging ? 0.4 : 0.22}
      />
      <circle
        cx={cx}
        cy={cy}
        r={PLAYER_R}
        fill={fill}
        stroke={stroke}
        strokeWidth={0.3}
        opacity={dragging ? 0.92 : 1}
      />
      <text
        x={cx}
        y={cy}
        textAnchor="middle"
        dominantBaseline="central"
        fill="white"
        fontSize={2.4}
        fontWeight={700}
        pointerEvents="none"
        style={{ userSelect: "none" }}
      >
        {player.number}
      </text>
      <text
        x={cx}
        y={cy + PLAYER_R + 1.8}
        textAnchor="middle"
        fill={stroke}
        fontSize={1.6}
        fontWeight={600}
        pointerEvents="none"
        opacity={0.92}
        style={{ userSelect: "none" }}
      >
        {label}
      </text>
    </g>
  );
}
