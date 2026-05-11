import { describe, it, expect } from "vitest";
import {
  formations,
  findFormationById,
  formationsForFormat,
  defaultFormationForFormat,
} from "@/lib/formations";
import { getFormatFromCategory, PITCH_DIMENSIONS } from "@/lib/pitchDimensions";

describe("formations library", () => {
  it("ships 22 football 11 formations plus 12 small-format formations", () => {
    expect(formations.length).toBe(34);
  });

  it("has unique formation ids", () => {
    const ids = formations.map((f) => f.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("finds a formation by id", () => {
    expect(findFormationById("4-4-2")?.name).toBe("4-4-2");
    expect(findFormationById("does-not-exist")).toBeUndefined();
  });

  it("formationsForFormat returns only matching formations", () => {
    const f11 = formationsForFormat("football11");
    expect(f11.length).toBe(22);
    expect(f11.every((f) => f.category.startsWith("football11"))).toBe(true);

    const f8 = formationsForFormat("football8");
    expect(f8.length).toBe(4);
    expect(f8.every((f) => f.category === "football8")).toBe(true);

    const f7 = formationsForFormat("football7");
    expect(f7.length).toBe(4);
    expect(f7.every((f) => f.category === "football7")).toBe(true);

    const futsal = formationsForFormat("futsal");
    expect(futsal.length).toBe(4);
    expect(futsal.every((f) => f.category === "futsal")).toBe(true);
  });

  it("provides a default formation for each format", () => {
    expect(defaultFormationForFormat("football11")).toBeDefined();
    expect(defaultFormationForFormat("football8")).toBeDefined();
    expect(defaultFormationForFormat("football7")).toBeDefined();
    expect(defaultFormationForFormat("futsal")).toBeDefined();
  });

  formations.forEach((formation) => {
    describe(`formation ${formation.id}`, () => {
      const format = getFormatFromCategory(formation.category);
      const expectedSize = PITCH_DIMENSIONS[format].playersPerTeam;

      it(`has exactly ${expectedSize} player slots (matches ${format})`, () => {
        expect(formation.slots).toHaveLength(expectedSize);
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
      });

      it("declares a valid category", () => {
        const valid = [
          "football11-classic",
          "football11-modern",
          "football11-historic",
          "football11-specific",
          "football8",
          "football7",
          "futsal",
        ];
        expect(valid).toContain(formation.category);
      });
    });
  });
});
