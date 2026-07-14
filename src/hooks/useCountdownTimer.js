import { useEffect, useState } from "react";
import { TIMER_DURATION, RESET_DELAY, TIMER_KEY } from "../constants/translations";

// localStorage keys
const END_TIME_KEY   = `${TIMER_KEY}_end`;
const RESET_TIME_KEY = `${TIMER_KEY}_reset`;

function readStored() {
  return {
    endTime:   Number(localStorage.getItem(END_TIME_KEY))   || null,
    resetTime: Number(localStorage.getItem(RESET_TIME_KEY)) || null,
  };
}

function decompose(ms) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const hours        = Math.floor(totalSeconds / 3600);
  const minutes      = Math.floor((totalSeconds % 3600) / 60);
  const seconds      = totalSeconds % 60;
  return { hours, minutes, seconds };
}

/**
 * Three-phase countdown timer with localStorage persistence.
 *
 * Phase "running" — countdown active, returns { phase, hours, minutes, seconds }.
 * Phase "closed"  — timer expired, reset window counting down.
 * After reset window passes, a fresh countdown begins automatically.
 *
 * @returns {{ phase: "running"|"closed", hours: number, minutes: number, seconds: number }}
 */
export function useCountdownTimer() {
  const [tick, setTick] = useState(0); // force re-render every second

  // Initialise on first mount
  useEffect(() => {
    const { endTime } = readStored();
    if (!endTime) {
      localStorage.setItem(END_TIME_KEY, String(Date.now() + TIMER_DURATION));
    }
  }, []);

  // Drive updates every second
  useEffect(() => {
    const id = setInterval(() => setTick((n) => n + 1), 1000);
    return () => clearInterval(id);
  }, []);

  // Derive state on every tick
  const now  = Date.now();
  let { endTime, resetTime } = readStored();

  // Phase 1 — countdown running
  if (endTime && now < endTime) {
    return { phase: "running", ...decompose(endTime - now) };
  }

  // Phase 2 — timer just expired, open reset window
  if (!resetTime) {
    resetTime = now + RESET_DELAY;
    localStorage.setItem(RESET_TIME_KEY, String(resetTime));
  }

  // Phase 3 — reset window passed, start fresh countdown
  if (now >= resetTime) {
    const newEnd = now + TIMER_DURATION;
    localStorage.setItem(END_TIME_KEY,   String(newEnd));
    localStorage.removeItem(RESET_TIME_KEY);
    return { phase: "running", ...decompose(newEnd - now) };
  }

  // Still in closed/reset window
  return { phase: "closed", hours: 0, minutes: 0, seconds: 0 };
}
