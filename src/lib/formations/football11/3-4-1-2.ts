import type { Formation } from "@/types";

export const formation3412: Formation = {
  id: "3-4-1-2",
  name: "3-4-1-2",
  category: "football11-modern",
  description:
    "Tres centrales, cuatro volantes (carrileros mas dos centrales), un enganche y dos delanteros.",
  strengths: [
    "Dos delanteros amenazan al rival constantemente",
    "El enganche genera juego entre lineas",
    "Carrileros aportan amplitud",
  ],
  weaknesses: [
    "Sin extremos puros, depende de los carrileros",
    "El enganche debe correr mucho para atras",
    "Si los carrileros se cansan, pierde profundidad",
  ],
  slots: [
    { role: "GK", x: 0.06, y: 0.5 },
    { role: "CB", x: 0.2, y: 0.7 },
    { role: "CB", x: 0.18, y: 0.5 },
    { role: "CB", x: 0.2, y: 0.3 },
    { role: "RWB", x: 0.48, y: 0.9 },
    { role: "CMF", x: 0.48, y: 0.6 },
    { role: "CMF", x: 0.48, y: 0.4 },
    { role: "LWB", x: 0.48, y: 0.1 },
    { role: "AMF", x: 0.65, y: 0.5 },
    { role: "CF", x: 0.82, y: 0.6 },
    { role: "CF", x: 0.82, y: 0.4 },
  ],
};
