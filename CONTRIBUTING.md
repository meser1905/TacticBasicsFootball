# Contribuir a TacticBasicsFootball

Gracias por querer sumar. Toda ayuda es bienvenida: codigo, formaciones, ejercicios de entrenamiento, traducciones, bug reports, ideas.

## Antes de empezar

1. Lee el [Code of Conduct](CODE_OF_CONDUCT.md).
2. Fija el proyecto local segun el [Quick start del README](README.md#quick-start).
3. Si vas a tocar algo grande, abri un issue primero para alinear.

## Como contribuir (segun tu perfil)

### Eres entrenador / DT

No hace falta saber programar. Podes:

- **Sumar una formacion**: usa el [template](.github/ISSUE_TEMPLATE/new_formation.md) y completa nombre, descripcion, fortalezas, debilidades y posiciones X/Y de cada jugador.
- **Sumar un ejercicio de entrenamiento**: abri un issue con objetivo, duracion, materiales, descripcion paso a paso y variantes.
- **Reportar un bug** o **pedir una feature**: usa los templates de issue.

### Eres dev

1. Fork del repo y clonalo local.
2. Crea una rama con un nombre descriptivo: `feat/add-3d-mode`, `fix/timeline-scrubbing`, `docs/update-readme`.
3. Hace los cambios. Manten los commits chicos y atomicos.
4. Antes de pushear:
   - `pnpm lint` (cero warnings)
   - `pnpm typecheck` (cero errores)
   - `pnpm test` (todos pasan)
   - `pnpm format` (codigo formateado)
5. Pushea y abri un PR usando el [template](.github/PULL_REQUEST_TEMPLATE.md).

### Eres disenador

Si tenes ideas de UX, mockups o feedback de diseno, abri un issue con la etiqueta `design`. Apreciamos especialmente feedback sobre la experiencia tablet (que es el caso de uso principal).

### Eres traductor

Si queres traducir la app a otro idioma:

1. Copia `src/i18n/es.json` a `src/i18n/<tu-idioma>.json`.
2. Traduci los valores (no las keys).
3. Manda un PR.

Idiomas con mas demanda: italiano, frances, aleman, japones.

## Convenciones de codigo

- **TypeScript estricto**: nada de `any`. Usa `unknown` y narrowing si hace falta.
- **Comentarios**: solo donde la intencion no sea obvia del codigo. Nada de comentarios de "que hace" el codigo.
- **Componentes**: un componente por archivo. PascalCase para el archivo si es un componente, camelCase para utils.
- **Imports**: usa `@/` para imports absolutos desde `src/`.
- **Tests**: cada componente o util importante con al menos un test.

## Conventional Commits

Usa este formato en los mensajes de commit:

```
feat: add 3d pitch mode
fix: keyframe interpolation when speed is 0.25x
docs: update getting-started guide
refactor: extract player drag logic to hook
test: add unit tests for formation loader
chore: bump dependencies
```

Tipos validos: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`, `style`, `perf`, `ci`.

## PRs

- Un PR = un cambio coherente. Si estas mezclando feat + refactor, separalo en dos.
- Describi **que** y **por que**, no solo el **como** (el diff ya muestra el como).
- Si afecta UX, suma una captura o un gif.
- Si afecta performance, suma numeros (antes vs despues).

## Estilo de UX

Pensa siempre en el usuario final: un entrenador, no un developer. Tres principios:

1. **Simple gana a complejo**. Si una feature necesita tutorial, esta mal disenada.
2. **Touch first**. Botones grandes (44x44 minimo), zonas de toque amplias.
3. **Sin sorpresas**. Auto-save siempre. Undo siempre disponible. Nunca borrar nada sin confirmar.

## Dudas

Abri un issue con la etiqueta `question` o entra a las [Discussions](https://github.com/meser1905/TacticBasicsFootball/discussions).

Gracias por sumar :soccer:
