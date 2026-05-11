import type { Formation } from "@/types";

export const formation3241: Formation = {
  id: "3-2-4-1",
  name: "3-2-4-1",
  category: "football11-modern",
  description:
    "Sistema posicional moderno: tres centrales, dos pivotes, cuatro mediocampistas avanzados (incluyendo extremos) y un delantero.",
  strengths: [
    "Amplitud total con cuatro hombres en linea de ataque",
    "Dos pivotes garantizan equilibrio defensivo",
    "Tres centrales aseguran la espalda al ataque",
  ],
  weaknesses: [
    "Solo un delantero, depende de llegadas",
    "Necesita pivotes muy completos en lo tecnico y fisico",
    "Si pierde la pelota, los cuatro de adelante tardan en bajar",
  ],
  slots: [
    { role: "GK", x: 0.06, y: 0.5 },
    { role: "CB", x: 0.2, y: 0.7 },
    { role: "CB", x: 0.18, y: 0.5 },
    { role: "CB", x: 0.2, y: 0.3 },
    { role: "DMF", x: 0.42, y: 0.62 },
    { role: "DMF", x: 0.42, y: 0.38 },
    { role: "RW", x: 0.65, y: 0.88 },
    { role: "AMF", x: 0.62, y: 0.6 },
    { role: "AMF", x: 0.62, y: 0.4 },
    { role: "LW", x: 0.65, y: 0.12 },
    { role: "CF", x: 0.85, y: 0.5 },
  ],
};
