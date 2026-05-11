"use client";

import { PitchLines } from "./PitchLines";
import { ZonesOverlay } from "./ZonesOverlay";
import { Player2D } from "@/components/players/Player2D";
import { usePlayersStore } from "@/stores/playersStore";
import { useEditorStore } from "@/stores/editorStore";
import { PITCH_DIMENSIONS } from "@/lib/pitchDimensions";
import { cn } from "@/lib/utils";

export function Pitch2D() {
  const players = usePlayersStore((s) => s.players);
  const orientation = useEditorStore((s) => s.pitchOrientation);
  const viewMode = useEditorStore((s) => s.viewMode);
  const soloTeam = useEditorStore((s) => s.soloTeam);
  const format = useEditorStore((s) => s.pitchFormat);
  const showZones = useEditorStore((s) => s.showZones);

  const dims = PITCH_DIMENSIONS[format];
  const W = dims.width;
  const H = dims.length;

  const visiblePlayers =
    viewMode === "versus" ? players : players.filter((p) => p.team === soloTeam);

  const horizontal = orientation === "horizontal";
  const viewBox = horizontal ? `0 0 ${H} ${W}` : `0 0 ${W} ${H}`;
  const contentTransform = horizontal ? `translate(0, ${W}) rotate(-90)` : "";

  const aspectClass = horizontal
    ? `aspect-[${Math.round(H * 100) / 100}/${Math.round(W * 100) / 100}]`
    : `aspect-[${Math.round(W * 100) / 100}/${Math.round(H * 100) / 100}]`;

  return (
    <div
      className={cn(
        "mx-auto w-full overflow-hidden rounded-lg border border-border bg-pitch shadow-2xl",
        horizontal ? "max-w-[1100px]" : "max-w-[640px]",
      )}
      style={{ aspectRatio: horizontal ? `${H} / ${W}` : `${W} / ${H}` }}
      onContextMenu={(e) => e.preventDefault()}
      data-aspect={aspectClass}
    >
      <svg
        viewBox={viewBox}
        className="h-full w-full"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label={`Cancha tactica ${dims.label}`}
      >
        <defs>
          <pattern
            id="grass-stripes"
            x="0"
            y="0"
            width={W}
            height={H / 10}
            patternUnits="userSpaceOnUse"
          >
            <rect width={W} height={H / 10} fill="var(--pitch)" />
            <rect width={W} height={H / 20} fill="var(--pitch-dark)" opacity={0.35} />
          </pattern>
        </defs>
        <g transform={contentTransform}>
          <rect width={W} height={H} fill="url(#grass-stripes)" />
          <PitchLines dimensions={dims} />
          {showZones && <ZonesOverlay dimensions={dims} />}
          {visiblePlayers.map((p) => (
            <Player2D key={p.id} player={p} dimensions={dims} />
          ))}
        </g>
      </svg>
    </div>
  );
}
