import Image from "next/image";
import Link from "next/link";
import { Github, Heart, BookOpen, Bug, GitPullRequest, Scale } from "lucide-react";

const REPO = "https://github.com/meser1905/TacticBasicsFootball";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-card/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <Link href="/" className="inline-flex items-center" aria-label="TacticBasicsFootball home">
              <Image
                src="/logo.png"
                alt="TacticBasicsFootball"
                width={520}
                height={195}
                className="h-24 w-auto sm:h-32"
              />
            </Link>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              Pizarra tactica de futbol gratis, open source y moderna. Pensada para entrenadores
              que quieren disenar jugadas sin complicarse.
            </p>
          </div>

          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Proyecto
            </h3>
            <ul className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <li>
                <a
                  href={REPO}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-foreground/80 transition hover:text-foreground"
                >
                  <Github className="h-3.5 w-3.5 text-muted-foreground" />
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={`${REPO}/issues/new?template=bug_report.md`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-foreground/80 transition hover:text-foreground"
                >
                  <Bug className="h-3.5 w-3.5 text-muted-foreground" />
                  Reportar bug
                </a>
              </li>
              <li>
                <a
                  href={`${REPO}/blob/main/CONTRIBUTING.md`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-foreground/80 transition hover:text-foreground"
                >
                  <GitPullRequest className="h-3.5 w-3.5 text-muted-foreground" />
                  Contribuir
                </a>
              </li>
              <li>
                <Link
                  href="/trainings"
                  className="inline-flex items-center gap-2 text-foreground/80 transition hover:text-foreground"
                >
                  <BookOpen className="h-3.5 w-3.5 text-muted-foreground" />
                  Entrenamientos
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
          <div className="flex items-center gap-3">
            <a
              href={`${REPO}/blob/main/LICENSE`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 transition hover:text-foreground"
            >
              <Scale className="h-3 w-3" />
              MIT License
            </a>
            <span className="opacity-50">·</span>
            <span>2026 meser1905 y contribuidores</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span>Hecho con</span>
            <Heart className="h-3 w-3 text-pink-400" />
            <span>y mate, en codigo abierto</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
