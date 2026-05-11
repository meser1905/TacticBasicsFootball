import type { Formation } from "@/types";

export const formation325: Formation = {
  id: "3-2-5",
  name: "3-2-5 (ultraofensiva)",
  category: "football11-specific",
  description:
    "Sistema ultraofensivo opuesto al 5-4-1: solo tres defensores, dos volantes y cinco delanteros buscando el gol.",
  strengths: [
    "Presencia masiva en area rival",
    "Cinco atacantes ocupan ancho y profundidad",
    "Util cuando hay que ir al ataque si o si",
  ],
  weaknesses: [
    "Solo dos volantes, facil de superar en el medio",
    "Vulnerable a cualquier contraataque",
    "Suicida contra equipos bien organizados",
  ],
  slots: [
    { role: "GK", x: 0.06, y: 0.5 },
    { role: "CB", x: 0.2, y: 0.7 },
    { role: "CB", x: 0.18, y: 0.5 },
    { role: "CB", x: 0.2, y: 0.3 },
    { role: "DMF", x: 0.42, y: 0.62 },
    { role: "DMF", x: 0.42, y: 0.38 },
    { role: "RW", x: 0.78, y: 0.9 },
    { role: "SS", x: 0.78, y: 0.7 },
    { role: "CF", x: 0.82, y: 0.5 },
    { role: "SS", x: 0.78, y: 0.3 },
    { role: "LW", x: 0.78, y: 0.1 },
  ],
};
