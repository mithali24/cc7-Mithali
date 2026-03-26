import { describe, it, expect, vi } from "vitest";
import { Player } from "./player";
import type { Recording } from "./types";

describe("Player", () => {
  it("plays beats in order", () => {
    vi.useFakeTimers();

    const playback = vi.fn();

    const recording: Recording = [
      { key: "A", timestamp: 0, type: "beat" },
      { key: "B", timestamp: 1000, type: "beat" },
    ];

    const player = new Player(recording, playback);
    player.play();

    vi.runAllTimers();

    expect(playback).toHaveBeenCalledWith(recording[0]);
    expect(playback).toHaveBeenCalledWith(recording[1]);

    vi.useRealTimers();
  });
});
