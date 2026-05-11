import type { Formation } from "@/types";

export const formation424: Formation = {
  id: "4-2-4",
  name: "4-2-4",
  category: "football11-specific",
  description:
    "Sistema brasileno clasico de los 50: cuatro defensores, dos volantes y cuatro delanteros (dos extremos y dos centros).",
  strengths: [
    "Cuatro hombres en ataque permanente",
    "Extremos abren la cancha al maximo",
    "Dos centros generan amenaza constante",
  ],
  weaknesses: [
    "Solo dos volantes, demasiado expuesto en el medio",
    "Demanda muchisimo a los laterales",
    "Vulnerable a equipos con 4 o 5 mediocampistas",
  ],
  slots: [
    { role: "GK", x: 0.06, y: 0.5 },
    { role: "RB", x: 0.22, y: 0.85 },
    { role: "CB", x: 0.2, y: 0.62 },
    { role: "CB", x: 0.2, y: 0.38 },
    { role: "LB", x: 0.22, y: 0.15 },
    { role: "DMF", x: 0.45, y: 0.62 },
    { role: "DMF", x: 0.45, y: 0.38 },
    { role: "RW", x: 0.78, y: 0.88 },
    { role: "CF", x: 0.82, y: 0.62 },
    { role: "CF", x: 0.82, y: 0.38 },
    { role: "LW", x: 0.78, y: 0.12 },
  ],
};
