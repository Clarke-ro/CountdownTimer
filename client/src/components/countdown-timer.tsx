import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTimer } from "@/hooks/use-timer";
import { Maximize, Minimize } from "lucide-react";

export default function CountdownTimer() {
  const [inputMinutes, setInputMinutes] = useState<number>(5);
  const [isFullscreen, setIsFullscreen] = useState(false);
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

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 bg-black text-white flex flex-col items-center justify-center z-50">
        <Button
          onClick={() => setIsFullscreen(false)}
          className="absolute top-4 right-4 bg-white/20 hover:bg-white/30"
          size="sm"
        >
          <Minimize className="h-4 w-4" />
        </Button>
        <div className="timer-display text-[8rem] lg:text-[12rem] font-bold mb-8">
          {formatTime(time)}
        </div>
        <div className="text-2xl text-gray-300 mb-8">
          {getStatus()}
        </div>
        <div className="flex gap-4">
          <Button
            onClick={handleStart}
            disabled={isRunning}
            className="px-8 py-4 bg-blue-600 text-white hover:bg-blue-700 text-lg"
          >
            Start
          </Button>
          <Button
            onClick={pause}
            disabled={!isRunning}
            className="px-8 py-4 bg-yellow-600 text-white hover:bg-yellow-700 text-lg"
          >
            Pause
          </Button>
          <Button
            onClick={handleReset}
            className="px-8 py-4 bg-gray-600 text-white hover:bg-gray-700 text-lg"
          >
            Reset
          </Button>
        </div>
      </div>
    );
  }

  return (
    <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-slate-800">Countdown Timer</h2>
        <Button
          onClick={() => setIsFullscreen(true)}
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
        >
          <Maximize className="h-4 w-4" />
          Fullscreen
        </Button>
      </div>
      
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
        
        <div className="timer-display text-8xl lg:text-9xl font-bold text-slate-800 mb-8">
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
