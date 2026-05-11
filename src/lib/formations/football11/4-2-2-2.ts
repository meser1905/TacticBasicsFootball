import type { Formation } from "@/types";

export const formation4222: Formation = {
  id: "4-2-2-2",
  name: "4-2-2-2 (cuadrado magico)",
  category: "football11-modern",
  description:
    "Sistema popular en el futbol brasileno: cuatro defensores, doble pivote de contencion, dos enganches y dos delanteros.",
  strengths: [
    "Doble pivote solido defensivamente",
    "Dos enganches asisten a los dos delanteros",
    "Estructura compacta y vertical",
  ],
  weaknesses: [
    "Sin amplitud natural, todo va por el centro",
    "Laterales deben cubrir toda la banda solos",
    "Si el rival cierra el medio, queda atrapado",
  ],
  slots: [
    { role: "GK", x: 0.06, y: 0.5 },
    { role: "RB", x: 0.22, y: 0.85 },
    { role: "CB", x: 0.2, y: 0.62 },
    { role: "CB", x: 0.2, y: 0.38 },
    { role: "LB", x: 0.22, y: 0.15 },
    { role: "DMF", x: 0.4, y: 0.62 },
    { role: "DMF", x: 0.4, y: 0.38 },
    { role: "AMF", x: 0.62, y: 0.62 },
    { role: "AMF", x: 0.62, y: 0.38 },
    { role: "CF", x: 0.82, y: 0.6 },
    { role: "CF", x: 0.82, y: 0.4 },
  ],
};
