import type { Formation } from "@/types";

export const f7_2121: Formation = {
  id: "f7-2-1-2-1",
  name: "2-1-2-1",
  category: "football7",
  description:
    "Sistema con 2 defensores, 1 contencion, 2 mediapuntas y 1 delantero. Estructura moderna en rombo.",
  strengths: [
    "El DMF protege la defensa",
    "2 mediapuntas crean superioridad ofensiva",
    "Estructura flexible y dinamica",
  ],
  weaknesses: [
    "Solo 2 defensores fijos",
    "Sin amplitud natural, todo va por el centro",
    "El delantero depende mucho de llegadas",
  ],
  slots: [
    { role: "GK", x: 0.08, y: 0.5 },
    { role: "CB", x: 0.22, y: 0.65 },
    { role: "CB", x: 0.22, y: 0.35 },
    { role: "DMF", x: 0.42, y: 0.5 },
    { role: "AMF", x: 0.62, y: 0.65 },
    { role: "AMF", x: 0.62, y: 0.35 },
    { role: "CF", x: 0.85, y: 0.5 },
  ],
};
