import type { Formation } from "@/types";

export const formation433: Formation = {
  id: "4-3-3",
  name: "4-3-3",
  category: "football11-classic",
  description:
    "Sistema balanceado con 3 delanteros, busca dominio ofensivo con extremos abiertos y triangulaciones por banda.",
  strengths: [
    "Presion alta efectiva con 3 atacantes",
    "Ancho de cancha permanente con los extremos",
    "Triangulaciones constantes por bandas",
    "Posesion con 3 volantes",
  ],
  weaknesses: [
    "Volantes muy expuestos si los extremos no bajan",
    "Requiere laterales con muchisima resistencia",
    "Vulnerable a contraataques por el centro",
  ],
  slots: [
    { role: "GK", x: 0.06, y: 0.5 },
    { role: "RB", x: 0.22, y: 0.85 },
    { role: "CB", x: 0.2, y: 0.62 },
    { role: "CB", x: 0.2, y: 0.38 },
    { role: "LB", x: 0.22, y: 0.15 },
    { role: "DMF", x: 0.42, y: 0.5 },
    { role: "CMF", x: 0.55, y: 0.68 },
    { role: "CMF", x: 0.55, y: 0.32 },
    { role: "RW", x: 0.82, y: 0.82 },
    { role: "CF", x: 0.85, y: 0.5 },
    { role: "LW", x: 0.82, y: 0.18 },
  ],
};
