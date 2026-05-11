import type { Formation } from "@/types";

export const formation235: Formation = {
  id: "2-3-5",
  name: "2-3-5 (piramide clasica)",
  category: "football11-historic",
  description:
    "Sistema historico del siglo XIX y principios del XX, ultraofensivo: dos defensores, tres mediocampistas y cinco delanteros.",
  strengths: [
    "Maxima potencia ofensiva con cinco arriba",
    "Dificil de defender con tantos atacantes",
    "Domina permanentemente el ultimo tercio",
  ],
  weaknesses: [
    "Solo dos defensores, brutalmente vulnerable atras",
    "Si pierde la pelota, los cinco atacantes deben volver corriendo",
    "Hoy inviable contra cualquier sistema moderno",
  ],
  slots: [
    { role: "GK", x: 0.06, y: 0.5 },
    { role: "CB", x: 0.2, y: 0.62 },
    { role: "CB", x: 0.2, y: 0.38 },
    { role: "CMF", x: 0.45, y: 0.78 },
    { role: "DMF", x: 0.4, y: 0.5 },
    { role: "CMF", x: 0.45, y: 0.22 },
    { role: "RW", x: 0.78, y: 0.9 },
    { role: "SS", x: 0.78, y: 0.7 },
    { role: "CF", x: 0.82, y: 0.5 },
    { role: "SS", x: 0.78, y: 0.3 },
    { role: "LW", x: 0.78, y: 0.1 },
  ],
};
