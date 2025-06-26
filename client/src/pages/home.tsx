import { useState } from "react";
import CountdownTimer from "@/components/countdown-timer";
import Stopwatch from "@/components/stopwatch";
import AlarmClock from "@/components/alarm-clock";
import WorldClock from "@/components/world-clock";
import { Card } from "@/components/ui/card";
import { useWorldClock } from "@/hooks/use-world-clock";

const worldCities = [
  { name: "New York", country: "USA", timezone: "America/New_York", flag: "🇺🇸" },
  { name: "London", country: "UK", timezone: "Europe/London", flag: "🇬🇧" },
  { name: "Tokyo", country: "Japan", timezone: "Asia/Tokyo", flag: "🇯🇵" },
  { name: "Sydney", country: "Australia", timezone: "Australia/Sydney", flag: "🇦🇺" },
  { name: "Berlin", country: "Germany", timezone: "Europe/Berlin", flag: "🇩🇪" },
  { name: "Mumbai", country: "India", timezone: "Asia/Kolkata", flag: "🇮🇳" },
  { name: "São Paulo", country: "Brazil", timezone: "America/Sao_Paulo", flag: "🇧🇷" },
  { name: "Toronto", country: "Canada", timezone: "America/Toronto", flag: "🇨🇦" },
  { name: "Shanghai", country: "China", timezone: "Asia/Shanghai", flag: "🇨🇳" },
  { name: "Moscow", country: "Russia", timezone: "Europe/Moscow", flag: "🇷🇺" },
  { name: "Los Angeles", country: "USA", timezone: "America/Los_Angeles", flag: "🇺🇸" },
  { name: "Dubai", country: "UAE", timezone: "Asia/Dubai", flag: "🇦🇪" },
  { name: "Paris", country: "France", timezone: "Europe/Paris", flag: "🇫🇷" },
  { name: "Singapore", country: "Singapore", timezone: "Asia/Singapore", flag: "🇸🇬" },
  { name: "Mexico City", country: "Mexico", timezone: "America/Mexico_City", flag: "🇲🇽" },
  { name: "Cairo", country: "Egypt", timezone: "Africa/Cairo", flag: "🇪🇬" },
  { name: "Buenos Aires", country: "Argentina", timezone: "America/Argentina/Buenos_Aires", flag: "🇦🇷" },
  { name: "Seoul", country: "South Korea", timezone: "Asia/Seoul", flag: "🇰🇷" },
  { name: "Bangkok", country: "Thailand", timezone: "Asia/Bangkok", flag: "🇹🇭" },
  { name: "Rome", country: "Italy", timezone: "Europe/Rome", flag: "🇮🇹" },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<'countdown' | 'stopwatch' | 'alarm' | 'worldclock'>('countdown');
  const [selectedCities, setSelectedCities] = useState<string[]>(['America/New_York', 'Europe/London', 'Asia/Tokyo', 'Australia/Sydney']);
  const worldClocks = useWorldClock(selectedCities);

  const tabs = [
    { id: 'countdown' as const, label: 'Countdown' },
    { id: 'stopwatch' as const, label: 'Stopwatch' },
    { id: 'alarm' as const, label: 'Alarm' },
    { id: 'worldclock' as const, label: 'World Clock' },
  ];

  const handleCityToggle = (timezone: string) => {
    setSelectedCities(prev => {
      if (prev.includes(timezone)) {
        return prev.filter(tz => tz !== timezone);
      } else {
        return [...prev, timezone];
      }
    });
  };

  const renderActiveSection = () => {
    switch (activeTab) {
      case 'countdown':
        return <CountdownTimer />;
      case 'stopwatch':
        return <Stopwatch />;
      case 'alarm':
        return <AlarmClock />;
      case 'worldclock':
        return <WorldClock />;
      default:
        return <CountdownTimer />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-slate-800">Online Timer</h1>
              <span className="ml-3 text-sm text-slate-500 hidden sm:block">
                Free Countdown, Stopwatch, Alarm & World Clock Tool
              </span>
            </div>
            <nav className="flex space-x-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'tab-button-active'
                      : 'tab-button-inactive'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Ad Placeholder Top */}
        <div className="bg-slate-100 border-2 border-dashed border-slate-300 rounded-lg p-8 text-center mb-8">
          <span className="text-slate-500 text-sm">Advertisement Space - 728x90 Leaderboard</span>
        </div>

        {/* Main Timer Section */}
        {renderActiveSection()}

        {/* World Clock Quick Access Section */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">World Time Zones</h2>
          
          {/* Selected Cities Display */}
          {selectedCities.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {selectedCities.map((timezone) => {
                const city = worldCities.find(c => c.timezone === timezone);
                const clockData = worldClocks[timezone];
                
                return (
                  <Card key={timezone} className="p-4 text-center bg-slate-50 border-slate-200">
                    <div className="text-2xl mb-1">{city?.flag}</div>
                    <h3 className="font-semibold text-slate-800 text-sm">{city?.name}</h3>
                    <p className="text-xs text-slate-600 mb-2">{city?.country}</p>
                    <div className="timer-display text-lg font-bold text-slate-700">
                      {clockData?.time || "00:00:00"}
                    </div>
                    <div className="text-xs text-slate-500">
                      {clockData?.date || "Loading..."}
                    </div>
                  </Card>
                );
              })}
            </div>
          )}

          {/* City Selection Grid */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 text-center">
              Click to add/remove cities from your world clock
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
              {worldCities.map((city) => (
                <button
                  key={city.timezone}
                  onClick={() => handleCityToggle(city.timezone)}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 text-sm text-center ${
                    selectedCities.includes(city.timezone)
                      ? 'bg-blue-100 border-blue-500 text-blue-700'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-blue-50 hover:border-blue-300'
                  }`}
                >
                  <div className="text-xl mb-1">{city.flag}</div>
                  <div className="font-medium">{city.name}</div>
                  <div className="text-xs opacity-75">{city.country}</div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Sponsorship Banner Placeholder */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-dashed border-blue-300 rounded-lg p-8 text-center mt-8">
          <span className="text-blue-600 text-sm font-medium">
            Sponsorship Banner - Partner with productivity tools like Notion, Asana
          </span>
        </div>

        {/* Ad Placeholder Bottom */}
        <div className="bg-slate-100 border-2 border-dashed border-slate-300 rounded-lg p-8 text-center mt-8">
          <span className="text-slate-500 text-sm">Advertisement Space - 728x90 Leaderboard</span>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col space-y-4 md:space-y-0">
            <div className="flex flex-wrap justify-center md:justify-between items-center gap-4">
              <div className="text-slate-600 text-sm">
                © 2024 Online Timer. All rights reserved.
              </div>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <a href="mailto:hello@onlinetimer.com" className="text-slate-600 hover:text-slate-800 transition-colors duration-200">
                  Contact: hello@onlinetimer.com
                </a>
                <a href="#" className="text-slate-600 hover:text-slate-800 transition-colors duration-200">
                  Privacy Policy
                </a>
                <a href="#" className="text-slate-600 hover:text-slate-800 transition-colors duration-200">
                  Terms of Service
                </a>
                <a href="#" className="text-slate-600 hover:text-slate-800 transition-colors duration-200">
                  Partnerships
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
