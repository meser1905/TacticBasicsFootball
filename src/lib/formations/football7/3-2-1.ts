import type { Formation } from "@/types";

export const f7_321: Formation = {
  id: "f7-3-2-1",
  name: "3-2-1",
  category: "football7",
  description:
    "Sistema defensivo con 3 atras, 2 volantes y 1 delantero. Pensado para defender bien y atacar por sorpresa.",
  strengths: [
    "Defensa solida con 3 jugadores",
    "Estructura defensiva muy ordenada",
    "Bueno para enfrentar rivales mas fuertes",
  ],
  weaknesses: [
    "Pocas opciones ofensivas",
    "El delantero queda muy aislado",
    "Demasiado conservador para iniciativa",
  ],
  slots: [
    { role: "GK", x: 0.08, y: 0.5 },
    { role: "RB", x: 0.25, y: 0.75 },
    { role: "CB", x: 0.22, y: 0.5 },
    { role: "LB", x: 0.25, y: 0.25 },
    { role: "CMF", x: 0.5, y: 0.62 },
    { role: "CMF", x: 0.5, y: 0.38 },
    { role: "CF", x: 0.85, y: 0.5 },
  ],
};
