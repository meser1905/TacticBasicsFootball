import Link from "next/link";
import { Github, Sparkles, Layers3, Library } from "lucide-react";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(60% 50% at 50% 0%, oklch(0.62 0.18 145 / 0.18) 0%, transparent 70%), radial-gradient(40% 40% at 80% 100%, oklch(0.72 0.2 45 / 0.12) 0%, transparent 70%)",
        }}
      />

      <section className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 py-20 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          <span>v0.1.0 - En construccion activa</span>
        </div>

        <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
          Tactic
          <span className="text-primary">Basics</span>
          Football
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
          Pizarra tactica de futbol gratis, open source y moderna. Pensada para entrenadores que
          quieren disenar, animar y compartir jugadas sin complicarse.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="https://github.com/meser1905/tactic-basics-football"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition hover:opacity-90"
          >
            <Github className="h-4 w-4" />
            Ver en GitHub
          </Link>
          <Link
            href="/trainings"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition hover:bg-secondary"
          >
            <Library className="h-4 w-4" />
            Entrenamientos
          </Link>
        </div>

        <div className="mt-20 grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
          <FeatureCard
            icon={<Layers3 className="h-5 w-5 text-primary" />}
            title="2D y 3D"
            description="Cancha cenital y modo perspectiva con drag and drop fluido."
          />
          <FeatureCard
            icon={<Sparkles className="h-5 w-5 text-primary" />}
            title="Jugadas animadas"
            description="Timeline con keyframes para grabar movimientos paso a paso."
          />
          <FeatureCard
            icon={<Library className="h-5 w-5 text-primary" />}
            title="Entrenamientos"
            description="Biblioteca de ejercicios listos por posicion y para el equipo."
          />
        </div>
      </section>
    </main>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-lg border border-border bg-card/50 p-5 text-left backdrop-blur">
      <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-md bg-primary/10">
        {icon}
      </div>
      <h3 className="mb-1 font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
