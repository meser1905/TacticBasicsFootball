import type { Formation } from "@/types";

export const f8_322: Formation = {
  id: "f8-3-2-2",
  name: "3-2-2",
  category: "football8",
  description:
    "Sistema defensivo-ofensivo con 3 atras, 2 volantes centrales y 2 delanteros. Solidez con doble amenaza ofensiva.",
  strengths: [
    "Defensa solida con 3 jugadores",
    "Doble delantero presiona arriba",
    "Bueno para equipos con buena salida desde el fondo",
  ],
  weaknesses: [
    "Solo 2 volantes, puede ser superado en el medio",
    "Los volantes deben cubrir mucho campo",
    "Sin extremos, falta amplitud",
  ],
  slots: [
    { role: "GK", x: 0.08, y: 0.5 },
    { role: "RB", x: 0.25, y: 0.78 },
    { role: "CB", x: 0.22, y: 0.5 },
    { role: "LB", x: 0.25, y: 0.22 },
    { role: "CMF", x: 0.5, y: 0.62 },
    { role: "CMF", x: 0.5, y: 0.38 },
    { role: "CF", x: 0.82, y: 0.62 },
    { role: "CF", x: 0.82, y: 0.38 },
  ],
};
