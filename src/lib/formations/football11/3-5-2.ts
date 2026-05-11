import type { Formation } from "@/types";

export const formation352: Formation = {
  id: "3-5-2",
  name: "3-5-2",
  category: "football11-classic",
  description:
    "Sistema con 3 centrales, 5 volantes (incluyendo carrileros) y 2 delanteros. Aporta superioridad numerica en el medio.",
  strengths: [
    "Dominio total del mediocampo con 5 hombres",
    "Carrileros aportan amplitud y profundidad",
    "Dos delanteros mantienen presion al fondo rival",
    "Buena salida con 3 centrales",
  ],
  weaknesses: [
    "Vulnerable si los carrileros no replegan a tiempo",
    "Necesita carrileros muy completos (no abundan)",
    "Sin extremos puros, depende de los carrileros",
  ],
  famousFor: "Antonio Conte con el Juventus 2012-2014",
  slots: [
    { role: "GK", x: 0.06, y: 0.5 },
    { role: "CB", x: 0.2, y: 0.7 },
    { role: "CB", x: 0.18, y: 0.5 },
    { role: "CB", x: 0.2, y: 0.3 },
    { role: "RWB", x: 0.48, y: 0.9 },
    { role: "DMF", x: 0.42, y: 0.5 },
    { role: "CMF", x: 0.55, y: 0.65 },
    { role: "CMF", x: 0.55, y: 0.35 },
    { role: "LWB", x: 0.48, y: 0.1 },
    { role: "CF", x: 0.82, y: 0.6 },
    { role: "CF", x: 0.82, y: 0.4 },
  ],
};
