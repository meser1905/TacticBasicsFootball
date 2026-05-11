import { create } from "zustand";
import type { Formation, Player, PlayerRole, Side } from "@/types";

const TEAM_LENGTH_SCALE = 0.94;

function buildPlayersFromFormation(formation: Formation, team: Side): Player[] {
  return formation.slots.map((slot, idx) => {
    const px = slot.y;
    const scaledX = slot.x * TEAM_LENGTH_SCALE;
    const py = team === "home" ? 1 - scaledX : scaledX;
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
  homeFormationId: string | null;
  awayFormationId: string | null;
  movePlayer: (id: string, px: number, py: number) => void;
  updatePlayer: (id: string, updates: PlayerUpdate) => void;
  loadFormation: (formation: Formation, team: Side) => void;
  resetTeam: (formation: Formation, team: Side) => void;
  clearAll: () => void;
};

export const usePlayersStore = create<PlayersState>((set) => ({
  players: [],
  homeFormationId: null,
  awayFormationId: null,
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
  clearAll: () => set({ players: [], homeFormationId: null, awayFormationId: null }),
}));
