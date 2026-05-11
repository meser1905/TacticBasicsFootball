"use client";

import { Pitch2D } from "@/components/pitch/Pitch2D";
import { Pitch3D } from "@/components/pitch/Pitch3DLoader";
import { FormationPicker } from "@/components/formations/FormationPicker";
import { PlayerEditDialog } from "@/components/players/PlayerEditDialog";
import { PitchToolbar } from "@/components/pitch/PitchToolbar";
import { EquipmentPalette } from "@/components/pitch/EquipmentPalette";
import { PaletteDragGhost } from "@/components/pitch/PaletteDragGhost";
import { EditorToolbar } from "./EditorToolbar";
import { useEditorStore } from "@/stores/editorStore";
import { usePlayersStore } from "@/stores/playersStore";
import { usePaletteDragDrop } from "@/hooks/usePaletteDragDrop";
import { formations } from "@/lib/formations";

export function Editor() {
  const homeId = usePlayersStore((s) => s.homeFormationId);
  const awayId = usePlayersStore((s) => s.awayFormationId);
  const pitchMode = useEditorStore((s) => s.pitchMode);
  const viewMode = useEditorStore((s) => s.viewMode);
  const soloTeam = useEditorStore((s) => s.soloTeam);
  usePaletteDragDrop();

  const home = formations.find((f) => f.id === homeId);
  const away = formations.find((f) => f.id === awayId);

  const showHomeCard = viewMode === "versus" || soloTeam === "home";
  const showAwayCard = viewMode === "versus" || soloTeam === "away";

  return (
    <div className="flex flex-col gap-4">
      <EditorToolbar />
      <PitchToolbar />
      <EquipmentPalette />

      <div className="flex flex-wrap items-center gap-3">
        {showHomeCard && <FormationPicker team="home" />}
        {showAwayCard && <FormationPicker team="away" />}
      </div>

      {pitchMode === "2d" ? <Pitch2D /> : <Pitch3D />}

      <div className="grid gap-4 sm:grid-cols-2">
        {showHomeCard && home && <FormationCard label="Local" formation={home} accent="blue" />}
        {showAwayCard && away && <FormationCard label="Visitante" formation={away} accent="red" />}
      </div>

      <PlayerEditDialog />
      <PaletteDragGhost />
    </div>
  );
}

type FormationSummary = {
  name: string;
  description: string;
  strengths: readonly string[];
  weaknesses: readonly string[];
};

function FormationCard({
  label,
  formation,
  accent,
}: {
  label: string;
  formation: FormationSummary;
  accent: "blue" | "red";
}) {
  const dot = accent === "blue" ? "bg-blue-400" : "bg-red-400";
  return (
    <div className="rounded-lg border border-border bg-card/50 p-4">
      <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground">
        <span className={`h-2 w-2 rounded-full ${dot}`} />
        <span>{label}</span>
        <span className="font-bold text-foreground">{formation.name}</span>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{formation.description}</p>
      <div className="mt-3 grid gap-3 text-xs sm:grid-cols-2">
        <div>
          <div className="font-semibold text-foreground">Pros</div>
          <ul className="mt-1 list-disc space-y-0.5 pl-4 text-muted-foreground">
            {formation.strengths.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
        <div>
          <div className="font-semibold text-foreground">Contras</div>
          <ul className="mt-1 list-disc space-y-0.5 pl-4 text-muted-foreground">
            {formation.weaknesses.map((w) => (
              <li key={w}>{w}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
