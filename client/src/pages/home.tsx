import { useState } from "react";
import CountdownTimer from "@/components/countdown-timer";
import Stopwatch from "@/components/stopwatch";
import AlarmClock from "@/components/alarm-clock";
import WorldClock from "@/components/world-clock";

export default function Home() {
  const [activeTab, setActiveTab] = useState<'countdown' | 'stopwatch' | 'alarm' | 'worldclock'>('countdown');

  const tabs = [
    { id: 'countdown' as const, label: 'Countdown' },
    { id: 'stopwatch' as const, label: 'Stopwatch' },
    { id: 'alarm' as const, label: 'Alarm' },
    { id: 'worldclock' as const, label: 'World Clock' },
  ];



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
