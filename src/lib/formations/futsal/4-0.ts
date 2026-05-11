import type { Formation } from "@/types";

export const futsal_40: Formation = {
  id: "futsal-4-0",
  name: "4-0 (rotacional)",
  category: "futsal",
  description:
    "Sistema moderno sin pivote fijo: los 4 jugadores rotan posiciones constantemente generando superioridades. Necesita jugadores muy completos.",
  strengths: [
    "Rotaciones constantes confunden a la marca",
    "Todos atacan y todos defienden",
    "Genera superioridades posicionales permanentes",
  ],
  weaknesses: [
    "Demanda jugadores muy entrenados en el sistema",
    "Sin pivote fijo, dificil para definir",
    "Si la rotacion falla, queda desorganizado",
  ],
  slots: [
    { role: "GK", x: 0.08, y: 0.5 },
    { role: "FIJO", x: 0.32, y: 0.72 },
    { role: "FIJO", x: 0.32, y: 0.28 },
    { role: "ALA", x: 0.65, y: 0.72 },
    { role: "ALA", x: 0.65, y: 0.28 },
  ],
};
