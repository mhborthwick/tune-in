import { tarot } from "../utils/tarot";

describe("util: tarot", () => {
  it("should contain 22 tarot cards", () => {
    expect(Object.keys(tarot)).toHaveLength(22);
  });

  it("should contain values between 1 and 33", () => {
    const keys = Object.keys(tarot);
    keys.forEach((key) => {
      for (const p in tarot[key]) {
        if (p === "number") {
          expect(p).toBeGreaterThanOrEqual(1);
          expect(p).toBeLessThanOrEqual(33);
        }
      }
    });
  });
});
