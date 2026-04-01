import { describe, it, expect, vi } from "vitest";
import { Player } from "./player.js";
import type { Pause, Recording } from "./types.js";

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

  it("does nothing for empty recording", () => {
    vi.useFakeTimers();

    const playback = vi.fn();
    const player = new Player([], playback);

    player.play();
    vi.runAllTimers();

    expect(playback).not.toHaveBeenCalled();

    vi.useRealTimers();
  });

  it("respects timing gaps between beats", () => {
    vi.useFakeTimers();

    const playback = vi.fn();

    const recording: Recording = [
      { key: "A", timestamp: 0, type: "beat" },
      { key: "B", timestamp: 500, type: "beat" },
    ];

    const player = new Player(recording, playback);
    player.play();

    vi.advanceTimersByTime(0);
    expect(playback).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(500);
    expect(playback).toHaveBeenCalledTimes(2);

    vi.useRealTimers();
  });

  it("pauses playback correctly", () => {
    vi.useFakeTimers();

    const playback = vi.fn();

    const recording: Recording = [
      { key: "A", timestamp: 0, type: "beat" },
      { key: "B", timestamp: 1000, type: "beat" },
    ];

    const player = new Player(recording, playback);
    player.play();

    vi.advanceTimersByTime(0);
    expect(playback).toHaveBeenCalledTimes(1);

    player.pause();

    vi.advanceTimersByTime(2000);
    expect(playback).toHaveBeenCalledTimes(1);

    vi.useRealTimers();
  });

  it("resumes from where it was paused", () => {
    vi.useFakeTimers();

    const playback = vi.fn();

    const recording: Recording = [
      { key: "A", timestamp: 0, type: "beat" },
      { key: "B", timestamp: 1000, type: "beat" },
    ];

    const player = new Player(recording, playback);
    player.play();

    vi.advanceTimersByTime(0);
    player.pause();

    vi.advanceTimersByTime(500);
    player.resume();

    vi.runAllTimers();

    expect(playback).toHaveBeenCalledTimes(2);

    vi.useRealTimers();
  });

  it("stops and resets playback", () => {
    vi.useFakeTimers();

    const playback = vi.fn();

    const recording: Recording = [
      { key: "A", timestamp: 0, type: "beat" },
      { key: "B", timestamp: 1000, type: "beat" },
    ];

    const player = new Player(recording, playback);
    player.play();

    player.stop();

    vi.runAllTimers();

    expect(playback).not.toHaveBeenCalled();

    vi.useRealTimers();
  });

  it("ignores pause events during normalization", () => {
    vi.useFakeTimers();

    const playback = vi.fn();

    const recording: Recording = [
      { key: "A", timestamp: 0, type: "beat" },
      { timestamp: 500, type: "pause" } as Pause,
      { key: "B", timestamp: 1000, type: "beat" },
    ];

    const player = new Player(recording, playback);
    player.play();

    vi.runAllTimers();

    expect(playback).toHaveBeenCalledTimes(2);

    vi.useRealTimers();
  });

  it("clears previous timers when play is called again", () => {
    vi.useFakeTimers();

    const playback = vi.fn();

    const recording: Recording = [
      { key: "A", timestamp: 0, type: "beat" },
      { key: "B", timestamp: 1000, type: "beat" },
    ];

    const player = new Player(recording, playback);

    player.play();
    player.play();

    vi.runAllTimers();

    expect(playback).toHaveBeenCalledTimes(2);

    vi.useRealTimers();
  });
});
