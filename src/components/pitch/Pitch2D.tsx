"use client";

import { PitchLines } from "./PitchLines";
import { Player2D } from "@/components/players/Player2D";
import { usePlayersStore } from "@/stores/playersStore";
import { useEditorStore } from "@/stores/editorStore";
import { cn } from "@/lib/utils";

const PITCH_W = 68;
const PITCH_H = 105;

export function Pitch2D() {
  const players = usePlayersStore((s) => s.players);
  const orientation = useEditorStore((s) => s.pitchOrientation);
  const viewMode = useEditorStore((s) => s.viewMode);
  const soloTeam = useEditorStore((s) => s.soloTeam);

  const visiblePlayers =
    viewMode === "versus" ? players : players.filter((p) => p.team === soloTeam);

  const horizontal = orientation === "horizontal";
  const viewBox = horizontal ? `0 0 ${PITCH_H} ${PITCH_W}` : `0 0 ${PITCH_W} ${PITCH_H}`;
  const contentTransform = horizontal ? `translate(0, ${PITCH_W}) rotate(-90)` : "";

  return (
    <div
      className={cn(
        "mx-auto w-full overflow-hidden rounded-lg border border-border bg-pitch shadow-2xl",
        horizontal ? "aspect-[105/68] max-w-[1100px]" : "aspect-[68/105] max-w-[640px]",
      )}
      onContextMenu={(e) => e.preventDefault()}
    >
      <svg
        viewBox={viewBox}
        className="h-full w-full"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Cancha tactica de futbol 11"
      >
        <defs>
          <pattern
            id="grass-stripes"
            x="0"
            y="0"
            width={PITCH_W}
            height={10}
            patternUnits="userSpaceOnUse"
          >
            <rect width={PITCH_W} height={10} fill="var(--pitch)" />
            <rect width={PITCH_W} height={5} fill="var(--pitch-dark)" opacity={0.35} />
          </pattern>
        </defs>
        <g transform={contentTransform}>
          <rect width={PITCH_W} height={PITCH_H} fill="url(#grass-stripes)" />
          <PitchLines />
          {visiblePlayers.map((p) => (
            <Player2D key={p.id} player={p} />
          ))}
        </g>
      </svg>
    </div>
  );
}
