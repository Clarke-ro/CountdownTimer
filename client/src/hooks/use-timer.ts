import { useState, useEffect, useRef } from "react";

type TimerType = 'countdown' | 'stopwatch';

export function useTimer(type: TimerType) {
  const [time, setTime] = useState(type === 'countdown' ? 300 : 0); // 5 minutes for countdown, 0 for stopwatch
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime(prevTime => {
          if (type === 'countdown') {
            if (prevTime <= 1) {
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
            return prevTime - 1;
          } else {
            return prevTime + 1;
          }
        });
      }, 1000);
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
