import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AlarmClock() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [alarmTime, setAlarmTime] = useState<string>("");
  const [alarmActive, setAlarmActive] = useState(false);
  const [alarmTriggered, setAlarmTriggered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (alarmActive && alarmTime && !alarmTriggered) {
      const now = new Date();
      const currentTimeString = now.toTimeString().substr(0, 5); // HH:MM format
      
      if (currentTimeString === alarmTime) {
        setAlarmTriggered(true);
        setAlarmActive(false);
        
        // Play alarm sound
        try {
          const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          
          oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
          gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
          
          oscillator.start();
          oscillator.stop(audioContext.currentTime + 2);
        } catch (error) {
          console.warn('Audio not supported:', error);
        }
        
        alert('ALARM! Time reached!');
        setAlarmTriggered(false);
      }
    }
  }, [currentTime, alarmTime, alarmActive, alarmTriggered]);

  const handleSetAlarm = () => {
    if (alarmTime) {
      setAlarmActive(true);
      setAlarmTriggered(false);
    } else {
      alert('Please select a time for the alarm');
    }
  };

  const handleClearAlarm = () => {
    setAlarmTime("");
    setAlarmActive(false);
    setAlarmTriggered(false);
  };

  const formatCurrentTime = () => {
    return currentTime.toLocaleTimeString();
  };

  const getAlarmDisplay = () => {
    if (!alarmTime) return "No alarm set";
    return `Alarm set for ${alarmTime}`;
  };

  const getStatus = () => {
    if (alarmTriggered) return "ALARM!";
    if (alarmActive) return "Alarm active";
    return "No alarm set";
  };

  return (
    <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-slate-800">Alarm Clock</h2>
      
      <div className="text-center">
        <div className="mb-6">
          <Label htmlFor="alarm-time" className="block text-sm font-medium text-slate-700 mb-2">
            Set Alarm Time:
          </Label>
          <Input
            id="alarm-time"
            type="time"
            value={alarmTime}
            onChange={(e) => setAlarmTime(e.target.value)}
            className="w-fit mx-auto text-center text-lg"
          />
        </div>
        
        <div className="timer-display text-4xl font-bold text-slate-800 mb-4">
          {formatCurrentTime()}
        </div>
        <div className="text-2xl text-indigo-600 mb-8">
          {getAlarmDisplay()}
        </div>
        
        <div className="flex justify-center space-x-4">
          <Button
            onClick={handleSetAlarm}
            className="px-6 py-3 bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Set Alarm
          </Button>
          <Button
            onClick={handleClearAlarm}
            className="px-6 py-3 bg-red-600 text-white hover:bg-red-700"
          >
            Clear
          </Button>
        </div>
        
        <div className="mt-4 text-sm text-slate-600">
          {getStatus()}
        </div>
      </div>
    </section>
  );
}
