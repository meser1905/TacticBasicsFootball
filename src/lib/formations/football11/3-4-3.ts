import type { Formation } from "@/types";

export const formation343: Formation = {
  id: "3-4-3",
  name: "3-4-3",
  category: "football11-classic",
  description:
    "Tres centrales, dos carrileros y dos volantes centrales, tres delanteros. Apuesta por el ataque manteniendo solidez atras.",
  strengths: [
    "Tres delanteros mantienen presion arriba",
    "Tres centrales aseguran la defensa",
    "Carrileros aportan amplitud constante",
  ],
  weaknesses: [
    "Solo dos volantes centrales, puede quedar superado",
    "Demanda enorme de los carrileros",
    "Vulnerable a contras por las bandas",
  ],
  slots: [
    { role: "GK", x: 0.06, y: 0.5 },
    { role: "CB", x: 0.2, y: 0.7 },
    { role: "CB", x: 0.18, y: 0.5 },
    { role: "CB", x: 0.2, y: 0.3 },
    { role: "RWB", x: 0.48, y: 0.9 },
    { role: "CMF", x: 0.5, y: 0.6 },
    { role: "CMF", x: 0.5, y: 0.4 },
    { role: "LWB", x: 0.48, y: 0.1 },
    { role: "RW", x: 0.82, y: 0.82 },
    { role: "CF", x: 0.85, y: 0.5 },
    { role: "LW", x: 0.82, y: 0.18 },
  ],
};
