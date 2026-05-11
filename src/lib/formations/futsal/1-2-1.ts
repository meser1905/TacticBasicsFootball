import type { Formation } from "@/types";

export const futsal_121: Formation = {
  id: "futsal-1-2-1",
  name: "1-2-1 (rombo)",
  category: "futsal",
  description:
    "Sistema clasico de futsal en rombo: 1 fijo (defensor), 2 alas (laterales-mediocampistas) y 1 pivote (delantero).",
  strengths: [
    "Estructura clara con un jugador por linea",
    "Buena ocupacion del ancho con las alas",
    "Defensa y ataque equilibrados",
  ],
  weaknesses: [
    "El fijo queda muy solo en defensa",
    "Las alas cubren mucho campo",
    "El pivote depende totalmente del juego asociado",
  ],
  slots: [
    { role: "GK", x: 0.08, y: 0.5 },
    { role: "FIJO", x: 0.28, y: 0.5 },
    { role: "ALA", x: 0.55, y: 0.78 },
    { role: "ALA", x: 0.55, y: 0.22 },
    { role: "PIV", x: 0.85, y: 0.5 },
  ],
};
