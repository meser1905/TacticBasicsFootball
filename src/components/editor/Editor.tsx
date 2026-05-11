"use client";

import { Pitch2D } from "@/components/pitch/Pitch2D";
import { FormationPicker } from "@/components/formations/FormationPicker";
import { usePlayersStore } from "@/stores/playersStore";
import { formations } from "@/lib/formations";

export function Editor() {
  const homeId = usePlayersStore((s) => s.homeFormationId);
  const awayId = usePlayersStore((s) => s.awayFormationId);

  const home = formations.find((f) => f.id === homeId);
  const away = formations.find((f) => f.id === awayId);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center gap-3">
        <FormationPicker team="home" />
        <FormationPicker team="away" />
      </div>

      <Pitch2D />

      <div className="grid gap-4 sm:grid-cols-2">
        <FormationCard label="Local" formation={home} accent="blue" />
        <FormationCard label="Visitante" formation={away} accent="red" />
      </div>
    </div>
  );
}

function FormationCard({
  label,
  formation,
  accent,
}: {
  label: string;
  formation: { name: string; description: string; strengths: readonly string[]; weaknesses: readonly string[]; famousFor: string } | undefined;
  accent: "blue" | "red";
}) {
  if (!formation) return null;
  const dot = accent === "blue" ? "bg-blue-400" : "bg-red-400";
  return (
    <div className="rounded-lg border border-border bg-card/50 p-4">
      <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground">
        <span className={`h-2 w-2 rounded-full ${dot}`} />
        <span>{label}</span>
        <span className="font-bold text-foreground">{formation.name}</span>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{formation.description}</p>
      <div className="mt-3 grid gap-2 text-xs sm:grid-cols-2">
        <div>
          <div className="font-semibold text-foreground">Fortalezas</div>
          <ul className="mt-1 list-disc space-y-0.5 pl-4 text-muted-foreground">
            {formation.strengths.slice(0, 3).map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
        <div>
          <div className="font-semibold text-foreground">Debilidades</div>
          <ul className="mt-1 list-disc space-y-0.5 pl-4 text-muted-foreground">
            {formation.weaknesses.slice(0, 3).map((w) => (
              <li key={w}>{w}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-3 text-[11px] uppercase tracking-wide text-muted-foreground/80">
        Usada por: <span className="text-foreground/80">{formation.famousFor}</span>
      </div>
    </div>
  );
}
