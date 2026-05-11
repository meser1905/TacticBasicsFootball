# Formaciones

Como funciona el sistema de formaciones y como sumar una nueva.

## Estructura de una formacion

Cada formacion vive en `src/lib/formations/<categoria>/<nombre>.ts` y exporta un objeto con esta forma:

```ts
import type { Formation } from "@/types";

export const formation433: Formation = {
  id: "4-3-3",
  name: "4-3-3",
  category: "football11-classic",
  description:
    "Sistema balanceado con tres delanteros, busca dominio en ataque y solidez con un mediocampo de tres.",
  strengths: [
    "Presion alta efectiva con 3 atacantes",
    "Ancho de cancha permanente con los extremos",
    "Triangulaciones constantes por bandas",
  ],
  weaknesses: [
    "Volantes muy expuestos si los extremos no bajan",
    "Necesita laterales con muchisima resistencia",
    "Vulnerable a contraataques por el centro",
  ],
  slots: [
    { role: "GK", x: 0.06, y: 0.5 },
    { role: "RB", x: 0.22, y: 0.85 },
    { role: "CB", x: 0.2, y: 0.62 },
    { role: "CB", x: 0.2, y: 0.38 },
    { role: "LB", x: 0.22, y: 0.15 },
    { role: "DMF", x: 0.42, y: 0.5 },
    { role: "CMF", x: 0.55, y: 0.68 },
    { role: "CMF", x: 0.55, y: 0.32 },
    { role: "RW", x: 0.82, y: 0.82 },
    { role: "CF", x: 0.85, y: 0.5 },
    { role: "LW", x: 0.82, y: 0.18 },
  ],
};
```

## Coordenadas

Las coordenadas X/Y estan normalizadas entre 0 y 1:

- **X = 0**: linea de fondo propia (arquero).
- **X = 1**: linea de fondo rival.
- **Y = 0**: banda izquierda.
- **Y = 1**: banda derecha.

Para futbol 11 tradicional: 1 jugador con `X` chico (arquero), defensores en `X ~ 0.2`, volantes en `X ~ 0.4-0.6`, delanteros en `X ~ 0.8-0.9`.

## Categorias

| ID | Categoria |
|----|-----------|
| `football11-classic` | Clasicas (4-4-2, 4-3-3, etc) |
| `football11-modern` | Modernas (2-3-2-3, 3-4-2-1) |
| `football11-historic` | Historicas (WM, 2-3-5, catenaccio) |
| `football11-specific` | Especificas (ultra-defensiva/ofensiva) |
| `football8` | Futbol 8 infantil |
| `football7` | Futbol 7 infantil |
| `futsal` | Futbol 5 / Futsal |

## Como sumar una formacion

### Opcion 1: sos entrenador, no programas

Usa el [template de issue](../.github/ISSUE_TEMPLATE/new_formation.md) y completalo. Lo agregamos nosotros.

### Opcion 2: sos dev

1. Crear el archivo en la carpeta correspondiente: `src/lib/formations/football11/3-4-3.ts`.
2. Importar y agregar al index: `src/lib/formations/index.ts`.
3. Agregar test en `tests/unit/formations.test.ts` verificando que tiene 11 jugadores y posiciones validas.
4. PR con la convencion `feat(formations): add 3-4-3`.

## Validaciones

Cada formacion se valida al cargar:

- Numero de jugadores correcto segun categoria (11, 8, 7 o 5).
- Coordenadas dentro del rango [0, 1].
- Exactamente un GK.
- Sin solapamientos (dos jugadores en la misma coordenada).

## Lista de formaciones

La lista completa esta en el [README](../README.md#formaciones). Hay un script (TODO) que la regenera leyendo los archivos.
