import Link from "next/link";
import { ArrowLeft, Library, Construction } from "lucide-react";

export default function TrainingsPage() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-4xl flex-col items-center justify-center px-6 py-16 text-center">
      <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
        <Library className="h-6 w-6 text-primary" />
      </div>

      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Biblioteca de entrenamientos</h1>

      <p className="mt-4 max-w-xl text-base text-muted-foreground">
        80+ ejercicios preset por posicion y para el equipo. Cada uno con objetivo, duracion,
        materiales y variantes.
      </p>

      <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground">
        <Construction className="h-4 w-4 text-accent" />
        <span>En construccion. Fase 8 del roadmap.</span>
      </div>

      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-md border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition hover:bg-secondary"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver al editor
      </Link>
    </main>
  );
}
