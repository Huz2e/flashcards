/**
 * Timer class for managing countdown/countup functionality
 * 
 * @example
 * const timer = new Timer((seconds) => console.log(seconds));
 * timer.start();  // Starts counting
 * timer.stop();   // Pauses the timer
 * timer.reset();  // Resets to 0
 */
export class Timer {
  private seconds: number;
  private isActive: boolean;
  private timer: NodeJS.Timeout | null;
  private onTick?: (seconds: number) => void;

  /**
   * Creates a new Timer instance
   * @param onTick - Callback function called every second with current time
   */
  constructor(onTick?: (seconds: number) => void) {
    this.seconds = 0;
    this.isActive = false;
    this.timer = null;
    this.onTick = onTick;
  }

  /**
   * Starts or resumes the timer
   */
  start() {
    if (!this.isActive) {
      this.isActive = true;
      this.timer = setInterval(() => {
        this.seconds++;
        this.onTick?.(this.seconds);
      }, 1000);
    }
  }

  /**
   * Stops/pauses the timer
   */
  stop() {
    if (this.isActive) {
      this.isActive = false;
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    }
  }

  /**
   * Resets the timer to 0
   */
  reset() {
    this.stop();
    this.seconds = 0;
    this.onTick?.(this.seconds);
  }

  /**
   * Returns the elapsed time in seconds
   * @returns number
   */
  getElapsedTime() {
    return this.seconds;
  }

  /**
   * Returns whether the timer is currently running
   * @returns boolean
   */
  isRunning() {
    return this.isActive;
  }
}

/**
 * Formats the total seconds into a time string
 * @param totalSeconds - Total seconds
 * @returns string
 */
export const formatTime = (totalSeconds: number) => {
  const minutes = Math.floor(totalSeconds / 60);
  const remainingSeconds = totalSeconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};