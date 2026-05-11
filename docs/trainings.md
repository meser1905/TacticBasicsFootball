# Entrenamientos

Como funciona la biblioteca de entrenamientos y como sumar un ejercicio nuevo.

## Estructura de un entrenamiento

```ts
import type { Training } from "@/types";

export const training_salida_desde_fondo: Training = {
  id: "salida-desde-fondo",
  name: "Salida desde el fondo vs presion alta",
  category: "team-buildup",
  position: null,
  objective: "Mejorar la salida limpia bajo presion del rival.",
  duration: { min: 15, max: 20 },
  players: { min: 8, max: 11 },
  materials: [
    { name: "Conos", count: 8 },
    { name: "Petos", count: 11 },
  ],
  level: ["youth", "professional"],
  ageMin: 14,
  steps: [
    "Disponemos al equipo en formacion de partido en su propio campo.",
    "Cuatro rivales hacen presion alta a los centrales y volantes.",
    "El arquero inicia el juego solo con los pies.",
    "Objetivo: pasar la linea de presion con maximo 6 pases.",
  ],
  variants: [
    {
      type: "harder",
      description: "Sumar un quinto presionante (centro al campo).",
    },
    {
      type: "easier",
      description: "Permitir que los laterales reciban en banda libre.",
    },
  ],
  diagram: {
    keyframes: [
      // ...keyframes de la jugada animada
    ],
  },
};
```

## Categorias

| ID | Categoria |
|----|-----------|
| `position-keeper` | Arqueros |
| `position-center-back` | Defensores centrales |
| `position-fullback` | Laterales |
| `position-defensive-mid` | Volantes centrales |
| `position-attacking-mid` | Volantes ofensivos / enganches |
| `position-winger` | Extremos / punteros |
| `position-striker` | Delanteros |
| `team-possession` | Posesion |
| `team-buildup` | Salida y construccion |
| `team-transitions` | Transiciones |
| `team-defensive` | Defensivos |
| `team-attacking` | Ofensivos |
| `team-setpieces` | Pelota parada |
| `team-small-sided` | Futbol reducido |
| `team-physical` | Fisico con pelota |
| `team-finishing` | Finalizacion |

## Niveles

- `kids` (infantil, 6-12 anios)
- `youth` (juvenil, 13-17 anios)
- `amateur` (mayores amateur)
- `professional` (profesional)

## Como sumar un ejercicio

### Opcion 1: sos entrenador

Abri un issue contandonos:

1. Nombre del ejercicio
2. Categoria
3. Objetivo (1 oracion)
4. Duracion recomendada
5. Numero de jugadores
6. Materiales
7. Descripcion paso a paso
8. Variantes (mas dificil, mas facil)

Si podes mandar un diagrama (foto, dibujo a mano, lo que sea), mejor.

### Opcion 2: sos dev

1. Crear el archivo en `src/lib/trainings/<categoria>/<nombre>.ts`.
2. Importar y agregar al index `src/lib/trainings/index.ts`.
3. Si tiene diagrama animado, construir los keyframes.
4. Test en `tests/unit/trainings.test.ts`.
5. PR.

## Lista de ejercicios

Por posicion (54 ejercicios planeados):

- Arqueros: 8
- Centrales: 6
- Laterales: 6
- Volantes centrales: 6
- Volantes ofensivos: 5
- Extremos: 6
- Delanteros: 7

En equipo (40+ ejercicios planeados):

- Posesion: 5 (rondos varios + posesion por zonas)
- Salida y construccion: 3
- Transiciones: 3
- Defensivos: 5
- Ofensivos: 4
- Pelota parada: 6
- Futbol reducido: 4
- Fisico con pelota: 4
- Finalizacion: 4

Total objetivo: 80+ ejercicios preset listos para usar.
