// types.ts
export type Mode =
  | "normal"
  | "recording-progress"
  | "recording-paused"
  | "playback-progress"
  | "playback-paused";

export interface Beat {
  key: string;
  timestamp: number;
}

export interface Recording {
  name: string;
  beats: Beat[];
}

export interface State {
  mode: Mode;
  recordings: Recording[];
  currentRecording: Beat[];
}

export type Action =
  | { type: "START_RECORDING" }
  | { type: "PAUSE_RECORDING" }
  | { type: "CONTINUE_RECORDING" }
  | { type: "STOP_RECORDING" }
  | { type: "ADD_BEAT"; payload: Beat }
  | { type: "START_PLAYBACK" }
  | { type: "PAUSE_PLAYBACK" }
  | { type: "CONTINUE_PLAYBACK" }
  | { type: "STOP_PLAYBACK" }
  | { type: "CLEAR_RECORDING" };
