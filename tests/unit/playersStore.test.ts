import { describe, it, expect, beforeEach } from "vitest";
import { usePlayersStore } from "@/stores/playersStore";
import { formation442, formation433 } from "@/lib/formations";

function resetStore() {
  const { loadFormation } = usePlayersStore.getState();
  loadFormation(formation442, "home");
  loadFormation(formation442, "away");
}

describe("playersStore", () => {
  beforeEach(() => {
    resetStore();
  });

  it("starts with 22 players (11 home and 11 away)", () => {
    const { players } = usePlayersStore.getState();
    expect(players).toHaveLength(22);
    expect(players.filter((p) => p.team === "home")).toHaveLength(11);
    expect(players.filter((p) => p.team === "away")).toHaveLength(11);
  });

  it("each team has exactly one GK", () => {
    const { players } = usePlayersStore.getState();
    expect(players.filter((p) => p.team === "home" && p.role === "GK")).toHaveLength(1);
    expect(players.filter((p) => p.team === "away" && p.role === "GK")).toHaveLength(1);
  });

  it("movePlayer updates the position of the targeted player", () => {
    const { players, movePlayer } = usePlayersStore.getState();
    const target = players[0];
    if (!target) throw new Error("expected at least one player");
    movePlayer(target.id, 0.42, 0.69);
    const updated = usePlayersStore.getState().players.find((p) => p.id === target.id);
    expect(updated?.px).toBe(0.42);
    expect(updated?.py).toBe(0.69);
  });

  it("movePlayer clamps positions to [0, 1]", () => {
    const { players, movePlayer } = usePlayersStore.getState();
    const target = players[0];
    if (!target) throw new Error("expected at least one player");
    movePlayer(target.id, 1.5, -0.3);
    const updated = usePlayersStore.getState().players.find((p) => p.id === target.id);
    expect(updated?.px).toBe(1);
    expect(updated?.py).toBe(0);
  });

  it("loadFormation swaps players for a given team and tracks the id", () => {
    const { loadFormation } = usePlayersStore.getState();
    loadFormation(formation433, "home");
    const state = usePlayersStore.getState();
    expect(state.homeFormationId).toBe("4-3-3");
    expect(state.awayFormationId).toBe("4-4-2");
    expect(state.players.filter((p) => p.team === "home")).toHaveLength(11);
    expect(state.players.filter((p) => p.team === "away")).toHaveLength(11);
  });
});
