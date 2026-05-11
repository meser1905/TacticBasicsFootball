import { create } from "zustand";
import type { Formation, Player, PlayerRole, Side } from "@/types";
import { formation442 } from "@/lib/formations";

function buildPlayersFromFormation(formation: Formation, team: Side): Player[] {
  return formation.slots.map((slot, idx) => {
    const px = slot.y;
    const py = team === "home" ? 1 - slot.x : slot.x;
    return {
      id: `${team}-${idx + 1}`,
      team,
      number: idx + 1,
      name: "",
      role: slot.role,
      px,
      py,
    };
  });
}

function clamp(value: number, min = 0, max = 1): number {
  return Math.max(min, Math.min(max, value));
}

export type PlayerUpdate = {
  name?: string;
  number?: number;
  role?: PlayerRole;
};

type PlayersState = {
  players: Player[];
  homeFormationId: string;
  awayFormationId: string;
  movePlayer: (id: string, px: number, py: number) => void;
  updatePlayer: (id: string, updates: PlayerUpdate) => void;
  loadFormation: (formation: Formation, team: Side) => void;
  resetTeam: (formation: Formation, team: Side) => void;
};

export const usePlayersStore = create<PlayersState>((set) => ({
  players: [
    ...buildPlayersFromFormation(formation442, "home"),
    ...buildPlayersFromFormation(formation442, "away"),
  ],
  homeFormationId: formation442.id,
  awayFormationId: formation442.id,
  movePlayer: (id, px, py) =>
    set((state) => ({
      players: state.players.map((p) =>
        p.id === id ? { ...p, px: clamp(px), py: clamp(py) } : p,
      ),
    })),
  updatePlayer: (id, updates) =>
    set((state) => ({
      players: state.players.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    })),
  loadFormation: (formation, team) =>
    set((state) => ({
      players: [
        ...state.players.filter((p) => p.team !== team),
        ...buildPlayersFromFormation(formation, team),
      ],
      homeFormationId: team === "home" ? formation.id : state.homeFormationId,
      awayFormationId: team === "away" ? formation.id : state.awayFormationId,
    })),
  resetTeam: (formation, team) =>
    set((state) => ({
      players: [
        ...state.players.filter((p) => p.team !== team),
        ...buildPlayersFromFormation(formation, team),
      ],
    })),
}));
