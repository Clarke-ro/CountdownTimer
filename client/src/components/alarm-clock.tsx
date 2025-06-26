import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import { X, Volume2, Play, Pause, Maximize, Minimize } from "lucide-react";

const alarmSounds = [
  { id: 'beep', name: 'Classic Beep', frequency: 800 },
  { id: 'chime', name: 'Gentle Chime', frequency: 523 },
  { id: 'buzz', name: 'Buzz Alert', frequency: 200 },
  { id: 'bell', name: 'Bell Ring', frequency: 659 },
  { id: 'digital', name: 'Digital Alert', frequency: 1000 },
];

interface Alarm {
  id: string;
  name: string;
  hours: string;
  minutes: string;
  period: 'AM' | 'PM';
  sound: string;
  repeat: boolean;
  active: boolean;
}

export default function AlarmClock() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [alarms, setAlarms] = useState<Alarm[]>([]);
  const [showAlarmDialog, setShowAlarmDialog] = useState(false);
  const [showAlarmAlert, setShowAlarmAlert] = useState(false);
  const [triggeredAlarm, setTriggeredAlarm] = useState<Alarm | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // New alarm form state
  const [newAlarm, setNewAlarm] = useState<Omit<Alarm, 'id' | 'active'>>({
    name: '',
    hours: '12',
    minutes: '00',
    period: 'AM',
    sound: 'beep',
    repeat: false
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    alarms.forEach(alarm => {
      if (alarm.active) {
        const now = new Date();
        const currentHours = now.getHours();
        const currentMinutes = now.getMinutes();
        const currentSeconds = now.getSeconds();
        
        // Convert alarm time to 24-hour format
        let alarmHours = parseInt(alarm.hours);
        if (alarm.period === 'PM' && alarmHours !== 12) {
          alarmHours += 12;
        } else if (alarm.period === 'AM' && alarmHours === 12) {
          alarmHours = 0;
        }
        
        const alarmMinutes = parseInt(alarm.minutes);
        
        // Check if alarm should trigger (at the exact minute and second 0)
        if (currentHours === alarmHours && currentMinutes === alarmMinutes && currentSeconds === 0) {
          setTriggeredAlarm(alarm);
          setShowAlarmAlert(true);
          playAlarmSound(alarm.sound);
          
          // Show browser notification
          if (Notification.permission === 'granted') {
            new Notification(`🚨 ${alarm.name || 'Alarm'}`, {
              body: `Time: ${alarm.hours}:${alarm.minutes} ${alarm.period}`,
              icon: '/favicon.ico'
            });
          }
          
          // Disable alarm if not repeating
          if (!alarm.repeat) {
            setAlarms(prev => prev.map(a => 
              a.id === alarm.id ? { ...a, active: false } : a
            ));
          }
        }
      }
    });
  }, [currentTime, alarms]);

  const playAlarmSound = (soundId = newAlarm.sound) => {
    const selectedSoundData = alarmSounds.find(sound => sound.id === soundId);
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
      if (soundId === 'chime') {
        gainNode.gain.exponentialRampToValueAtTime(0.4, audioContext.currentTime + 0.5);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 2);
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 2);
      } else if (soundId === 'buzz') {
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
      } else if (soundId === 'bell') {
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

  const createAlarm = () => {
    if (!newAlarm.name.trim()) {
      alert('Please enter an alarm name');
      return;
    }
    
    const alarm: Alarm = {
      id: Date.now().toString(),
      ...newAlarm,
      active: true
    };
    
    setAlarms(prev => [...prev, alarm]);
    setShowAlarmDialog(false);
    setNewAlarm({
      name: '',
      hours: '12',
      minutes: '00',
      period: 'AM',
      sound: 'beep',
      repeat: false
    });
    requestNotificationPermission();
  };

  const deleteAlarm = (id: string) => {
    setAlarms(prev => prev.filter(alarm => alarm.id !== id));
  };

  const toggleAlarm = (id: string) => {
    setAlarms(prev => prev.map(alarm => 
      alarm.id === id ? { ...alarm, active: !alarm.active } : alarm
    ));
  };

  const formatCurrentTime = () => {
    return currentTime.toLocaleTimeString();
  };

  const stopAlarmAlert = () => {
    setShowAlarmAlert(false);
    setTriggeredAlarm(null);
  };

  const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

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
        <div className="timer-display text-[8rem] lg:text-[12rem] font-bold mb-4">
          {formatCurrentTime()}
        </div>
        <div className="text-2xl text-gray-300">
          {currentTime.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-slate-800">Alarm Clock</h2>
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
          <div className="timer-display text-6xl lg:text-7xl font-bold text-slate-800 mb-4">
            {formatCurrentTime()}
          </div>
          <div className="text-lg text-slate-600 mb-8">
            {currentTime.toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>

          <Dialog open={showAlarmDialog} onOpenChange={setShowAlarmDialog}>
            <DialogTrigger asChild>
              <Button className="px-8 py-3 bg-indigo-600 text-white hover:bg-indigo-700 mb-8">
                Set New Alarm
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Create New Alarm</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6">
                {/* Time Selection */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Hours</Label>
                    <Select value={newAlarm.hours} onValueChange={(value) => 
                      setNewAlarm(prev => ({ ...prev, hours: value }))
                    }>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {hours.map(hour => (
                          <SelectItem key={hour} value={hour}>{hour}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Minutes</Label>
                    <Select value={newAlarm.minutes} onValueChange={(value) => 
                      setNewAlarm(prev => ({ ...prev, minutes: value }))
                    }>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {minutes.map(minute => (
                          <SelectItem key={minute} value={minute}>{minute}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium mb-2 block">AM/PM</Label>
                    <Select value={newAlarm.period} onValueChange={(value: 'AM' | 'PM') => 
                      setNewAlarm(prev => ({ ...prev, period: value }))
                    }>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="AM">AM</SelectItem>
                        <SelectItem value="PM">PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Sound Selection */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">Alarm Sound</Label>
                  <div className="flex gap-2">
                    <Select value={newAlarm.sound} onValueChange={(value) => 
                      setNewAlarm(prev => ({ ...prev, sound: value }))
                    }>
                      <SelectTrigger className="flex-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {alarmSounds.map(sound => (
                          <SelectItem key={sound.id} value={sound.id}>{sound.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button
                      onClick={testAlarmSound}
                      variant="outline"
                      size="sm"
                      className="px-3"
                    >
                      <Volume2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Repeat Toggle */}
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Repeat Daily</Label>
                  <Switch
                    checked={newAlarm.repeat}
                    onCheckedChange={(checked) => 
                      setNewAlarm(prev => ({ ...prev, repeat: checked }))
                    }
                  />
                </div>

                {/* Alarm Name */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">Alarm Name</Label>
                  <Input
                    value={newAlarm.name}
                    onChange={(e) => setNewAlarm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., Wake up, Meeting reminder"
                    className="w-full"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button
                    onClick={testAlarmSound}
                    variant="outline"
                    className="flex-1"
                  >
                    Test Preview
                  </Button>
                  <Button
                    onClick={createAlarm}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700"
                  >
                    Start Alarm
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Active Alarms List */}
          {alarms.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Active Alarms</h3>
              <div className="space-y-3">
                {alarms.map(alarm => (
                  <Card key={alarm.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="text-left">
                        <div className="font-semibold text-slate-800">
                          {alarm.name || 'Unnamed Alarm'}
                        </div>
                        <div className="text-2xl font-bold text-indigo-600">
                          {alarm.hours}:{alarm.minutes} {alarm.period}
                        </div>
                        <div className="text-sm text-slate-600">
                          {alarm.repeat ? 'Daily' : 'One time'} • {alarmSounds.find(s => s.id === alarm.sound)?.name}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          onClick={() => toggleAlarm(alarm.id)}
                          variant={alarm.active ? "default" : "outline"}
                          size="sm"
                        >
                          {alarm.active ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        </Button>
                        <Button
                          onClick={() => deleteAlarm(alarm.id)}
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Alarm Alert Dialog */}
      <Dialog open={showAlarmAlert} onOpenChange={() => {}}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-2xl text-center">🚨 ALARM!</DialogTitle>
          </DialogHeader>
          
          {triggeredAlarm && (
            <div className="text-center space-y-4">
              <div className="text-lg font-semibold">{triggeredAlarm.name}</div>
              <div className="text-3xl font-bold text-indigo-600">
                {triggeredAlarm.hours}:{triggeredAlarm.minutes} {triggeredAlarm.period}
              </div>
              <div className="text-sm text-slate-600">
                {alarmSounds.find(s => s.id === triggeredAlarm.sound)?.name}
              </div>
              <Button 
                onClick={stopAlarmAlert}
                className="w-full bg-red-600 hover:bg-red-700"
              >
                Stop Alarm
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}