import type { State, Action } from "./types";

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "START_RECORDING":
      if (state.mode !== "normal") return state;

      return {
        ...state,
        mode: "recording-progress",
        currentRecording: [],
      };

    case "ADD_BEAT":
      if (state.mode !== "recording-progress") return state;

      return {
        ...state,
        currentRecording: [...state.currentRecording, action.payload],
      };

    case "PAUSE_RECORDING":
      if (state.mode !== "recording-progress") return state;
      return { ...state, mode: "recording-paused" };

    case "CONTINUE_RECORDING":
      if (state.mode !== "recording-paused") return state;
      return { ...state, mode: "recording-progress" };

    case "STOP_RECORDING":
      if (
        state.mode !== "recording-progress" &&
        state.mode !== "recording-paused"
      )
        return state;

      return {
        ...state,
        mode: "normal",
        recordings: [
          {
            name: "Recording 1",
            beats: state.currentRecording,
          },
        ],
        currentRecording: [],
      };

    case "START_PLAYBACK":
      if (state.recordings.length === 0) return state;
      return { ...state, mode: "playback-progress" };

    case "PAUSE_PLAYBACK":
      if (state.mode !== "playback-progress") return state;
      return { ...state, mode: "playback-paused" };

    case "CONTINUE_PLAYBACK":
      if (state.mode !== "playback-paused") return state;
      return { ...state, mode: "playback-progress" };

    case "STOP_PLAYBACK":
      return { ...state, mode: "normal" };

    case "CLEAR_RECORDING":
      return { ...state, recordings: [] };

    default:
      return state;
  }
}
