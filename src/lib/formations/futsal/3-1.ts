import type { Formation } from "@/types";

export const futsal_31: Formation = {
  id: "futsal-3-1",
  name: "3-1 (Y invertida)",
  category: "futsal",
  description:
    "Sistema con 3 jugadores en linea (fijo y 2 alas) y 1 pivote adelantado. La forma de Y permite ataque y defensa solidas.",
  strengths: [
    "3 jugadores defendiendo el bloque bajo",
    "El pivote es referencia ofensiva clara",
    "Buena estructura para presionar la salida rival",
  ],
  weaknesses: [
    "Sin mediocampista puro, salida en largo",
    "El pivote queda muy solo si las alas no suben",
    "Estructura un poco estatica si no rota",
  ],
  slots: [
    { role: "GK", x: 0.08, y: 0.5 },
    { role: "ALA", x: 0.4, y: 0.78 },
    { role: "FIJO", x: 0.38, y: 0.5 },
    { role: "ALA", x: 0.4, y: 0.22 },
    { role: "PIV", x: 0.82, y: 0.5 },
  ],
};
