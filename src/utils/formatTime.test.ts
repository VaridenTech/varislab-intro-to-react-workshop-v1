import { describe, expect, it } from "vitest";
import { formatTotalTime } from "./formatTime";

describe("formatTotalTime", () => {
  it("shows minutes when the total is under an hour", () => {
    expect(formatTotalTime(20, 15)).toBe("35 min");
  });

  it("shows whole hours without minutes", () => {
    expect(formatTotalTime(30, 90)).toBe("2 hr");
  });

  it("shows hours and minutes together", () => {
    expect(formatTotalTime(15, 60)).toBe("1 hr 15 min");
  });
});
