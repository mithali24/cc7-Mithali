import "./style.css";
import { reducer } from "./reducer";
import { Player } from "./player";
import { saveRecording, loadRecording, clearRecording } from "./storage";
import type { Action, State, Beat } from "./types";

let totalPausedTime = 0;
let pauseStart = 0;

console.log("MAIN TS LOADED");

document.addEventListener("DOMContentLoaded", () => {
  let state: State = {
    mode: "normal",
    currentRecording: loadRecording(),
  };

  const status = document.getElementById("status")!;

  const validKeys = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];

  function showStatus(message: string) {
    status.textContent = message;
    status.classList.remove("show-status");
    void (status as HTMLElement).offsetWidth;
    status.classList.add("show-status");
  }

  function dispatch(action: Action) {
    state = reducer(state, action);

    const playBtn = document.getElementById("play") as HTMLButtonElement;

    const isRecording =
      state.mode === "recording-progress" || state.mode === "recording-paused";

    playBtn.disabled = isRecording || state.currentRecording.length === 0;
  }

  let startTime = 0;
  let player: Player | null = null;

  let audioUnlocked = false;

  function unlockAudio() {
    if (audioUnlocked) return;

    const audios = document.querySelectorAll("audio");

    audios.forEach((audio) => {
      audio
        .play()
        .then(() => {
          audio.pause();
          audio.currentTime = 0;
        })
        .catch(() => {});
    });

    audioUnlocked = true;
  }

  function playSound(key: string) {
    const audio = document.querySelector(
      `audio[data-key="${key.charCodeAt(0)}"]`,
    ) as HTMLAudioElement;

    if (!audio) return;

    audio.currentTime = 0;
    audio.play().catch(() => {});
  }

  (document.getElementById("play") as HTMLButtonElement).disabled =
    state.currentRecording.length === 0;

  window.addEventListener("keydown", (e) => {
    const key = e.key.toUpperCase();

    if (!validKeys.includes(key)) return;

    showStatus(`${key} pressed`);
    playSound(key);

    if (state.mode === "recording-progress") {
      const beat: Beat = {
        key,
        timestamp: Date.now() - startTime - totalPausedTime,
        type: "beat",
      };

      dispatch({ type: "ADD_BEAT", payload: beat });
    }
  });

  document.getElementById("record")!.onclick = () => {
    unlockAudio();
    totalPausedTime = 0;
    pauseStart = 0;

    dispatch({ type: "START_RECORDING" });
    startTime = Date.now();

    showStatus("Recording started");
  };

  const pauseBtn = document.getElementById("pause")!;

  pauseBtn.onclick = () => {
    if (state.mode === "recording-progress") {
      pauseStart = Date.now();

      dispatch({
        type: "PAUSE_RECORDING",
        pause: { timestamp: Date.now() - startTime, type: "pause" },
      });

      pauseBtn.textContent = "Resume";
      showStatus("Recording paused");
    } else if (state.mode === "recording-paused") {
      totalPausedTime += Date.now() - pauseStart;

      dispatch({ type: "CONTINUE_RECORDING" });

      pauseBtn.textContent = "Pause";
      showStatus("Recording resumed");
    }
  };

  document.getElementById("stop")!.onclick = () => {
    dispatch({ type: "STOP_RECORDING" });

    pauseBtn.textContent = "Pause";
    showStatus("Recording stopped");
  };

  document.getElementById("play")!.onclick = () => {
    if (state.currentRecording.length === 0) {
      alert("Nothing recorded!");
      return;
    }

    dispatch({ type: "START_PLAYBACK" });

    showStatus("Playing recording");

    player = new Player(state.currentRecording, (beat) => {
      playSound(beat.key);
    });

    player.play();
  };

  document.getElementById("clear")!.onclick = () => {
    dispatch({ type: "CLEAR_RECORDING" });
    clearRecording();

    showStatus("Recording cleared");
  };

  window.addEventListener("beforeunload", () => {
    saveRecording(state.currentRecording);
  });
});
