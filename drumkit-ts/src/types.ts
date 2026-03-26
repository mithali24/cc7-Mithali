export type Mode =
  | "normal"
  | "recording-progress"
  | "recording-paused"
  | "playback-progress"
  | "playback-paused";

export interface Beat {
  key: string;
  timestamp: number;
  type: "beat";
}

export interface Pause {
  timestamp: number;
  type: "pause";
}

export type Recording = (Beat | Pause)[];

export interface State {
  mode: Mode;
  currentRecording: Recording;
}

export type Action =
  | { type: "START_RECORDING" }
  | { type: "PAUSE_RECORDING"; pause: Pause }
  | { type: "CONTINUE_RECORDING" }
  | { type: "STOP_RECORDING" }
  | { type: "ADD_BEAT"; payload: Beat }
  | { type: "START_PLAYBACK" }
  | { type: "PAUSE_PLAYBACK" }
  | { type: "CONTINUE_PLAYBACK" }
  | { type: "STOP_PLAYBACK" }
  | { type: "CLEAR_RECORDING" };
