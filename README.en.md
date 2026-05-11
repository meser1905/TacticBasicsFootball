<div align="center">

# TacticBasicsFootball

### Free, open-source and modern football tactical board for coaches

[![License: MIT](https://img.shields.io/badge/license-MIT-22c55e.svg?style=flat-square)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-15-000000?style=flat-square&logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178c6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06b6d4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-ff6b35.svg?style=flat-square)](CONTRIBUTING.md)

**[Live demo](https://tacticbasicsfootball.vercel.app)** &nbsp;·&nbsp; **[Report bug](https://github.com/meser1905/tactic-basics-football/issues/new?template=bug_report.md)** &nbsp;·&nbsp; **[Request feature](https://github.com/meser1905/tactic-basics-football/issues/new?template=feature_request.md)**

**Read in other languages:** [Espanol](README.md) &nbsp;·&nbsp; [Portugues](README.pt.md)

</div>

---

> [!NOTE]
> Project under active development. Phase 1 (base structure) is done. The 2D and 3D editor, training library and play animation system are being built. See the [roadmap](#roadmap) below.

## Why it exists

TacticalPad and similar tools are great, but they are paid, outdated or too complex for a coach who just wants to open the app and draw a play. **TacticBasicsFootball** is the answer: free, open source, modern, fast and built so a 45-year-old coach can pick up a tablet on the field and figure it out without a tutorial.

## Features

### Pitch editor
- :soccer: **2D mode** top-down view, scalable SVG, regulation pitch 105x68m
- :video_game: **3D mode** with Three.js, preset cameras (top, side, behind goal, coach view)
- :iphone: Smooth drag and drop (touch + mouse)
- :soccer: Support for 11-a-side, 8, 7 and futsal with real dimensions

### Formations
- :clipboard: **40+ preset formations** from world football
- Classic: 4-4-2, 4-3-3, 4-2-3-1, 3-5-2, Christmas tree...
- Modern: 2-3-2-3 (Guardiola), 3-4-2-1, 4-2-2-2 magic square...
- Historic: WM, 2-3-5 classic pyramid, catenaccio...

### Animated plays
- :clapper: Video editor-style timeline with keyframes
- :curly_loop: Drawing tools: arrows, pass lines, zones, text
- :soccer: Ball as independent entity with visible trajectory

### Training library
- :books: **80+ preset exercises** ready to use
- By position: keepers, defenders, fullbacks, midfielders, wingers, strikers
- Team: possession, transitions, pressing, set pieces, organized attack

### Share and export
- :link: Share with short URL (no backend, compressed in hash)
- :frame_photo: PNG, GIF, MP4, PDF export
- :tv: Fullscreen presentation mode

### Coach-friendly UX
- :rocket: No login needed, everything saves locally
- :arrow_left: Undo/Redo with 50 levels
- :keyboard: Keyboard shortcuts (press `?` to see them)
- :iphone: PWA, offline after first load
- :globe_with_meridians: i18n: Spanish (default), English, Portuguese

## Quick start

```bash
git clone https://github.com/meser1905/tactic-basics-football.git
cd tactic-basics-football
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) and you are good to go.

## Tech stack

Next.js 15 + React 19 + TypeScript + Tailwind CSS v4 + shadcn/ui + Three.js + React Three Fiber + Zustand + Vitest + Playwright.

## Roadmap

- [x] **Phase 1** - Repo structure, base configs, README
- [ ] **Phase 2** - Main layout, theme provider, header, sidebar, i18n
- [ ] **Phase 3** - 2D pitch with drag and drop
- [ ] **Phase 4** - Preset formations system
- [ ] **Phase 5** - 3D mode with Three.js + R3F
- [ ] **Phase 6** - Timeline and keyframes
- [ ] **Phase 7** - Drawing tools
- [ ] **Phase 8** - Training library
- [ ] **Phase 9** - Export (PNG, GIF, MP4, PDF)
- [ ] **Phase 10** - Share by URL, PWA, optimizations

## Contributing

All contributions welcome. To add a formation, training exercise, translate or fix a bug, see [CONTRIBUTING.md](CONTRIBUTING.md).

## License

[MIT](LICENSE) (c) 2026 meser1905 and contributors

---

<div align="center">

**[Espanol](README.md)** &nbsp;·&nbsp; **[Portugues](README.pt.md)**

</div>
