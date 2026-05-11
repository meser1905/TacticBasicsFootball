import type { Formation } from "@/types";

export const formation433Falso9: Formation = {
  id: "4-3-3-falso-9",
  name: "4-3-3 (falso 9)",
  category: "football11-modern",
  description:
    "Variante del 4-3-3 donde el delantero centro baja a recibir entre lineas y los extremos atacan los espacios libres.",
  strengths: [
    "Crea superioridad en el centro del campo",
    "Desordena a los centrales rivales al obligarlos a salir",
    "Los extremos quedan libres para atacar el area",
  ],
  weaknesses: [
    "Requiere un delantero muy tecnico (no abundan)",
    "Sin pivote real, los centros llegan vacios",
    "Demanda extremos veloces y con olfato de gol",
  ],
  slots: [
    { role: "GK", x: 0.06, y: 0.5 },
    { role: "RB", x: 0.22, y: 0.85 },
    { role: "CB", x: 0.2, y: 0.62 },
    { role: "CB", x: 0.2, y: 0.38 },
    { role: "LB", x: 0.22, y: 0.15 },
    { role: "DMF", x: 0.42, y: 0.5 },
    { role: "CMF", x: 0.55, y: 0.68 },
    { role: "CMF", x: 0.55, y: 0.32 },
    { role: "RW", x: 0.85, y: 0.82 },
    { role: "AMF", x: 0.7, y: 0.5 },
    { role: "LW", x: 0.85, y: 0.18 },
  ],
};
