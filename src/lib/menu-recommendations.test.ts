import { describe, expect, it } from "vitest";
import { parseMenuRecommendations } from "./menu-recommendations";

describe("menu recommendation validation", () => {
  it("keeps only exact weekly-menu matches", () => {
    const results = parseMenuRecommendations({
      recommendations: [
        { day: "Monday", meal: "lunch", dish: "Rajma, Rice, Roti, Salad", reason: "A vegetarian lunch." },
        { day: "Monday", meal: "lunch", dish: "Rajma bowl", reason: "A claimed match." },
      ],
    });

    expect(results).toEqual([
      { day: "Monday", meal: "lunch", dish: "Rajma, Rice, Roti, Salad", reason: "A vegetarian lunch." },
    ]);
  });

  it("rejects malformed recommendation payloads", () => {
    expect(parseMenuRecommendations({ recommendations: [{ day: "Monday" }] })).toBeNull();
  });
});