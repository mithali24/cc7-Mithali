import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { getUsers, User } from "./async6.js";

describe("getUsers", () => {
  beforeEach(() => {
    vi.useFakeTimers();

    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve([
            {
              id: 1,
              name: "John",
              username: "john",
              email: "john@example.com",
            },
            {
              id: 2,
              name: "Jane",
              username: "jane",
              email: "jane@example.com",
            },
          ]),
      } as any),
    ) as any;
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("should fetch users and return an array after the delay", async () => {
    const promise = getUsers(2000);

    let resolved = false;
    let result: User[] | undefined;

    promise.then((users) => {
      resolved = true;
      result = users;
    });

    // 1. Use the Async version to automatically flush the promise queue
    await vi.advanceTimersByTimeAsync(2000);

    // 2. Now 'resolved' will be true
    expect(resolved).toBe(true);
    expect(Array.isArray(result)).toBe(true);
    expect(result?.length).toBeGreaterThan(0);
  });
});
