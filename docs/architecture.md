# Arquitectura

Diseno general de TacticBasicsFootball. Documento vivo, se actualiza con cada fase.

## Principios

1. **Local first**. Todo funciona sin backend. localStorage + IndexedDB. El servidor solo sirve assets estaticos.
2. **Simple gana a complejo**. Si una abstraccion no se usa al menos 3 veces, no existe.
3. **Performance importa**. El usuario probablemente esta en una tablet de gama media. Lazy load lo pesado (Three.js).
4. **Touch-first**. Cada feature se prueba en touch antes que en mouse.

## Stack

### Framework: Next.js 15 (App Router)

Por que: SSR/SSG cuando hace falta (landing, share pages), CSR para el editor. Routing simple. Vercel deploy es trivial.

No usamos Server Actions ni Server Components para el editor: es interactivo de punta a punta, todo client-side.

### UI: React 19 + TypeScript estricto

React 19 por el nuevo compiler (auto-memoizacion) y mejores defaults.

TypeScript estricto con `noUncheckedIndexedAccess`: si accedes a un array por indice, te obliga a chequear `undefined`. Vale la friccion.

### Estilos: Tailwind v4 + shadcn/ui

Tailwind v4 con CSS-first config (no mas `tailwind.config.ts`, todo en `globals.css`).

shadcn/ui no es una libreria de componentes, son recetas. Cada componente se copia al repo y queda bajo nuestro control. Cero lock-in.

### 2D: SVG nativo

Por que no Canvas: SVG es accesible, escalable infinitamente, y el DOM hace el trabajo pesado. Solo hay 22 jugadores, no es un game engine.

Framer Motion para las transiciones entre keyframes.

### 3D: Three.js + React Three Fiber + Drei

R3F es Three.js declarativo en React. Drei son helpers (OrbitControls, useTexture, etc).

El modo 3D va detras de un `dynamic(() => import(...), { ssr: false })` para no inflar el bundle inicial.

### Estado: Zustand

Por que no Redux Toolkit: Zustand es 3 KB, sin boilerplate, persist middleware listo, no necesita Provider.

Por que no Context: re-renders innecesarios al cambiar partes del estado.

Stores planeados:

- `pitchStore`: modo 2D/3D, dimensiones de cancha, camara
- `playersStore`: roster, posiciones actuales, colores de equipos
- `timelineStore`: keyframes, frame actual, playback state, dibujos
- `preferencesStore`: tema, idioma, atajos custom (persist en localStorage)

### Storage

- **localStorage** (via Zustand persist) para preferencias del usuario.
- **IndexedDB** (Dexie.js) para tacticas guardadas y rosters. Estructura: `tactics`, `rosters`, `playbooks`.

### Compartir

URL hash con la tactica completa codificada:

```
https://tacticbasicsfootball.vercel.app/share#<base64(lz-string-compressed-json)>
```

Sin backend. Si la URL pasa los 8KB, mostramos opcion de copiar JSON.

### Export

- **PNG**: html2canvas sobre el SVG de la cancha (resolucion 2x).
- **GIF**: gif.js con WebWorker para no bloquear la UI.
- **MP4**: MediaRecorder API grabando el canvas.
- **PDF**: jsPDF con el SVG renderizado + texto del plan.

### i18n: next-intl

Default espaniol (rioplatense neutral). Soporte EN y PT.

Archivos JSON en `src/i18n/`. La logica de carga se inyecta en el layout principal.

## Organizacion del codigo

### Atomicidad

Un archivo = una responsabilidad. Si un componente pasa de 200 lineas, probablemente hay que dividirlo. Si un util es solo una funcion, vive en `lib/utils.ts`; si tiene varias relacionadas, su propio archivo.

### Composicion antes que herencia

Cero clases. Funciones puras + hooks personalizados + componentes.

### Tipos

- Tipos globales del dominio: `src/types/`.
- Tipos de props: en el mismo archivo del componente, prefijo `Props`.
- Tipos derivados (`type X = ReturnType<typeof y>`): inline donde se usan.

## Flujos clave

### Cargar una formacion

1. Usuario abre `FormationPicker`.
2. Click en una card carga el JSON de `lib/formations/<categoria>/<formacion>.ts`.
3. `playersStore.setFormation()` actualiza las posiciones de los 22 jugadores.
4. La cancha (2D o 3D) reacciona y reposiciona con animacion.

### Grabar una jugada

1. Usuario hace click en "Agregar keyframe" en el timeline.
2. `timelineStore` captura un snapshot de todas las posiciones actuales.
3. Usuario mueve jugadores, agrega flechas, etc.
4. Otro click en "Agregar keyframe" guarda el nuevo estado.
5. Al reproducir, interpolamos posiciones frame a frame entre keyframes.

### Compartir

1. Usuario hace click en "Compartir".
2. Tomamos el estado completo (tactica + jugada).
3. Lo serializamos a JSON, lo comprimimos con lz-string, lo codificamos en base64.
4. Construimos la URL y la copiamos al clipboard.

## Por que NO usamos cosas

- **Redux**: Zustand alcanza.
- **GraphQL**: no hay backend.
- **Storybook**: por ahora overkill, tal vez en el futuro.
- **Cypress**: Playwright es mejor.
- **CSS-in-JS (Emotion, styled-components)**: Tailwind alcanza.
- **Lottie**: Framer Motion alcanza para las animaciones que necesitamos.

## Performance budget

- LCP < 2s en 4G
- INP < 200ms en interacciones
- Bundle inicial < 200 KB gzip (sin el 3D)
- 3D chunk separado, < 500 KB gzip
- 60 FPS en el editor en una iPad 9 (2021)
