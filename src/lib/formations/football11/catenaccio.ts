import type { Formation } from "@/types";

export const formationCatenaccio: Formation = {
  id: "catenaccio",
  name: "Catenaccio (1-4-3-2)",
  category: "football11-historic",
  description:
    "Sistema italiano historico ultradefensivo: un libero como ultimo recurso, cuatro defensores marcando al hombre, tres volantes y dos delanteros.",
  strengths: [
    "Defensa numerosa con libero como seguro final",
    "Muy dificil de superar",
    "Especialista en aguantar resultados",
  ],
  weaknesses: [
    "Iniciativa ofensiva casi nula",
    "Solo dos delanteros, muy aislados",
    "Hoy lo penalizaria cualquier rival moderno",
  ],
  slots: [
    { role: "GK", x: 0.06, y: 0.5 },
    { role: "CB", x: 0.14, y: 0.5 },
    { role: "RB", x: 0.22, y: 0.85 },
    { role: "CB", x: 0.22, y: 0.62 },
    { role: "CB", x: 0.22, y: 0.38 },
    { role: "LB", x: 0.22, y: 0.15 },
    { role: "DMF", x: 0.45, y: 0.5 },
    { role: "CMF", x: 0.5, y: 0.7 },
    { role: "CMF", x: 0.5, y: 0.3 },
    { role: "CF", x: 0.78, y: 0.6 },
    { role: "CF", x: 0.78, y: 0.4 },
  ],
};
