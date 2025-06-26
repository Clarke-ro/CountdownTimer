import { useState, useEffect, useRef } from 'react';

export function useStopwatch() {
  const [time, setTime] = useState(0);
  const [microseconds, setMicroseconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const startTimeRef = useRef<number | null>(null);
  const pausedTimeRef = useRef<number>(0);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = performance.now() - pausedTimeRef.current;
      
      const updateStopwatch = () => {
        if (startTimeRef.current && isRunning) {
          const elapsed = performance.now() - startTimeRef.current;
          const totalMs = Math.floor(elapsed);
          setTime(Math.floor(totalMs / 1000));
          setMicroseconds(totalMs % 1000);
          animationFrameRef.current = requestAnimationFrame(updateStopwatch);
        }
      };
      animationFrameRef.current = requestAnimationFrame(updateStopwatch);
    } else {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      if (startTimeRef.current) {
        pausedTimeRef.current = performance.now() - startTimeRef.current;
      }
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isRunning]);

  const start = () => {
    setIsRunning(true);
  };

  const pause = () => {
    setIsRunning(false);
  };

  const reset = () => {
    setIsRunning(false);
    setTime(0);
    setMicroseconds(0);
    pausedTimeRef.current = 0;
    startTimeRef.current = null;
  };

  return {
    time,
    microseconds,
    isRunning,
    start,
    pause,
    reset,
  };
}