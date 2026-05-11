# Getting started

Guia rapida para levantar TacticBasicsFootball local y empezar a trabajar.

## Requisitos

- **Node.js** >= 20 ([descargar](https://nodejs.org))
- **pnpm** >= 9 (`npm install -g pnpm` si no lo tenes)
- **Git** ([descargar](https://git-scm.com))

## Instalacion

```bash
# 1. Clonar el repo
git clone https://github.com/meser1905/tactic-basics-football.git
cd tactic-basics-football

# 2. Instalar dependencias
pnpm install

# 3. Levantar el dev server
pnpm dev
```

Abri [http://localhost:3000](http://localhost:3000).

## Scripts utiles

| Comando | Que hace |
|---------|----------|
| `pnpm dev` | Dev server con Turbopack (hot reload) |
| `pnpm build` | Build de produccion |
| `pnpm start` | Servir el build de produccion local |
| `pnpm lint` | ESLint |
| `pnpm lint:fix` | ESLint con auto-fix |
| `pnpm typecheck` | TypeScript (tsc --noEmit) |
| `pnpm test` | Vitest (una sola corrida) |
| `pnpm test:watch` | Vitest en modo watch |
| `pnpm test:coverage` | Vitest con coverage |
| `pnpm format` | Prettier write |
| `pnpm format:check` | Prettier check (CI) |

## Variables de entorno

Copiar `.env.example` a `.env.local` y editar:

```bash
cp .env.example .env.local
```

| Variable | Default | Que es |
|----------|---------|--------|
| `NEXT_PUBLIC_APP_URL` | `http://localhost:3000` | URL publica de la app |

## Estructura del proyecto

```
src/
├── app/              # Rutas Next.js (App Router)
├── components/       # Componentes React
│   ├── ui/           # shadcn/ui primitives
│   ├── pitch/        # Cancha 2D y 3D
│   ├── players/      # Jugadores
│   ├── timeline/     # Editor de jugadas
│   ├── tools/        # Herramientas de dibujo
│   ├── formations/   # Picker de formaciones
│   ├── trainings/    # Biblioteca de entrenamientos
│   └── shared/       # Header, sidebar, etc.
├── lib/              # Logica de negocio y utilidades
│   ├── formations/   # Datos de formaciones por categoria
│   ├── trainings/    # Datos de entrenamientos
│   ├── animation/    # Sistema de keyframes
│   ├── export/       # PNG, GIF, MP4, PDF
│   ├── share/        # Codificacion para URL hash
│   └── db/           # Dexie (IndexedDB)
├── stores/           # Zustand stores
├── hooks/            # Custom hooks
├── types/            # TypeScript types
└── i18n/             # Traducciones (es, en, pt)
```

## Trabajar en una feature

1. Crear branch desde `master`: `git checkout -b feat/nombre-feature`.
2. Implementar.
3. Correr `pnpm lint && pnpm typecheck && pnpm test`.
4. Commit con conventional commit: `git commit -m "feat: descripcion"`.
5. Push y abrir PR.

## Problemas comunes

### "Module not found: Can't resolve '@/...'"

El alias `@/` apunta a `src/`. Si no lo reconoce, reinicia el dev server.

### "Tailwind classes no se aplican"

Tailwind v4 usa CSS-first config. Mira `src/app/globals.css`. Si agregaste un theme token, reinicia el dev server.

### Hot reload lento

Usa Turbopack (`pnpm dev` ya lo activa con `--turbopack`). Si esta lento, cerra el dev server, borra `.next/` y volve a levantarlo.

## Siguiente paso

Lee [architecture.md](architecture.md) para entender como esta organizado el proyecto a nivel arquitectura.
