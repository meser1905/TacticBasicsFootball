# Contributing (devs)

Guia tecnica para contribuir codigo al proyecto. Si sos entrenador y queres sumar una formacion o ejercicio sin programar, mira [CONTRIBUTING.md](../CONTRIBUTING.md) en la raiz.

## Workflow

```bash
# 1. Fork del repo en GitHub, despues:
git clone https://github.com/<tu-usuario>/TacticBasicsFootball.git
cd TacticBasicsFootball
git remote add upstream https://github.com/meser1905/TacticBasicsFootball.git

# 2. Branch nuevo
git checkout -b feat/mi-feature

# 3. Trabajar, commits atomicos
git add .
git commit -m "feat: add 3d camera presets"

# 4. Antes de pushear, correr la suite local
pnpm lint
pnpm typecheck
pnpm test
pnpm build

# 5. Push y abrir PR
git push origin feat/mi-feature
```

## Convenciones

### TypeScript

- Modo estricto. Nada de `any`. Si necesitas un tipo desconocido, usa `unknown` y narrowing.
- `noUncheckedIndexedAccess` activo: `array[0]` puede ser `undefined`, manejalo.
- Tipos de props: en el mismo archivo, prefijo `Props`. Tipos del dominio: en `src/types/`.

### Componentes

- Un componente por archivo. PascalCase para el archivo si es un componente (`PlayerCard.tsx`).
- Function components, nunca class components.
- Hooks personalizados en `src/hooks/`, prefijo `use`.

### Estado

- Zustand para estado global. Un store por dominio (`pitchStore`, `playersStore`, etc).
- `useState` para estado local del componente.
- Nunca poner datos derivables en el estado: calcularlos.

### CSS

- Tailwind. Nada de CSS-in-JS, nada de modulos.
- `cn()` de `@/lib/utils` para mergear clases condicionales.
- Tokens de tema en `globals.css`. Si necesitas un color nuevo, agregarlo ahi como variable y al `@theme inline`.

### Imports

- Absolutos con `@/` para todo lo del proyecto.
- Imports de tipos con `import type` (esto lo enforcea ESLint).
- Orden: externos, internos absolutos, internos relativos, tipos.

### Tests

- Vitest para unit e integration.
- Playwright para E2E.
- Cobertura objetivo: 70% sobre `lib/` y `hooks/`. Los componentes son mas dificiles de unit-testear, pero los criticos (Pitch2D, Timeline) merecen su test.

## Commits

Conventional Commits. Tipos:

- `feat:` nueva funcionalidad
- `fix:` bug fix
- `docs:` documentacion
- `refactor:` cambio interno sin afectar comportamiento
- `test:` agregar/cambiar tests
- `chore:` build, deps, herramientas
- `style:` formato, espacios (no cambios funcionales)
- `perf:` mejora de performance
- `ci:` GitHub Actions

Scope opcional pero recomendado:

```
feat(formations): add 3-4-3 with diamond midfield
fix(timeline): keyframe interpolation overshoots on ease-out
docs(architecture): clarify 3D lazy loading rationale
```

Mensajes en ingles (Conventional Commits es estandar).

## PRs

Un PR = un cambio coherente. Si mezclaste feat + refactor sin pensar, mejor dividilo.

Checklist antes de pedir review:

- [ ] Self-review del diff completo
- [ ] Comentarios solo donde la intencion no sea obvia
- [ ] Tests pasan
- [ ] Lint y typecheck sin warnings
- [ ] Build de produccion funciona
- [ ] Si afecta UX, gif/captura comparando antes vs despues

## Estilo de codigo

### Cuando comentar

**Si**: cuando la intencion no es obvia. Hacks. Workarounds para bugs externos. Decisiones contraintuitivas.

**No**: explicar que hace una funcion bien nombrada. Comentar cada linea. Redundancia con el codigo.

### Cuando abstraer

Regla de tres: tres usos similares = abstraer. Dos = duplicar es OK. Uno = nunca abstraer.

### Cuando dividir un componente

- Si pasa 200 lineas, probablemente si.
- Si tiene mas de 3 responsabilidades, si.
- Si una parte se va a reusar, si.

## Decisiones tomadas (ADRs informales)

### Por que no Server Components para el editor

El editor es interactivo de punta a punta. Convertirlo a RSC seria solo agregar friccion.

### Por que Zustand y no Redux

Zustand es 3KB y sin boilerplate. Para este proyecto alcanza.

### Por que SVG y no Canvas para 2D

22 jugadores no es un game engine. SVG es accesible, escalable, y el DOM hace el trabajo. Si en algun momento necesitamos animar 200+ elementos, repensamos.

### Por que IndexedDB y no solo localStorage

localStorage es para preferencias chicas (kilobytes). Tacticas con keyframes y dibujos pueden pesar megabytes y queremos queries. IndexedDB resuelve esto.
