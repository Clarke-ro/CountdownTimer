import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Volume2, VolumeX } from "lucide-react";

interface AlarmPreviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  soundName: string;
  frequency: number;
  pattern: string;
}

export function AlarmPreviewDialog({ open, onOpenChange, soundName, frequency, pattern }: AlarmPreviewDialogProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(5);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let audioContext: AudioContext | null = null;
    let oscillator: OscillatorNode | null = null;
    let gainNode: GainNode | null = null;

    if (open && isPlaying) {
      setTimeLeft(5);
      
      // Create audio context and play the alarm sound
      try {
        audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        oscillator = audioContext.createOscillator();
        gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // Set frequency and pattern
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        
        // Apply pattern effects
        switch (pattern) {
          case 'melody':
            // Create a simple melody
            oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
            oscillator.frequency.setValueAtTime(frequency * 1.2, audioContext.currentTime + 0.5);
            oscillator.frequency.setValueAtTime(frequency * 1.4, audioContext.currentTime + 1);
            oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime + 1.5);
            break;
          case 'rapid':
            // Rapid beeping effect
            for (let i = 0; i < 10; i++) {
              gainNode.gain.setValueAtTime(0.3, audioContext.currentTime + i * 0.5);
              gainNode.gain.setValueAtTime(0, audioContext.currentTime + i * 0.5 + 0.2);
            }
            break;
          case 'bell':
            // Bell-like decay
            gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 2);
            break;
          case 'digital':
            // Digital square wave pattern
            oscillator.type = 'square';
            break;
          case 'nature':
            // Nature-like chirping
            oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
            for (let i = 0; i < 5; i++) {
              oscillator.frequency.setValueAtTime(frequency * (1 + Math.random() * 0.5), audioContext.currentTime + i);
            }
            break;
          case 'zen':
            // Zen bowl resonance
            oscillator.type = 'sine';
            gainNode.gain.setValueAtTime(0.4, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.1, audioContext.currentTime + 3);
            break;
          case 'rooster':
            // Rooster call pattern
            oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
            oscillator.frequency.setValueAtTime(frequency * 1.8, audioContext.currentTime + 0.3);
            oscillator.frequency.setValueAtTime(frequency * 1.2, audioContext.currentTime + 0.6);
            break;
          case 'ocean':
            // Ocean wave-like sound
            oscillator.type = 'sawtooth';
            oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
            gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
            break;
          case 'piano':
            // Piano-like attack
            gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.2, audioContext.currentTime + 0.5);
            gainNode.gain.exponentialRampToValueAtTime(0.05, audioContext.currentTime + 2);
            break;
          default:
            // Single beep
            oscillator.type = 'sine';
        }
        
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 5);
        
        // Countdown timer
        interval = setInterval(() => {
          setTimeLeft(prev => {
            if (prev <= 1) {
              setIsPlaying(false);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
        
      } catch (error) {
        console.warn('Audio not supported:', error);
        setIsPlaying(false);
      }
    }

    return () => {
      if (interval) clearInterval(interval);
      if (oscillator) {
        try {
          oscillator.stop();
        } catch (e) {
          // Already stopped
        }
      }
      if (audioContext) {
        audioContext.close();
      }
    };
  }, [open, isPlaying, frequency, pattern]);

  const handleStop = () => {
    setIsPlaying(false);
    setTimeLeft(0);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Volume2 className="h-5 w-5" />
            Alarm Preview
          </DialogTitle>
          <DialogDescription>
            Testing alarm sound: {soundName}
          </DialogDescription>
        </DialogHeader>
        
        <Card className="p-6 text-center">
          <div className="mb-4">
            <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              {isPlaying ? timeLeft : "Ready"}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {isPlaying ? "seconds remaining" : "Click play to test alarm"}
            </div>
          </div>
          
          <div className="flex gap-3 justify-center">
            {!isPlaying ? (
              <Button
                onClick={() => setIsPlaying(true)}
                className="flex items-center gap-2"
              >
                <Volume2 className="h-4 w-4" />
                Play 5s Preview
              </Button>
            ) : (
              <Button
                onClick={handleStop}
                variant="destructive"
                className="flex items-center gap-2"
              >
                <VolumeX className="h-4 w-4" />
                Stop
              </Button>
            )}
            
            <Button
              onClick={() => onOpenChange(false)}
              variant="outline"
            >
              Close
            </Button>
          </div>
        </Card>
      </DialogContent>
    </Dialog>
  );
}