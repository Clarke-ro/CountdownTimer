import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const alarmSounds = [
  { id: 'beep', name: 'Classic Beep', frequency: 800 },
  { id: 'chime', name: 'Gentle Chime', frequency: 523 },
  { id: 'buzz', name: 'Buzz Alert', frequency: 200 },
  { id: 'bell', name: 'Bell Ring', frequency: 659 },
  { id: 'digital', name: 'Digital Alert', frequency: 1000 },
];

export default function AlarmClock() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [alarmTime, setAlarmTime] = useState<string>("");
  const [alarmActive, setAlarmActive] = useState(false);
  const [alarmTriggered, setAlarmTriggered] = useState(false);
  const [selectedSound, setSelectedSound] = useState<string>('beep');

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
        
        // Play selected alarm sound
        playAlarmSound();
        
        // Show visual alert
        if (Notification.permission === 'granted') {
          new Notification('🚨 ALARM!', {
            body: `Time reached: ${alarmTime}`,
            icon: '/favicon.ico'
          });
        } else {
          alert('🚨 ALARM! Time reached!');
        }
        setAlarmTriggered(false);
      }
    }
  }, [currentTime, alarmTime, alarmActive, alarmTriggered, selectedSound]);

  const playAlarmSound = () => {
    const selectedSoundData = alarmSounds.find(sound => sound.id === selectedSound);
    if (!selectedSoundData) return;

    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(selectedSoundData.frequency, audioContext.currentTime);
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      
      // Create a pattern for different sound types
      if (selectedSound === 'chime') {
        // Gentle fade in/out for chime
        gainNode.gain.exponentialRampToValueAtTime(0.4, audioContext.currentTime + 0.5);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 2);
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 2);
      } else if (selectedSound === 'buzz') {
        // Pulsing buzz
        for (let i = 0; i < 3; i++) {
          setTimeout(() => {
            const buzzOsc = audioContext.createOscillator();
            const buzzGain = audioContext.createGain();
            buzzOsc.connect(buzzGain);
            buzzGain.connect(audioContext.destination);
            buzzOsc.frequency.setValueAtTime(selectedSoundData.frequency, audioContext.currentTime);
            buzzGain.gain.setValueAtTime(0.4, audioContext.currentTime);
            buzzOsc.start();
            buzzOsc.stop(audioContext.currentTime + 0.3);
          }, i * 400);
        }
      } else if (selectedSound === 'bell') {
        // Bell-like ring with harmonics
        const frequencies = [selectedSoundData.frequency, selectedSoundData.frequency * 1.5, selectedSoundData.frequency * 2];
        frequencies.forEach((freq, index) => {
          const bellOsc = audioContext.createOscillator();
          const bellGain = audioContext.createGain();
          bellOsc.connect(bellGain);
          bellGain.connect(audioContext.destination);
          bellOsc.frequency.setValueAtTime(freq, audioContext.currentTime);
          bellGain.gain.setValueAtTime(0.2 / (index + 1), audioContext.currentTime);
          bellGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 2);
          bellOsc.start();
          bellOsc.stop(audioContext.currentTime + 2);
        });
      } else {
        // Default beep or digital
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 1.5);
      }
    } catch (error) {
      console.warn('Audio not supported:', error);
    }
  };

  const testAlarmSound = () => {
    playAlarmSound();
  };

  const requestNotificationPermission = () => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  };

  const handleSetAlarm = () => {
    if (alarmTime) {
      setAlarmActive(true);
      setAlarmTriggered(false);
      requestNotificationPermission();
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
    if (alarmActive) return `🔔 Alarm active for ${alarmTime}`;
    return `Alarm set for ${alarmTime}`;
  };

  const getStatus = () => {
    if (alarmTriggered) return "🚨 ALARM!";
    if (alarmActive) return "⏰ Alarm active";
    return "Ready to set alarm";
  };

  return (
    <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-slate-800">Alarm Clock</h2>
      
      <div className="text-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <Label htmlFor="alarm-time" className="block text-sm font-medium text-slate-700 mb-2">
              Set Alarm Time:
            </Label>
            <Input
              id="alarm-time"
              type="time"
              value={alarmTime}
              onChange={(e) => setAlarmTime(e.target.value)}
              className="w-full text-center text-lg"
            />
          </div>
          
          <div>
            <Label htmlFor="alarm-sound" className="block text-sm font-medium text-slate-700 mb-2">
              Alarm Sound:
            </Label>
            <div className="flex space-x-2">
              <Select value={selectedSound} onValueChange={setSelectedSound}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Select sound" />
                </SelectTrigger>
                <SelectContent>
                  {alarmSounds.map((sound) => (
                    <SelectItem key={sound.id} value={sound.id}>
                      {sound.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                onClick={testAlarmSound}
                variant="outline"
                size="sm"
                className="px-3"
              >
                Test
              </Button>
            </div>
          </div>
        </div>
        
        <div className="timer-display text-6xl lg:text-7xl font-bold text-slate-800 mb-4">
          {formatCurrentTime()}
        </div>
        <div className="text-2xl text-indigo-600 mb-8 min-h-[2rem]">
          {getAlarmDisplay()}
        </div>
        
        <div className="flex justify-center space-x-4">
          <Button
            onClick={handleSetAlarm}
            disabled={!alarmTime}
            className="px-6 py-3 bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-gray-400"
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
