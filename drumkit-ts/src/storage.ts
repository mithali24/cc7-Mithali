import type { Recording } from "./types";

const KEY = "drumkit-recording";

export function saveRecording(recording: Recording) {
  localStorage.setItem(KEY, JSON.stringify(recording));
}

export function loadRecording(): Recording {
  const data = localStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
}

export function clearRecording() {
  localStorage.removeItem(KEY);
}
