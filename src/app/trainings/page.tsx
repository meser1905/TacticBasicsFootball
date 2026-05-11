import Link from "next/link";
import { ArrowLeft, Library, Construction } from "lucide-react";

export default function TrainingsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(60% 50% at 50% 0%, oklch(0.62 0.18 145 / 0.18) 0%, transparent 70%)",
        }}
      />

      <div className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-6 py-20 text-center">
        <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
          <Library className="h-6 w-6 text-primary" />
        </div>

        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Biblioteca de entrenamientos
        </h1>

        <p className="mt-4 max-w-xl text-lg text-muted-foreground">
          80+ ejercicios preset por posicion y para el equipo. Cada uno con objetivo, duracion,
          materiales y variantes.
        </p>

        <div className="mt-10 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground">
          <Construction className="h-4 w-4 text-accent" />
          <span>En construccion - Fase 8 del roadmap</span>
        </div>

        <Link
          href="/"
          className="mt-10 inline-flex items-center gap-2 rounded-md border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition hover:bg-secondary"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al editor
        </Link>
      </div>
    </main>
  );
}
