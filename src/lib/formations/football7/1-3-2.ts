import type { Formation } from "@/types";

export const f7_132: Formation = {
  id: "f7-1-3-2",
  name: "1-3-2",
  category: "football7",
  description:
    "Sistema ofensivo con 1 defensor, 3 mediocampistas y 2 delanteros. Apuesta total al ataque.",
  strengths: [
    "Dos delanteros mantienen amenaza constante",
    "Tres mediocampistas dominan el medio",
    "Sistema ideal cuando hay que ir al ataque",
  ],
  weaknesses: [
    "Solo 1 defensor central, brutal exposicion atras",
    "Vulnerable a contraataques largos",
    "Demanda mucho del unico defensor",
  ],
  slots: [
    { role: "GK", x: 0.08, y: 0.5 },
    { role: "CB", x: 0.22, y: 0.5 },
    { role: "RMF", x: 0.5, y: 0.75 },
    { role: "CMF", x: 0.48, y: 0.5 },
    { role: "LMF", x: 0.5, y: 0.25 },
    { role: "CF", x: 0.82, y: 0.62 },
    { role: "CF", x: 0.82, y: 0.38 },
  ],
};
