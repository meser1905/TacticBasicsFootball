<div align="center">

<img src="public/og-image.png" alt="TacticBasicsFootball" width="100%" />

# TacticBasicsFootball

### Pizarra tactica de futbol gratis, open source y moderna para entrenadores

[![License: MIT](https://img.shields.io/badge/license-MIT-22c55e.svg?style=flat-square)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-15-000000?style=flat-square&logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178c6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06b6d4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Three.js](https://img.shields.io/badge/Three.js-r170-000000?style=flat-square&logo=three.js)](https://threejs.org)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-ff6b35.svg?style=flat-square)](CONTRIBUTING.md)

[![Stars](https://img.shields.io/github/stars/meser1905/tactic-basics-football?style=social)](https://github.com/meser1905/tactic-basics-football/stargazers)
[![Forks](https://img.shields.io/github/forks/meser1905/tactic-basics-football?style=social)](https://github.com/meser1905/tactic-basics-football/network/members)

**[Demo en vivo](https://tacticbasicsfootball.vercel.app)** &nbsp;·&nbsp; **[Reportar bug](https://github.com/meser1905/tactic-basics-football/issues/new?template=bug_report.md)** &nbsp;·&nbsp; **[Pedir feature](https://github.com/meser1905/tactic-basics-football/issues/new?template=feature_request.md)**

**Leer en otros idiomas:** [English](README.en.md) &nbsp;·&nbsp; [Portugues](README.pt.md)

</div>

---

> [!NOTE]
> Proyecto en desarrollo activo. La Fase 1 (estructura base) ya esta lista. El editor 2D, 3D, la biblioteca de entrenamientos y el sistema de jugadas animadas estan en construccion. Mira el [roadmap](#-roadmap) abajo.

## Por que existe esto

TacticalPad y similares son geniales, pero son pagos, viejos o complicados de usar para un entrenador que solo quiere abrir la app y dibujar una jugada. **TacticBasicsFootball** es la respuesta: gratis, open source, moderno, rapido y pensado para que un DT de 45 anios lo agarre en una tablet en el campo y entienda todo sin tutorial.

## Features

### Editor de cancha
- :soccer: **Modo 2D** cenital, SVG escalable, cancha reglamentaria 105x68m
- :video_game: **Modo 3D** con Three.js, camaras preset (cenital, lateral, detras del arco, DT)
- :arrows_counterclockwise: Toggle 2D :left_right_arrow: 3D con animacion suave
- :iphone: Drag and drop fluido (touch + mouse)
- :soccer: Soporte para futbol 11, 8, 7 y futsal con dimensiones reales

### Formaciones
- :clipboard: **40+ formaciones preset** del futbol mundial
- Clasicas: 4-4-2, 4-3-3, 4-2-3-1, 3-5-2, 5-3-2, arbol de Navidad...
- Modernas: 2-3-2-3 (Guardiola), 3-4-2-1, 4-2-2-2 cuadrado magico...
- Historicas: WM, 2-3-5 piramide clasica, catenaccio...
- Cada formacion con fortalezas, debilidades y equipo famoso que la uso

### Jugadas animadas
- :clapper: Timeline tipo video editor con keyframes
- :arrow_forward: Reproducir, pausar, scrubbing, velocidad ajustable (0.25x a 2x)
- :curly_loop: Herramientas de dibujo: flechas, lineas de pase, zonas, texto
- :soccer: Pelota como entidad independiente con trayectoria visible

### Biblioteca de entrenamientos
- :books: **80+ ejercicios preset** listos para usar
- Por posicion: arqueros, defensores, laterales, volantes, extremos, delanteros
- En equipo: posesion, transiciones, presion alta, pelota parada, ataque combinativo
- Cada uno con objetivo, duracion, materiales y variantes

### Compartir y exportar
- :link: Compartir tactica con URL corta (sin backend, todo va comprimido en el hash)
- :frame_photo: Export PNG en alta resolucion
- :movie_camera: Export GIF y MP4 de la jugada animada
- :page_facing_up: Export PDF con plan de entrenamiento completo
- :tv: Modo presentacion fullscreen para mostrar al equipo

### UX para DTs
- :rocket: Funciona sin login, todo se guarda local
- :arrow_left: Undo/Redo con 50 niveles de historial
- :keyboard: Atajos de teclado (presiona `?` para verlos)
- :crescent_moon: Modo oscuro por default (cambiable)
- :iphone: PWA, funciona offline despues de la primera carga
- :globe_with_meridians: i18n: espaniol (default), ingles, portugues

## Quick start

```bash
# 1. Clonar
git clone https://github.com/meser1905/tactic-basics-football.git
cd tactic-basics-football

# 2. Instalar dependencias
pnpm install

# 3. Levantar el dev server
pnpm dev
```

Abri [http://localhost:3000](http://localhost:3000) y listo.

### Scripts disponibles

| Comando | Descripcion |
|---------|-------------|
| `pnpm dev` | Levanta el servidor de desarrollo con Turbopack |
| `pnpm build` | Compila para produccion |
| `pnpm start` | Levanta el servidor de produccion |
| `pnpm lint` | Corre ESLint |
| `pnpm typecheck` | Chequea tipos con TypeScript |
| `pnpm test` | Corre los tests con Vitest |
| `pnpm format` | Formatea el codigo con Prettier |

## Stack tecnico

| Capa | Tech |
|------|------|
| Framework | [Next.js 15](https://nextjs.org) (App Router) |
| UI | [React 19](https://react.dev) + [TypeScript 5.7](https://www.typescriptlang.org) |
| Estilos | [Tailwind CSS v4](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com) |
| 2D | SVG + [Framer Motion](https://www.framer.com/motion/) |
| 3D | [Three.js](https://threejs.org) + [React Three Fiber](https://r3f.docs.pmnd.rs) + [Drei](https://github.com/pmndrs/drei) |
| Estado | [Zustand](https://zustand-demo.pmnd.rs) (con persist) |
| Storage | localStorage + [IndexedDB](https://dexie.org) (Dexie) |
| Compartir | [lz-string](https://github.com/pieroxy/lz-string) en URL hash |
| Export | html2canvas (PNG), gif.js (GIF), MediaRecorder (MP4), jsPDF (PDF) |
| i18n | [next-intl](https://next-intl.dev) |
| Tests | [Vitest](https://vitest.dev) + [Testing Library](https://testing-library.com) + [Playwright](https://playwright.dev) |
| PWA | [next-pwa](https://github.com/shadowwalker/next-pwa) |
| Deploy | [Vercel](https://vercel.com) |

## Roadmap

- [x] **Fase 1** - Estructura del repo, configs base, README
- [ ] **Fase 2** - Layout principal, theme provider, header, sidebar, i18n
- [ ] **Fase 3** - Cancha 2D con drag and drop de jugadores
- [ ] **Fase 4** - Sistema de formaciones preset (4-4-2, 4-3-3, 3-5-2)
- [ ] **Fase 5** - Modo 3D con Three.js y R3F
- [ ] **Fase 6** - Timeline y sistema de keyframes
- [ ] **Fase 7** - Herramientas de dibujo (flechas, zonas, texto)
- [ ] **Fase 8** - Biblioteca de entrenamientos
- [ ] **Fase 9** - Export (PNG, GIF, MP4, PDF)
- [ ] **Fase 10** - Compartir por URL, PWA, optimizaciones

## Como contribuir

Toda contribucion es bienvenida. Si queres sumar una formacion, un ejercicio de entrenamiento, traducir a tu idioma, reportar un bug o mejorar el codigo, mira [CONTRIBUTING.md](CONTRIBUTING.md).

Tres formas faciles de empezar:

1. :star: **Dale una estrella al repo** si te gusta la idea (es gratis y ayuda muchisimo).
2. :soccer: **Sumar una formacion**: usa el [template de issue](https://github.com/meser1905/tactic-basics-football/issues/new?template=new_formation.md) y mandanos los datos.
3. :bug: **Reporta un bug** o pedi una feature con los templates correspondientes.

Tambien tenemos un [Code of Conduct](CODE_OF_CONDUCT.md) para que todos la pasemos bien.

## Apoyar el proyecto

Si TacticBasicsFootball te ayuda en tu trabajo como DT o como dev, podes apoyar el desarrollo:

- :star: **Estrella en GitHub** (gratis y la mejor ayuda)
- :coffee: [Cafecito](https://cafecito.app/meser1905) (Argentina)
- :heart: [GitHub Sponsors](https://github.com/sponsors/meser1905)
- :coffee: [Ko-fi](https://ko-fi.com/meser1905)

## Licencia

[MIT](LICENSE) (c) 2026 meser1905 y contribuidores

---

<div align="center">

Hecho con :heart: y mate por entrenadores y devs hispanohablantes.

**[English](README.en.md)** &nbsp;·&nbsp; **[Portugues](README.pt.md)**

</div>
