import type { Formation } from "@/types";

export const formation541: Formation = {
  id: "5-4-1",
  name: "5-4-1 (ultradefensiva)",
  category: "football11-specific",
  description:
    "Sistema ultradefensivo: cinco defensores (tres centrales mas dos carrileros bajos), cuatro volantes en linea y un solo delantero.",
  strengths: [
    "Bloque defensivo casi impenetrable",
    "Cinco atras cubren toda la linea de fondo",
    "Ideal para sostener resultados o jugar de visitante",
  ],
  weaknesses: [
    "Solo un delantero, casi inviable atacar",
    "Los carrileros prácticamente no pasan al ataque",
    "Vive esperando el mano a mano de toda la pelicula",
  ],
  slots: [
    { role: "GK", x: 0.06, y: 0.5 },
    { role: "RWB", x: 0.22, y: 0.9 },
    { role: "CB", x: 0.18, y: 0.66 },
    { role: "CB", x: 0.16, y: 0.5 },
    { role: "CB", x: 0.18, y: 0.34 },
    { role: "LWB", x: 0.22, y: 0.1 },
    { role: "RMF", x: 0.48, y: 0.82 },
    { role: "CMF", x: 0.46, y: 0.6 },
    { role: "CMF", x: 0.46, y: 0.4 },
    { role: "LMF", x: 0.48, y: 0.18 },
    { role: "CF", x: 0.82, y: 0.5 },
  ],
};
