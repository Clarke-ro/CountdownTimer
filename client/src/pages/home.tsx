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
              <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                Online Timer
              </h1>
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
        {/* Google Ad - Top Leaderboard */}
        <div className="mb-8">
          <div className="bg-white border border-slate-200 rounded-lg p-4 text-center">
            <div className="text-xs text-slate-400 mb-2">Advertisement</div>
            <div id="google-ad-top" className="h-[90px] bg-gradient-to-r from-blue-50 to-indigo-50 rounded flex items-center justify-center">
              <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX" crossOrigin="anonymous"></script>
              <ins className="adsbygoogle block"
                   style={{display: 'block'}}
                   data-ad-client="ca-pub-XXXXXXXXXX"
                   data-ad-slot="XXXXXXXXXX"
                   data-ad-format="horizontal"
                   data-full-width-responsive="true"></ins>
              <div className="text-slate-400 text-sm">Google Ad - 728x90 Leaderboard</div>
            </div>
          </div>
        </div>

        {/* Main Timer Section */}
        {renderActiveSection()}



        {/* Google Ad - Middle Banner */}
        <div className="mt-8">
          <div className="bg-white border border-slate-200 rounded-lg p-4 text-center">
            <div className="text-xs text-slate-400 mb-2">Advertisement</div>
            <div id="google-ad-middle" className="h-[250px] bg-gradient-to-r from-green-50 to-emerald-50 rounded flex items-center justify-center">
              <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX" crossOrigin="anonymous"></script>
              <ins className="adsbygoogle block"
                   style={{display: 'block'}}
                   data-ad-client="ca-pub-XXXXXXXXXX"
                   data-ad-slot="XXXXXXXXXX"
                   data-ad-format="rectangle"
                   data-full-width-responsive="true"></ins>
              <div className="text-slate-400 text-sm">Google Ad - 300x250 Rectangle</div>
            </div>
          </div>
        </div>

        {/* Google Ad - Bottom Leaderboard */}
        <div className="mt-8">
          <div className="bg-white border border-slate-200 rounded-lg p-4 text-center">
            <div className="text-xs text-slate-400 mb-2">Advertisement</div>
            <div id="google-ad-bottom" className="h-[90px] bg-gradient-to-r from-purple-50 to-pink-50 rounded flex items-center justify-center">
              <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX" crossOrigin="anonymous"></script>
              <ins className="adsbygoogle block"
                   style={{display: 'block'}}
                   data-ad-client="ca-pub-XXXXXXXXXX"
                   data-ad-slot="XXXXXXXXXX"
                   data-ad-format="horizontal"
                   data-full-width-responsive="true"></ins>
              <div className="text-slate-400 text-sm">Google Ad - 728x90 Leaderboard</div>
            </div>
          </div>
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
