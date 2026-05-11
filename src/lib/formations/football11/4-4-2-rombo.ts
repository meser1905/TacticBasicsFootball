import type { Formation } from "@/types";

export const formation442Rombo: Formation = {
  id: "4-4-2-rombo",
  name: "4-4-2 (rombo)",
  category: "football11-classic",
  description:
    "Variante del 4-4-2 con el mediocampo en forma de diamante: un volante de contencion, dos por bandas y un enganche por delante.",
  strengths: [
    "Superioridad numerica en el centro del medio",
    "El enganche genera juego entre lineas",
    "Tres puntos de pase para los defensores",
  ],
  weaknesses: [
    "Pierde amplitud, depende mucho de los laterales",
    "Volantes interiores deben cubrir mucho campo",
    "Si pierde la pelota, laterales quedan expuestos",
  ],
  slots: [
    { role: "GK", x: 0.06, y: 0.5 },
    { role: "RB", x: 0.22, y: 0.85 },
    { role: "CB", x: 0.2, y: 0.62 },
    { role: "CB", x: 0.2, y: 0.38 },
    { role: "LB", x: 0.22, y: 0.15 },
    { role: "DMF", x: 0.38, y: 0.5 },
    { role: "RMF", x: 0.5, y: 0.72 },
    { role: "LMF", x: 0.5, y: 0.28 },
    { role: "AMF", x: 0.62, y: 0.5 },
    { role: "CF", x: 0.82, y: 0.6 },
    { role: "CF", x: 0.82, y: 0.4 },
  ],
};
