import { Button } from "@/components/ui/button";
import { useTimer } from "@/hooks/use-timer";

export default function Stopwatch() {
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

  return (
    <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-slate-800">Stopwatch</h2>
      
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
