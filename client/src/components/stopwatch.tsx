import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useTimer } from "@/hooks/use-timer";
import { Maximize, Minimize } from "lucide-react";

export default function Stopwatch() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { time, isRunning, start, pause, reset } = useTimer('stopwatch');

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatus = () => {
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
            onClick={() => start()}
            disabled={isRunning}
            className="px-8 py-4 bg-emerald-600 text-white hover:bg-emerald-700 text-lg"
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
            onClick={reset}
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
        <h2 className="text-3xl font-bold text-slate-800">Stopwatch</h2>
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
        <div className="timer-display text-8xl lg:text-9xl font-bold text-slate-800 mb-8">
          {formatTime(time)}
        </div>
        
        <div className="flex justify-center space-x-4">
          <Button
            onClick={() => start()}
            disabled={isRunning}
            className="px-6 py-3 bg-emerald-600 text-white hover:bg-emerald-700"
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
            onClick={reset}
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
