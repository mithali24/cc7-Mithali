import { describe, test, expect, beforeEach } from "vitest";
import { reducer } from "./reducer";
import type { State, Beat } from "./types";

describe("Reducer Tests", () => {
  let initialState: State;

  beforeEach(() => {
    initialState = {
      mode: "normal",
      currentRecording: [],
    };
  });

  const sampleBeat: Beat = { key: "A", timestamp: 100 };

  test("START_RECORDING sets mode to recording-progress and clears currentRecording", () => {
    const newState = reducer(initialState, { type: "START_RECORDING" });
    expect(newState.mode).toBe("recording-progress");
    expect(newState.currentRecording).toEqual([]);
  });

  test("ADD_BEAT adds beat only in recording-progress mode", () => {
    let state = reducer(initialState, {
      type: "ADD_BEAT",
      payload: sampleBeat,
    });
    expect(state.currentRecording).toEqual([]);

    state = reducer(
      { ...initialState, mode: "recording-progress" },
      { type: "ADD_BEAT", payload: sampleBeat },
    );
    expect(state.currentRecording).toEqual([sampleBeat]);
  });

  test("PAUSE_RECORDING sets mode to recording-paused only if recording-progress", () => {
    let state = reducer(initialState, {
      type: "PAUSE_RECORDING",
      pause: { timestamp: 1000 },
    });
    expect(state.mode).toBe("normal");

    state = reducer(
      { ...initialState, mode: "recording-progress" },
      { type: "PAUSE_RECORDING", pause: { timestamp: 1000 } },
    );
    expect(state.mode).toBe("recording-paused");
  });

  test("CONTINUE_RECORDING sets mode back to recording-progress only if paused", () => {
    let state = reducer(
      { ...initialState, mode: "recording-paused" },
      { type: "CONTINUE_RECORDING", pause: { timestamp: 1000 } },
    );
    expect(state.mode).toBe("recording-progress");

    state = reducer(initialState, {
      type: "CONTINUE_RECORDING",
      pause: { timestamp: 1000 },
    });
    expect(state.mode).toBe("normal");
  });

  test("STOP_RECORDING resets mode to normal from recording-progress or paused", () => {
    let state = reducer(
      { ...initialState, mode: "recording-progress" },
      { type: "STOP_RECORDING" },
    );
    expect(state.mode).toBe("normal");

    state = reducer(
      { ...initialState, mode: "recording-paused" },
      { type: "STOP_RECORDING" },
    );
    expect(state.mode).toBe("normal");

    state = reducer(initialState, { type: "STOP_RECORDING" });
    expect(state.mode).toBe("normal");
  });

  test("CLEAR_RECORDING empties currentRecording", () => {
    const state = reducer(
      { ...initialState, currentRecording: [sampleBeat] },
      { type: "CLEAR_RECORDING" },
    );
    expect(state.currentRecording).toEqual([]);
  });

  test("START_PLAYBACK only works if currentRecording has beats", () => {
    let state = reducer(initialState, { type: "START_PLAYBACK" });
    expect(state.mode).toBe("normal");

    state = reducer(
      { ...initialState, currentRecording: [sampleBeat] },
      { type: "START_PLAYBACK" },
    );
    expect(state.mode).toBe("playback-progress");
  });

  test("PAUSE_PLAYBACK sets mode to playback-paused only if playback-progress", () => {
    let state = reducer(
      { ...initialState, mode: "playback-progress" },
      { type: "PAUSE_PLAYBACK" },
    );
    expect(state.mode).toBe("playback-paused");

    state = reducer(initialState, { type: "PAUSE_PLAYBACK" });
    expect(state.mode).toBe("normal");
  });

  test("CONTINUE_PLAYBACK sets mode back to playback-progress only if paused", () => {
    let state = reducer(
      { ...initialState, mode: "playback-paused" },
      { type: "CONTINUE_PLAYBACK" },
    );
    expect(state.mode).toBe("playback-progress");

    state = reducer(initialState, { type: "CONTINUE_PLAYBACK" });
    expect(state.mode).toBe("normal");
  });

  test("STOP_PLAYBACK always resets mode to normal", () => {
    let state = reducer(
      { ...initialState, mode: "playback-progress" },
      { type: "STOP_PLAYBACK" },
    );
    expect(state.mode).toBe("normal");

    state = reducer(
      { ...initialState, mode: "playback-paused" },
      { type: "STOP_PLAYBACK" },
    );
    expect(state.mode).toBe("normal");

    state = reducer(initialState, { type: "STOP_PLAYBACK" });
    expect(state.mode).toBe("normal");
  });
});
