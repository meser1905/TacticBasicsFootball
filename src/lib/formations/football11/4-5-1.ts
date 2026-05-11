import type { Formation } from "@/types";

export const formation451: Formation = {
  id: "4-5-1",
  name: "4-5-1",
  category: "football11-classic",
  description:
    "Sistema con cinco volantes en linea y un solo delantero. Pensado para congestionar el medio y resistir.",
  strengths: [
    "Cinco volantes congestionan el medio rival",
    "Muy dificil de superar centralmente",
    "Ideal para visitar canchas dificiles",
  ],
  weaknesses: [
    "El unico delantero queda aislado",
    "Pocas opciones ofensivas, depende de transiciones",
    "Volantes muy desgastados al final del partido",
  ],
  slots: [
    { role: "GK", x: 0.06, y: 0.5 },
    { role: "RB", x: 0.22, y: 0.85 },
    { role: "CB", x: 0.2, y: 0.62 },
    { role: "CB", x: 0.2, y: 0.38 },
    { role: "LB", x: 0.22, y: 0.15 },
    { role: "RMF", x: 0.5, y: 0.88 },
    { role: "CMF", x: 0.48, y: 0.66 },
    { role: "DMF", x: 0.45, y: 0.5 },
    { role: "CMF", x: 0.48, y: 0.34 },
    { role: "LMF", x: 0.5, y: 0.12 },
    { role: "CF", x: 0.85, y: 0.5 },
  ],
};
