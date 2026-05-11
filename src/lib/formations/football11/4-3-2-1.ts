import type { Formation } from "@/types";

export const formation4321: Formation = {
  id: "4-3-2-1",
  name: "4-3-2-1 (arbol de Navidad)",
  category: "football11-classic",
  description:
    "Cuatro defensores, tres volantes centrales, dos enganches y un delantero referencia. La forma triangular le valio el apodo de arbol de Navidad.",
  strengths: [
    "Densidad total en el centro del campo",
    "Dos enganches generan combinaciones cortas",
    "Estructura muy dificil de romper por el medio",
  ],
  weaknesses: [
    "Sin extremos ni carrileros, depende del lateral para amplitud",
    "El delantero queda solo arriba",
    "Pierde mucho juego por las bandas",
  ],
  slots: [
    { role: "GK", x: 0.06, y: 0.5 },
    { role: "RB", x: 0.22, y: 0.85 },
    { role: "CB", x: 0.2, y: 0.62 },
    { role: "CB", x: 0.2, y: 0.38 },
    { role: "LB", x: 0.22, y: 0.15 },
    { role: "DMF", x: 0.4, y: 0.5 },
    { role: "CMF", x: 0.5, y: 0.7 },
    { role: "CMF", x: 0.5, y: 0.3 },
    { role: "AMF", x: 0.65, y: 0.6 },
    { role: "AMF", x: 0.65, y: 0.4 },
    { role: "CF", x: 0.85, y: 0.5 },
  ],
};
