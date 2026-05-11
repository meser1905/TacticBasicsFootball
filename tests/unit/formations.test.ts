import { describe, it, expect } from "vitest";
import { formations, findFormationById } from "@/lib/formations";

describe("formations library", () => {
  it("ships at least 3 formations", () => {
    expect(formations.length).toBeGreaterThanOrEqual(3);
  });

  it("finds a formation by id", () => {
    expect(findFormationById("4-4-2")?.name).toBe("4-4-2");
    expect(findFormationById("does-not-exist")).toBeUndefined();
  });

  formations.forEach((formation) => {
    describe(`formation ${formation.id}`, () => {
      it("has exactly 11 player slots", () => {
        expect(formation.slots).toHaveLength(11);
      });

      it("has exactly one goalkeeper", () => {
        const gks = formation.slots.filter((s) => s.role === "GK");
        expect(gks).toHaveLength(1);
      });

      it("keeps every slot inside the pitch (x and y between 0 and 1)", () => {
        formation.slots.forEach((slot) => {
          expect(slot.x).toBeGreaterThanOrEqual(0);
          expect(slot.x).toBeLessThanOrEqual(1);
          expect(slot.y).toBeGreaterThanOrEqual(0);
          expect(slot.y).toBeLessThanOrEqual(1);
        });
      });

      it("has the required metadata fields", () => {
        expect(formation.name).toBeTruthy();
        expect(formation.description.length).toBeGreaterThan(10);
        expect(formation.strengths.length).toBeGreaterThanOrEqual(2);
        expect(formation.weaknesses.length).toBeGreaterThanOrEqual(2);
        expect(formation.famousFor).toBeTruthy();
      });
    });
  });
});
