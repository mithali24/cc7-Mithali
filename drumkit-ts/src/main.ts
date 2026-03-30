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
  const progressEl = document.getElementById("play-progress") as HTMLDivElement;

  const validKeys = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];

  let startTime = 0;
  let player: Player | null = null;
  let audioUnlocked = false;

  const playBtn = document.getElementById("play") as HTMLButtonElement;
  const pauseBtn = document.getElementById("pause") as HTMLButtonElement;
  const stopBtn = document.getElementById("stop") as HTMLButtonElement;

  function showStatus(message: string) {
    status.textContent = message;
    status.classList.remove("show-status");
    void (status as HTMLElement).offsetWidth;
    status.classList.add("show-status");
  }

  function dispatch(action: Action | { type: "__INIT__" }) {
    state = reducer(state, action as Action);

    const isRecordingSession =
      state.mode === "recording-progress" || state.mode === "recording-paused";

    // Play button
    playBtn.disabled =
      isRecordingSession || state.currentRecording.length === 0;

    // Pause button (enabled in BOTH recording states)
    pauseBtn.disabled = !isRecordingSession;

    // Stop button (IMPORTANT: also enabled in paused state)
    stopBtn.disabled = !isRecordingSession;

    // Button label change
    pauseBtn.textContent =
      state.mode === "recording-paused" ? "Resume" : "Pause";
  }

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

  function highlightKey(key: string) {
    const keyEl = document.querySelector(
      `.key[data-key="${key.charCodeAt(0)}"]`,
    ) as HTMLElement;

    if (!keyEl) return;

    keyEl.classList.add("active");

    setTimeout(() => {
      keyEl.classList.remove("active");
    }, 100);
  }

  window.addEventListener("keydown", (e) => {
    const key = e.key.toUpperCase();

    if (!validKeys.includes(key)) return;

    showStatus(`${key} pressed`);
    highlightKey(key);
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

  pauseBtn.onclick = () => {
    if (state.mode === "recording-progress") {
      pauseStart = Date.now();

      dispatch({
        type: "PAUSE_RECORDING",
        pause: {
          timestamp: Date.now() - startTime,
          type: "pause",
        },
      });

      showStatus("Recording paused");
    } else if (state.mode === "recording-paused") {
      totalPausedTime += Date.now() - pauseStart;

      dispatch({ type: "CONTINUE_RECORDING" });

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

    progressEl.style.width = "0%";

    player = new Player(state.currentRecording, (beat) => {
      playSound(beat.key);
    });

    player.play();

    const start = performance.now();
    const duration = player.getDuration();

    const tick = () => {
      const elapsed = performance.now() - start;
      const progress = Math.min((elapsed / duration) * 100, 100);

      progressEl.style.width = `${progress}%`;

      if (progress < 100) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  };

  document.getElementById("clear")!.onclick = () => {
    const shouldClear = confirm(
      "Are you sure you want to clear the recording?",
    );

    if (!shouldClear) return;

    dispatch({ type: "CLEAR_RECORDING" });
    clearRecording();

    progressEl.style.width = "0%";

    showStatus("Recording cleared");
  };

  window.addEventListener("beforeunload", () => {
    saveRecording(state.currentRecording);
  });

  // ✅ initialize UI correctly
  dispatch({ type: "__INIT__" });
});
