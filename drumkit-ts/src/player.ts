import type { Recording, Beat } from "./types";

type Timeout = ReturnType<typeof setTimeout>;

type ScheduledBeat = {
  delay: number;
  beat: Beat;
};

export class Player {
  private playback: (beat: Beat) => void;

  private schedule: ScheduledBeat[] = [];
  private timers: Timeout[] = [];

  private startTime = 0;
  private pausedAt = 0;
  private currentIndex = 0;

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
  this.startTime = Date.now();

  for (let i = this.currentIndex; i < this.schedule.length; i++) {
    const { delay, beat } = this.schedule[i];

    const adjustedDelay =
      this.pausedAt === 0
        ? delay
        : delay - (this.pausedAt - this.startTime);

    const timer = setTimeout(() => {
      this.playback(beat);
      this.currentIndex = i + 1;
    }, adjustedDelay);

    this.timers.push(timer);
  }
}

  pause() {
    this.pausedAt = Date.now();
    this.clearTimers();
  }

  resume() {
    this.startTime += Date.now() - this.pausedAt;
    this.play();
  }

  stop() {
    this.clearTimers();
    this.currentIndex = 0;
    this.startTime = 0;
    this.pausedAt = 0;
  }

  private clearTimers() {
    this.timers.forEach(clearTimeout);
    this.timers = [];
  }
}
