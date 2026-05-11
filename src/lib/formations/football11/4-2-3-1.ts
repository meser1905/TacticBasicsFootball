import type { Formation } from "@/types";

export const formation4231: Formation = {
  id: "4-2-3-1",
  name: "4-2-3-1",
  category: "football11-classic",
  description:
    "Sistema moderno y muy popular: doble pivote de contencion, tres mediapuntas (con extremos) y un delantero referencia.",
  strengths: [
    "Solidez defensiva con doble pivote",
    "Tres mediapuntas crean superioridades constantes",
    "Transicion natural al 4-3-3 cuando ataca",
  ],
  weaknesses: [
    "Solo un delantero, puede quedar aislado",
    "Requiere un enganche talentoso si o si",
    "Extremos que no defienden exponen a los laterales",
  ],
  slots: [
    { role: "GK", x: 0.06, y: 0.5 },
    { role: "RB", x: 0.22, y: 0.85 },
    { role: "CB", x: 0.2, y: 0.62 },
    { role: "CB", x: 0.2, y: 0.38 },
    { role: "LB", x: 0.22, y: 0.15 },
    { role: "DMF", x: 0.4, y: 0.62 },
    { role: "DMF", x: 0.4, y: 0.38 },
    { role: "RMF", x: 0.62, y: 0.82 },
    { role: "AMF", x: 0.65, y: 0.5 },
    { role: "LMF", x: 0.62, y: 0.18 },
    { role: "CF", x: 0.85, y: 0.5 },
  ],
};
