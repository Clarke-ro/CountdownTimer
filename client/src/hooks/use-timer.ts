import { useState, useEffect, useRef } from "react";

type TimerType = 'countdown' | 'stopwatch';

export function useTimer(type: TimerType) {
  const [time, setTime] = useState(type === 'countdown' ? 300 : 0); // 5 minutes for countdown, 0 for stopwatch
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      const startTime = Date.now();
      const initialTime = time;
      
      intervalRef.current = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        setTime(prevTime => {
          let newTime;
          if (type === 'countdown') {
            newTime = Math.max(0, initialTime - elapsed);
            if (newTime <= 0 && prevTime > 0) {
              setIsRunning(false);
              // Timer finished
              try {
                const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
                gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
                
                oscillator.start();
                oscillator.stop(audioContext.currentTime + 1);
              } catch (error) {
                console.warn('Audio not supported:', error);
              }
              
              alert('Countdown finished!');
              return 0;
            }
            return newTime;
          } else {
            return initialTime + elapsed;
          }
        });
      }, 100); // Update more frequently for smoother display
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, type]);

  const start = (initialTime?: number) => {
    if (initialTime !== undefined) {
      setTime(initialTime);
    }
    setIsRunning(true);
  };

  const pause = () => {
    setIsRunning(false);
  };

  const reset = () => {
    setIsRunning(false);
    setTime(type === 'countdown' ? 300 : 0);
  };

  return {
    time,
    isRunning,
    start,
    pause,
    reset,
  };
}
