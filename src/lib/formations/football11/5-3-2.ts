import type { Formation } from "@/types";

export const formation532: Formation = {
  id: "5-3-2",
  name: "5-3-2",
  category: "football11-classic",
  description:
    "Sistema defensivo con tres centrales, dos laterales bajos, tres volantes en linea y dos delanteros.",
  strengths: [
    "Bloque defensivo muy compacto",
    "Coberturas permanentes entre los tres centrales",
    "Dos delanteros sostienen amenaza ofensiva",
  ],
  weaknesses: [
    "Cede el centro del campo numericamente",
    "Laterales muy bajos, casi sin proyeccion",
    "Dificultad para sostener posesiones largas",
  ],
  slots: [
    { role: "GK", x: 0.06, y: 0.5 },
    { role: "RB", x: 0.2, y: 0.88 },
    { role: "CB", x: 0.18, y: 0.68 },
    { role: "CB", x: 0.16, y: 0.5 },
    { role: "CB", x: 0.18, y: 0.32 },
    { role: "LB", x: 0.2, y: 0.12 },
    { role: "CMF", x: 0.5, y: 0.7 },
    { role: "DMF", x: 0.42, y: 0.5 },
    { role: "CMF", x: 0.5, y: 0.3 },
    { role: "CF", x: 0.82, y: 0.6 },
    { role: "CF", x: 0.82, y: 0.4 },
  ],
};
