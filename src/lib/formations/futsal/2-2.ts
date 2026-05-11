import type { Formation } from "@/types";

export const futsal_22: Formation = {
  id: "futsal-2-2",
  name: "2-2 (cuadrado)",
  category: "futsal",
  description:
    "Sistema en cuadrado con 2 defensores y 2 atacantes. Estructura simetrica, ideal para principiantes y para sostener resultados.",
  strengths: [
    "Estructura simetrica facil de entender",
    "Doble defensa para protegerse de contras",
    "Dos atacantes mantienen amenaza",
  ],
  weaknesses: [
    "Sin jugador entre lineas, juego predecible",
    "Vulnerable en el centro del campo",
    "Poca creatividad ofensiva sin pivote claro",
  ],
  slots: [
    { role: "GK", x: 0.08, y: 0.5 },
    { role: "FIJO", x: 0.3, y: 0.7 },
    { role: "FIJO", x: 0.3, y: 0.3 },
    { role: "PIV", x: 0.78, y: 0.7 },
    { role: "PIV", x: 0.78, y: 0.3 },
  ],
};
