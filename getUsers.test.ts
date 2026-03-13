import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { getUsers, type User } from "./async6.js";

describe("getUsers", () => {
  beforeEach(() => {
    vi.useFakeTimers();

    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        json: async () =>
          [
            {
              id: 1,
              name: "Leanne Graham",
              username: "Bret",
              email: "Sincere@april.biz",
            },
            {
              id: 2,
              name: "Ervin Howell",
              username: "Antonette",
              email: "Shanna@melissa.tv",
            },
          ] as User[],
      } as Response),
    );
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("should fetch users and return them after delay", async () => {
    const promise = getUsers(2000);

    let resolved = false;
    let result: User[] | undefined;

    promise.then((users) => {
      resolved = true;
      result = users;
    });

    await vi.advanceTimersByTimeAsync(2000);

    expect(resolved).toBe(true);
    expect(Array.isArray(result)).toBe(true);
    expect(result?.length).toBe(2);
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
