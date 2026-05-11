import type { Formation } from "@/types";

export const formation2323: Formation = {
  id: "2-3-2-3",
  name: "2-3-2-3 (juego posicional)",
  category: "football11-modern",
  description:
    "Estructura moderna de juego posicional: dos centrales abren la salida, los laterales suben al medio, tres volantes en linea y tres delanteros.",
  strengths: [
    "Superioridad numerica en cada zona durante posesion",
    "Laterales por dentro liberan a los volantes",
    "Ocupacion total del ancho con tres delanteros",
  ],
  weaknesses: [
    "Requiere defensores muy tecnicos con pelota",
    "Vulnerable al contra si pierde la pelota mal",
    "Solo funciona con jugadores muy entrenados en el sistema",
  ],
  slots: [
    { role: "GK", x: 0.06, y: 0.5 },
    { role: "CB", x: 0.2, y: 0.6 },
    { role: "CB", x: 0.2, y: 0.4 },
    { role: "DMF", x: 0.42, y: 0.85 },
    { role: "DMF", x: 0.38, y: 0.5 },
    { role: "DMF", x: 0.42, y: 0.15 },
    { role: "CMF", x: 0.6, y: 0.62 },
    { role: "CMF", x: 0.6, y: 0.38 },
    { role: "RW", x: 0.82, y: 0.85 },
    { role: "CF", x: 0.85, y: 0.5 },
    { role: "LW", x: 0.82, y: 0.15 },
  ],
};
