import { describe, it, expect } from "vitest";
import { quote } from "./business";

describe("pricing", () => {
  it("monthly one meal, 6 days = ₹4000 sample price", () => {
    expect(quote("lunch", 6, "1m").total).toBe(4000);
  });
  it("3-month plan gets 10% off", () => {
    const q = quote("lunch", 6, "3m");
    expect(q.subtotal).toBe(12000);
    expect(q.discount).toBe(1200);
    expect(q.total).toBe(10800);
  });
  it("no discount on monthly", () => {
    expect(quote("both", 6, "1m").discount).toBe(0);
  });
});
