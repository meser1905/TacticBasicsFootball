import type { Formation } from "@/types";

export const formation442: Formation = {
  id: "4-4-2",
  name: "4-4-2",
  category: "football11-classic",
  description:
    "Sistema clasico con linea de 4 defensores, 4 volantes en linea y 2 delanteros. Solido, equilibrado y facil de entender.",
  strengths: [
    "Estructura defensiva clara con dos lineas paralelas",
    "Facil de entender para cualquier jugador",
    "Dos puntas presionan al fondo rival",
    "Equilibrio entre ataque y defensa",
  ],
  weaknesses: [
    "Puede quedar superado por equipos con 3 volantes centrales",
    "Los extremos quedan lejos del juego central",
    "Requiere mucho esfuerzo fisico de los volantes",
  ],
  famousFor: "Arrigo Sacchi con el Milan de los 80",
  slots: [
    { role: "GK", x: 0.06, y: 0.5 },
    { role: "RB", x: 0.22, y: 0.85 },
    { role: "CB", x: 0.2, y: 0.62 },
    { role: "CB", x: 0.2, y: 0.38 },
    { role: "LB", x: 0.22, y: 0.15 },
    { role: "RMF", x: 0.52, y: 0.85 },
    { role: "CMF", x: 0.5, y: 0.62 },
    { role: "CMF", x: 0.5, y: 0.38 },
    { role: "LMF", x: 0.52, y: 0.15 },
    { role: "CF", x: 0.82, y: 0.6 },
    { role: "CF", x: 0.82, y: 0.4 },
  ],
};
