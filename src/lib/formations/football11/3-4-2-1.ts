import type { Formation } from "@/types";

export const formation3421: Formation = {
  id: "3-4-2-1",
  name: "3-4-2-1",
  category: "football11-modern",
  description:
    "Tres centrales, cuatro mediocampistas (carrileros y dos centrales), dos mediapuntas y un delantero referencia.",
  strengths: [
    "Buen equilibrio entre defensa y medio",
    "Dos mediapuntas ofrecen creatividad",
    "Carrileros aportan profundidad por las bandas",
  ],
  weaknesses: [
    "Solo un delantero, depende mucho de llegadas",
    "Si las mediapuntas no defienden, los volantes sufren",
    "Necesita carrileros muy fisicos",
  ],
  slots: [
    { role: "GK", x: 0.06, y: 0.5 },
    { role: "CB", x: 0.2, y: 0.7 },
    { role: "CB", x: 0.18, y: 0.5 },
    { role: "CB", x: 0.2, y: 0.3 },
    { role: "RWB", x: 0.48, y: 0.9 },
    { role: "CMF", x: 0.48, y: 0.6 },
    { role: "CMF", x: 0.48, y: 0.4 },
    { role: "LWB", x: 0.48, y: 0.1 },
    { role: "AMF", x: 0.68, y: 0.62 },
    { role: "AMF", x: 0.68, y: 0.38 },
    { role: "CF", x: 0.85, y: 0.5 },
  ],
};
