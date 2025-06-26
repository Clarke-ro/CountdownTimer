import { useState, useEffect } from "react";

interface ClockData {
  time: string;
  date: string;
}

export function useWorldClock(timezones: string[]) {
  const [clocks, setClocks] = useState<Record<string, ClockData>>({});

  useEffect(() => {
    const updateClocks = () => {
      const now = new Date();
      const newClocks: Record<string, ClockData> = {};

      timezones.forEach(timezone => {
        try {
          const timeString = now.toLocaleTimeString('en-US', {
            timeZone: timezone,
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          });
          
          const dateString = now.toLocaleDateString('en-US', {
            timeZone: timezone,
            weekday: 'long',
            month: 'short',
            day: 'numeric'
          });

          newClocks[timezone] = {
            time: timeString,
            date: dateString
          };
        } catch (error) {
          console.error(`Error updating world clock for timezone: ${timezone}`, error);
          newClocks[timezone] = {
            time: '00:00:00',
            date: 'Error'
          };
        }
      });

      setClocks(newClocks);
    };

    // Update immediately
    updateClocks();

    // Update every second
    const interval = setInterval(updateClocks, 1000);

    return () => clearInterval(interval);
  }, [timezones]);

  return clocks;
}
