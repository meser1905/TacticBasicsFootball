import type { Formation } from "@/types";

export const f8_232: Formation = {
  id: "f8-2-3-2",
  name: "2-3-2",
  category: "football8",
  description:
    "Sistema ofensivo con 2 defensores, 3 mediocampistas y 2 delanteros. Mayor presencia en area rival.",
  strengths: [
    "Dos delanteros, presion constante al fondo rival",
    "Buena ocupacion del medio con 3 volantes",
    "Mas opciones ofensivas que el 3-3-1",
  ],
  weaknesses: [
    "Solo 2 defensores, vulnerable a contraataques",
    "Demanda volantes que ayuden a defender",
    "Si la defensa se desordena, queda muy expuesta",
  ],
  slots: [
    { role: "GK", x: 0.08, y: 0.5 },
    { role: "CB", x: 0.22, y: 0.62 },
    { role: "CB", x: 0.22, y: 0.38 },
    { role: "RMF", x: 0.5, y: 0.78 },
    { role: "CMF", x: 0.48, y: 0.5 },
    { role: "LMF", x: 0.5, y: 0.22 },
    { role: "CF", x: 0.82, y: 0.62 },
    { role: "CF", x: 0.82, y: 0.38 },
  ],
};
