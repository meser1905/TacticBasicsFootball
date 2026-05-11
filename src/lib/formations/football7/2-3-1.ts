import type { Formation } from "@/types";

export const f7_231: Formation = {
  id: "f7-2-3-1",
  name: "2-3-1",
  category: "football7",
  description:
    "Sistema clasico de futbol 7 con 2 defensores, 3 mediocampistas y 1 delantero. Equilibrado y simple.",
  strengths: [
    "Mediocampo poblado con 3 jugadores",
    "Estructura clara y facil de entender",
    "Bueno para iniciar el juego desde atras",
  ],
  weaknesses: [
    "Solo 2 defensores, requiere mucha cobertura",
    "Un delantero solo puede quedar aislado",
    "Demanda volantes muy completos",
  ],
  slots: [
    { role: "GK", x: 0.08, y: 0.5 },
    { role: "CB", x: 0.25, y: 0.65 },
    { role: "CB", x: 0.25, y: 0.35 },
    { role: "RMF", x: 0.55, y: 0.78 },
    { role: "CMF", x: 0.52, y: 0.5 },
    { role: "LMF", x: 0.55, y: 0.22 },
    { role: "CF", x: 0.85, y: 0.5 },
  ],
};
