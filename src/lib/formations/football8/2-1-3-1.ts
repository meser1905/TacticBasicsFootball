import type { Formation } from "@/types";

export const f8_2131: Formation = {
  id: "f8-2-1-3-1",
  name: "2-1-3-1",
  category: "football8",
  description:
    "Sistema con 2 defensores, 1 volante de contencion, 3 mediocampistas y 1 delantero. Estructura moderna para futbol 8.",
  strengths: [
    "Volante de contencion equilibra defensa y medio",
    "3 mediocampistas permiten dominar la pelota",
    "Estructura flexible para diferentes momentos",
  ],
  weaknesses: [
    "Solo 2 defensores fijos en linea",
    "El DMF se desgasta rapido cubriendo tanto",
    "Un solo delantero depende mucho de llegadas",
  ],
  slots: [
    { role: "GK", x: 0.08, y: 0.5 },
    { role: "CB", x: 0.22, y: 0.65 },
    { role: "CB", x: 0.22, y: 0.35 },
    { role: "DMF", x: 0.4, y: 0.5 },
    { role: "RMF", x: 0.6, y: 0.78 },
    { role: "AMF", x: 0.62, y: 0.5 },
    { role: "LMF", x: 0.6, y: 0.22 },
    { role: "CF", x: 0.85, y: 0.5 },
  ],
};
