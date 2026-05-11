import { Editor } from "@/components/editor/Editor";

export default function Home() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-6 sm:py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Editor tactico</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Arrastra los jugadores para reposicionarlos. Cambia la formacion de cada equipo con los
          selectores de arriba.
        </p>
      </div>
      <Editor />
    </main>
  );
}
