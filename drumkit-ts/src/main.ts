import "./style.css";
import { reducer } from "./reducer";
import { Player } from "./player";
import {
  saveRecording,
  loadRecording,
  clearRecording,
} from "./storage";
import type { Action, State, Beat } from "./types";

let totalPausedTime = 0;
let pauseStart = 0;
console.log("MAIN TS LOADED");

document.addEventListener("DOMContentLoaded", () => {
  let state: State = {
    mode: "normal",
    currentRecording: loadRecording(),
  };

  function dispatch(action: Action) {
    state = reducer(state, action);
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
    console.log("Audio unlocked");
  }

  function playSound(key: string) {
    const audio = document.querySelector(
      `audio[data-key="${key.charCodeAt(0)}"]`
    ) as HTMLAudioElement;

    if (!audio) {
      console.log(" AUDIO NOT FOUND for key:", key);
      return;
    }

    console.log("PLAYING:", key);

    audio.currentTime = 0;

    const playPromise = audio.play();

    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.log("Audio play blocked:", err);
      });
    }
  }

  window.addEventListener("keydown", (e) => {
    const key = e.key.toUpperCase();
    console.log("KEY PRESSED:", key);
    playSound(key);

    if (state.mode === "recording-progress") {
      const beat: Beat = {
        key,
        timestamp: Date.now() - startTime - totalPausedTime,
        type: "beat",
      };
      console.log("BEAT ADDED:", beat);
      dispatch({ type: "ADD_BEAT", payload: beat });
    }
  });

  document.getElementById("record")!.onclick = () => {
    unlockAudio();
    totalPausedTime = 0;
    pauseStart = 0;
    dispatch({ type: "START_RECORDING" });
    startTime = Date.now();

    console.log("Recording started");
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
    } else if (state.mode === "recording-paused") {
      totalPausedTime += Date.now() - pauseStart;

      dispatch({ type: "CONTINUE_RECORDING" });

      pauseBtn.textContent = "Pause";
    }
  };

  document.getElementById("stop")!.onclick = () => {
    dispatch({ type: "STOP_RECORDING" });
    console.log("Recording stopped");
  };

  document.getElementById("play")!.onclick = () => {
    console.log("Recording data:", state.currentRecording);

    if (state.currentRecording.length === 0) {
      alert("Nothing recorded! Press keys while recording.");
      return;
    }

    dispatch({ type: "START_PLAYBACK" });

    player = new Player(state.currentRecording, (beat) => {
      playSound(beat.key);
    });

    player.play();

    console.log("Playing");
  };

  document.getElementById("clear")!.onclick = () => {
    dispatch({ type: "CLEAR_RECORDING" });
    clearRecording();

    console.log("Cleared");
  };

  window.addEventListener("beforeunload", () => {
    saveRecording(state.currentRecording);
  });
});