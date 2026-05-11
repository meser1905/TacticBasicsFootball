import type { Formation } from "@/types";

export const f8_331: Formation = {
  id: "f8-3-3-1",
  name: "3-3-1",
  category: "football8",
  description:
    "Sistema clasico de futbol 8 con 3 defensores, 3 mediocampistas y 1 delantero. Equilibrio entre defensa y ataque.",
  strengths: [
    "Defensa solida con 3 jugadores",
    "Mediocampo poblado, control del juego",
    "Estructura facil de entender para chicos",
  ],
  weaknesses: [
    "Un solo delantero queda algo aislado",
    "Demanda volantes muy completos",
    "Pierde profundidad sin extremos puros",
  ],
  slots: [
    { role: "GK", x: 0.08, y: 0.5 },
    { role: "RB", x: 0.25, y: 0.78 },
    { role: "CB", x: 0.22, y: 0.5 },
    { role: "LB", x: 0.25, y: 0.22 },
    { role: "RMF", x: 0.55, y: 0.75 },
    { role: "CMF", x: 0.52, y: 0.5 },
    { role: "LMF", x: 0.55, y: 0.25 },
    { role: "CF", x: 0.85, y: 0.5 },
  ],
};
