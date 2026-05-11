import type { Formation } from "@/types";

export const formationWM: Formation = {
  id: "wm",
  name: "WM (3-2-2-3)",
  category: "football11-historic",
  description:
    "Sistema historico de los anos 30: tres defensores, dos volantes defensivos, dos enganches y tres delanteros. El nombre viene de la forma WM que dibujan las posiciones.",
  strengths: [
    "Equilibrio ofensivo-defensivo para la epoca",
    "Dos enganches generan jugadas centrales",
    "Estructura clara y entrenable",
  ],
  weaknesses: [
    "Estructurado de mas para el futbol moderno",
    "Rigido, poca rotacion de posiciones",
    "Vulnerable a movimientos fluidos contemporaneos",
  ],
  slots: [
    { role: "GK", x: 0.06, y: 0.5 },
    { role: "CB", x: 0.2, y: 0.7 },
    { role: "CB", x: 0.18, y: 0.5 },
    { role: "CB", x: 0.2, y: 0.3 },
    { role: "DMF", x: 0.4, y: 0.62 },
    { role: "DMF", x: 0.4, y: 0.38 },
    { role: "AMF", x: 0.6, y: 0.62 },
    { role: "AMF", x: 0.6, y: 0.38 },
    { role: "RW", x: 0.82, y: 0.85 },
    { role: "CF", x: 0.85, y: 0.5 },
    { role: "LW", x: 0.82, y: 0.15 },
  ],
};
