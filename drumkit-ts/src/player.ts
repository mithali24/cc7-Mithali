import type { Recording, Beat } from "./types";

type ScheduledBeat = {
  delay: number;
  beat: Beat;
};

export class Player {
  private playback: (beat: Beat) => void;

  private schedule: ScheduledBeat[] = [];
  private timers: ReturnType<typeof setTimeout>[] = [];

  private startTime = 0;
  private elapsedBeforePause = 0;

  private currentIndex = 0;
  private isPlaying = false;

  constructor(recording: Recording, playback: (beat: Beat) => void) {
    this.playback = playback;
    this.schedule = this.normalize(recording);
  }

  private normalize(recording: Recording): ScheduledBeat[] {
    const result: ScheduledBeat[] = [];
    const startTime = recording[0]?.timestamp ?? 0;

    for (const item of recording) {
      if (item.type === "beat") {
        result.push({
          delay: item.timestamp - startTime,
          beat: item,
        });
      }
    }

    return result;
  }

  play() {
    this.clearTimers();

    this.isPlaying = true;
    this.startTime = Date.now();

    for (let i = this.currentIndex; i < this.schedule.length; i++) {
      const { delay, beat } = this.schedule[i];

      const remainingDelay = delay - this.elapsedBeforePause;

      if (remainingDelay <= 0) {
        this.playback(beat);
        this.currentIndex = i + 1;
        continue;
      }

      const timer = setTimeout(() => {
        this.playback(beat);
        this.currentIndex = i + 1;
      }, remainingDelay);

      this.timers.push(timer);
    }
  }

  pause() {
    if (!this.isPlaying) return;

    this.isPlaying = false;

    this.elapsedBeforePause += Date.now() - this.startTime;

    this.clearTimers();
  }

  resume() {
    if (this.isPlaying) return;

    this.play();
  }

  stop() {
    this.clearTimers();

    this.currentIndex = 0;
    this.startTime = 0;
    this.elapsedBeforePause = 0;
    this.isPlaying = false;
  }

  getDuration(): number {
    if (this.schedule.length === 0) return 0;
    return this.schedule[this.schedule.length - 1].delay;
  }

  getProgress(): number {
    if (this.schedule.length === 0) return 0;

    const elapsed = this.isPlaying
      ? this.elapsedBeforePause + (Date.now() - this.startTime)
      : this.elapsedBeforePause;

    return Math.min(elapsed, this.getDuration());
  }

  private clearTimers() {
    this.timers.forEach((t) => clearTimeout(t));
    this.timers = [];
  }
}
