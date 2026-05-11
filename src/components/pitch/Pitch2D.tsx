"use client";

import { PitchLines } from "./PitchLines";
import { Player2D } from "@/components/players/Player2D";
import { usePlayersStore } from "@/stores/playersStore";

const PITCH_W = 68;
const PITCH_H = 105;

export function Pitch2D() {
  const players = usePlayersStore((s) => s.players);

  return (
    <div className="relative mx-auto w-full max-w-[640px] overflow-hidden rounded-lg border border-border bg-pitch shadow-2xl">
      <div className="aspect-[68/105]">
        <svg
          viewBox={`0 0 ${PITCH_W} ${PITCH_H}`}
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
          <rect width={PITCH_W} height={PITCH_H} fill="url(#grass-stripes)" />
          <PitchLines />
          {players.map((p) => (
            <Player2D key={p.id} player={p} />
          ))}
        </svg>
      </div>
    </div>
  );
}
