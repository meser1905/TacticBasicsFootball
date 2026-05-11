"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Filter, Users, Timer, Target, ChevronRight, X, Loader as LoaderIcon } from "lucide-react";
import {
  trainings,
  trainingCategoryLabels,
  trainingsByCategory,
} from "@/lib/trainings";
import { PITCH_DIMENSIONS, PITCH_FORMATS } from "@/lib/pitchDimensions";
import { useBoardStore } from "@/stores/boardStore";
import { useEditorStore } from "@/stores/editorStore";
import { cn } from "@/lib/utils";
import type { PitchFormat, Training, TrainingCategory } from "@/types";

export function TrainingsLibrary() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<TrainingCategory | "all">("all");
  const [formatFilter, setFormatFilter] = useState<PitchFormat | "all">("all");
  const [selected, setSelected] = useState<Training | null>(null);

  const loadEquipment = useBoardStore((s) => s.loadEquipmentFromMaterials);
  const clearAll = useBoardStore((s) => s.clearAll);
  const setPitchFormat = useEditorStore((s) => s.setPitchFormat);

  const groups = useMemo(() => trainingsByCategory(), []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return trainings.filter((t) => {
      if (categoryFilter !== "all" && t.category !== categoryFilter) return false;
      if (formatFilter !== "all" && !t.formats.includes(formatFilter)) return false;
      if (q && !t.name.toLowerCase().includes(q) && !t.objective.toLowerCase().includes(q))
        return false;
      return true;
    });
  }, [search, categoryFilter, formatFilter]);

  const handleLoad = (training: Training) => {
    clearAll();
    loadEquipment(training.materials);
    const targetFormat = training.formats[0] ?? "football11";
    setPitchFormat(targetFormat);
    router.push("/");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Biblioteca de entrenamientos</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          {trainings.length} ejercicios organizados por categoria, formato y duracion. Cargá uno en
          la pizarra y los materiales aparecen como conos arrastrables.
        </p>
      </header>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nombre u objetivo..."
            className="w-full rounded-md border border-border bg-background py-2 pl-10 pr-3 text-sm outline-none transition focus:border-primary"
          />
        </div>
        <div className="flex items-center gap-2 rounded-md border border-border bg-background/60 px-2 py-1">
          <Filter className="h-3.5 w-3.5 text-muted-foreground" />
          <select
            value={formatFilter}
            onChange={(e) => setFormatFilter(e.target.value as PitchFormat | "all")}
            className="bg-transparent text-sm text-foreground outline-none"
          >
            <option value="all">Todos los formatos</option>
            {PITCH_FORMATS.map((f) => (
              <option key={f} value={f}>
                {PITCH_DIMENSIONS[f].label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        <CategoryChip
          label="Todas"
          active={categoryFilter === "all"}
          onClick={() => setCategoryFilter("all")}
          count={trainings.length}
        />
        {groups.map((g) => (
          <CategoryChip
            key={g.category}
            label={g.label}
            active={categoryFilter === g.category}
            onClick={() => setCategoryFilter(g.category)}
            count={g.items.length}
          />
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-lg border border-border bg-card/30 p-8 text-center text-muted-foreground">
          No hay ejercicios que coincidan con tu busqueda.
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((t) => (
            <TrainingCard key={t.id} training={t} onClick={() => setSelected(t)} />
          ))}
        </div>
      )}

      {selected && (
        <TrainingDetail
          training={selected}
          onClose={() => setSelected(null)}
          onLoad={() => handleLoad(selected)}
        />
      )}
    </div>
  );
}

function CategoryChip({
  label,
  active,
  onClick,
  count,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  count: number;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition",
        active
          ? "border-primary bg-primary/15 text-primary-foreground"
          : "border-border bg-card text-muted-foreground hover:border-foreground/30 hover:text-foreground",
      )}
    >
      {label}
      <span className={cn("rounded-full px-1.5 text-[10px]", active ? "bg-primary/30" : "bg-secondary")}>
        {count}
      </span>
    </button>
  );
}

function TrainingCard({ training, onClick }: { training: Training; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group relative flex flex-col gap-2 rounded-lg border border-border bg-card/50 p-4 text-left transition hover:border-primary/50 hover:bg-card"
    >
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">
          {trainingCategoryLabels[training.category]}
        </span>
        <ChevronRight className="h-3.5 w-3.5 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-foreground" />
      </div>
      <h3 className="text-base font-semibold leading-tight">{training.name}</h3>
      <p className="line-clamp-2 text-xs text-muted-foreground">{training.objective}</p>
      <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
        <span className="inline-flex items-center gap-1">
          <Users className="h-3 w-3" />
          {training.playersMin === training.playersMax
            ? `${training.playersMin}`
            : `${training.playersMin}-${training.playersMax}`}{" "}
          JG
        </span>
        <span className="inline-flex items-center gap-1">
          <Timer className="h-3 w-3" />
          {training.durationMin === training.durationMax
            ? `${training.durationMin}`
            : `${training.durationMin}-${training.durationMax}`}{" "}
          min
        </span>
        {training.materials.length > 0 && (
          <span className="inline-flex items-center gap-1">
            <Target className="h-3 w-3" />
            {training.materials.length} items
          </span>
        )}
      </div>
    </button>
  );
}

function TrainingDetail({
  training,
  onClose,
  onLoad,
}: {
  training: Training;
  onClose: () => void;
  onLoad: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="my-8 w-full max-w-2xl rounded-lg border border-border bg-card p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-3 flex items-start justify-between gap-4">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-wider text-primary">
              {trainingCategoryLabels[training.category]}
            </div>
            <h2 className="mt-1 text-2xl font-bold leading-tight">{training.name}</h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1.5 text-muted-foreground transition hover:bg-secondary hover:text-foreground"
            aria-label="Cerrar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <p className="text-sm text-foreground/90">{training.objective}</p>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat label="Jugadores" value={
            training.playersMin === training.playersMax
              ? `${training.playersMin}`
              : `${training.playersMin} a ${training.playersMax}`
          } />
          <Stat label="Duracion" value={
            training.durationMin === training.durationMax
              ? `${training.durationMin} min`
              : `${training.durationMin} a ${training.durationMax} min`
          } />
          <Stat label="Formatos" value={training.formats.map((f) => PITCH_DIMENSIONS[f].label).join(", ")} />
          {training.space && <Stat label="Espacio" value={training.space} />}
        </div>

        {training.materials.length > 0 && (
          <div className="mt-5">
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Materiales
            </h3>
            <div className="flex flex-wrap gap-2">
              {training.materials.map((m) => (
                <span
                  key={m.name}
                  className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background/60 px-2.5 py-1 text-xs"
                >
                  <span className="font-bold text-primary">{m.count}x</span>
                  <span>{m.name}</span>
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="mt-5">
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Descripcion
          </h3>
          <ol className="list-decimal space-y-1.5 pl-5 text-sm text-foreground/90">
            {training.description.map((d, i) => (
              <li key={i}>{d}</li>
            ))}
          </ol>
        </div>

        {training.variants && training.variants.length > 0 && (
          <div className="mt-5">
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Variantes
            </h3>
            <ul className="list-disc space-y-1 pl-5 text-sm text-foreground/85">
              {training.variants.map((v, i) => (
                <li key={i}>{v}</li>
              ))}
            </ul>
          </div>
        )}

        {training.indicators && training.indicators.length > 0 && (
          <div className="mt-5">
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Indicadores de exito
            </h3>
            <ul className="list-disc space-y-1 pl-5 text-sm text-foreground/85">
              {training.indicators.map((v, i) => (
                <li key={i}>{v}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-end">
          <button
            onClick={onClose}
            className="rounded-md border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition hover:bg-secondary"
          >
            Cerrar
          </button>
          <button
            onClick={onLoad}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
          >
            <LoaderIcon className="h-4 w-4" />
            Cargar en pizarra
          </button>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-border bg-background/60 p-2.5">
      <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
      <div className="mt-0.5 text-sm font-medium text-foreground">{value}</div>
    </div>
  );
}
