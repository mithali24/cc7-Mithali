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

    let resolved = false;
    promise.then(() => {
      resolved = true;
    });

    vi.advanceTimersByTime(500);
    await Promise.resolve();
    expect(resolved).toBe(false);

    vi.advanceTimersByTime(500);
    await Promise.resolve();
    expect(resolved).toBe(true);
  });

  it("should resolve to undefined", async () => {
    const promise = delay(100);
    vi.advanceTimersByTime(100);
    const result = await promise;
    expect(result).toBeUndefined();
  });
});
