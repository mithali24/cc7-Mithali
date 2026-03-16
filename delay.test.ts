import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { delay } from "./async5.js";

describe("delay", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should resolve after the specified milliseconds", async () => {
    const promise = delay(1000);

    await vi.advanceTimersByTimeAsync(1000);

    await expect(promise).resolves.toBeUndefined();
  });

  it("should resolve to undefined", async () => {
    const promise = delay(100);
    vi.advanceTimersByTime(100);
    const result = await promise;
    expect(result).toBeUndefined();
  });
});
