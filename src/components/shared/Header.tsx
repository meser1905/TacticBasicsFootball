import Link from "next/link";
import Image from "next/image";
import { Github } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center" aria-label="TacticBasicsFootball home">
          <Image
            src="/logo.png"
            alt="TacticBasicsFootball"
            width={760}
            height={285}
            priority
            className="h-14 w-auto sm:h-16"
          />
        </Link>

        <nav className="flex items-center gap-1">
          <Link
            href="/"
            className="rounded-md px-3 py-1.5 text-sm font-medium text-foreground transition hover:bg-secondary"
          >
            Editor
          </Link>
          <Link
            href="/trainings"
            className="rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition hover:bg-secondary hover:text-foreground"
          >
            Entrenamientos
          </Link>
          <a
            href="https://github.com/meser1905/TacticBasicsFootball"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-sm font-medium text-foreground transition hover:bg-secondary"
          >
            <Github className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
