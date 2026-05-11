import type { Formation } from "@/types";

export const formation4141: Formation = {
  id: "4-1-4-1",
  name: "4-1-4-1",
  category: "football11-classic",
  description:
    "Cuatro defensores, un volante de contencion fijo, cuatro mediocampistas y un delantero. Equilibrio defensivo y ordenado.",
  strengths: [
    "El DMF cubre el espacio entre defensa y medio",
    "Cuatro mediocampistas presionan la salida rival",
    "Buen equilibrio defensivo general",
  ],
  weaknesses: [
    "Solo un delantero, depende de llegadas de segunda linea",
    "Si el DMF se desordena, deja expuesta la defensa",
    "Pocas opciones para crear superioridades ofensivas",
  ],
  slots: [
    { role: "GK", x: 0.06, y: 0.5 },
    { role: "RB", x: 0.22, y: 0.85 },
    { role: "CB", x: 0.2, y: 0.62 },
    { role: "CB", x: 0.2, y: 0.38 },
    { role: "LB", x: 0.22, y: 0.15 },
    { role: "DMF", x: 0.36, y: 0.5 },
    { role: "RMF", x: 0.58, y: 0.85 },
    { role: "CMF", x: 0.55, y: 0.62 },
    { role: "CMF", x: 0.55, y: 0.38 },
    { role: "LMF", x: 0.58, y: 0.15 },
    { role: "CF", x: 0.85, y: 0.5 },
  ],
};
