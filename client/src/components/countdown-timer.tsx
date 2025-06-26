import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTimer } from "@/hooks/use-timer";

export default function CountdownTimer() {
  const [inputMinutes, setInputMinutes] = useState<number>(5);
  const { time, isRunning, start, pause, reset } = useTimer('countdown');

  const handleStart = () => {
    start(inputMinutes * 60);
  };

  const handleReset = () => {
    reset();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatus = () => {
    if (time === 0 && !isRunning) return "Time's up!";
    if (isRunning) return "Running...";
    if (time > 0) return "Paused";
    return "Ready to start";
  };

  return (
    <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-slate-800">Countdown Timer</h2>
      
      <div className="text-center">
        <div className="mb-6">
          <Label htmlFor="countdown-input" className="block text-sm font-medium text-slate-700 mb-2">
            Set Minutes:
          </Label>
          <Input
            id="countdown-input"
            type="number"
            min="1"
            max="999"
            value={inputMinutes}
            onChange={(e) => setInputMinutes(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-32 mx-auto text-center text-lg"
            placeholder="5"
          />
        </div>
        
        <div className="timer-display text-6xl font-bold text-slate-800 mb-8">
          {formatTime(time)}
        </div>
        
        <div className="flex justify-center space-x-4">
          <Button
            onClick={handleStart}
            disabled={isRunning}
            className="px-6 py-3 bg-blue-600 text-white hover:bg-blue-700"
          >
            Start
          </Button>
          <Button
            onClick={pause}
            disabled={!isRunning}
            className="px-6 py-3 bg-yellow-600 text-white hover:bg-yellow-700"
          >
            Pause
          </Button>
          <Button
            onClick={handleReset}
            className="px-6 py-3 bg-gray-600 text-white hover:bg-gray-700"
          >
            Reset
          </Button>
        </div>
        
        <div className="mt-4 text-sm text-slate-600">
          {getStatus()}
        </div>
      </div>
    </section>
  );
}
