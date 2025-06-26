import { useState } from "react";
import { useWorldClock } from "@/hooks/use-world-clock";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Maximize, Minimize } from "lucide-react";

// Top countries/cities to display prominently
const topCities = [
  { name: "New York", country: "USA", timezone: "America/New_York", flag: "🇺🇸" },
  { name: "London", country: "UK", timezone: "Europe/London", flag: "🇬🇧" },
  { name: "Tokyo", country: "Japan", timezone: "Asia/Tokyo", flag: "🇯🇵" },
  { name: "Sydney", country: "Australia", timezone: "Australia/Sydney", flag: "🇦🇺" },
  { name: "Berlin", country: "Germany", timezone: "Europe/Berlin", flag: "🇩🇪" },
  { name: "Mumbai", country: "India", timezone: "Asia/Kolkata", flag: "🇮🇳" },
];

// Other cities for the secondary section
const otherCities = [
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
  { name: "Istanbul", country: "Turkey", timezone: "Europe/Istanbul", flag: "🇹🇷" },
  { name: "Jakarta", country: "Indonesia", timezone: "Asia/Jakarta", flag: "🇮🇩" },
  { name: "Lagos", country: "Nigeria", timezone: "Africa/Lagos", flag: "🇳🇬" },
  { name: "Johannesburg", country: "South Africa", timezone: "Africa/Johannesburg", flag: "🇿🇦" },
];

const allCities = [...topCities, ...otherCities];

export default function WorldClock() {
  const [selectedCity, setSelectedCity] = useState<typeof allCities[0] | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Get clocks for top cities to display at the top
  const topTimezones = topCities.map(city => city.timezone);
  const topClocks = useWorldClock(topTimezones);
  
  // Get clock for selected city if any
  const selectedCityData = useWorldClock(selectedCity ? [selectedCity.timezone] : []);

  if (isFullscreen && selectedCity) {
    const clockData = selectedCityData[selectedCity.timezone];
    
    return (
      <div className="fixed inset-0 bg-black text-white flex flex-col items-center justify-center z-50">
        <Button
          onClick={() => setIsFullscreen(false)}
          className="absolute top-4 right-4 bg-white/20 hover:bg-white/30"
          size="sm"
        >
          <Minimize className="h-4 w-4" />
        </Button>
        <div className="text-6xl mb-4">{selectedCity.flag}</div>
        <div className="text-4xl font-bold mb-2">{selectedCity.name}</div>
        <div className="text-2xl text-gray-300 mb-8">{selectedCity.country}</div>
        <div className="timer-display text-[8rem] lg:text-[12rem] font-bold mb-4">
          {clockData?.time || "00:00:00"}
        </div>
        <div className="text-2xl text-gray-300">
          {clockData?.date || "Loading..."}
        </div>
      </div>
    );
  }

  if (selectedCity) {
    const clockData = selectedCityData[selectedCity.timezone];
    
    return (
      <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
        <div className="flex items-center justify-between mb-8">
          <Button
            onClick={() => setSelectedCity(null)}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to World Clock
          </Button>
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
          <div className="text-8xl mb-6">{selectedCity.flag}</div>
          <h2 className="text-4xl font-bold text-slate-800 mb-2">{selectedCity.name}</h2>
          <p className="text-xl text-slate-600 mb-8">{selectedCity.country}</p>
          
          <div className="timer-display text-8xl lg:text-9xl font-bold text-slate-800 mb-4">
            {clockData?.time || "00:00:00"}
          </div>
          <div className="text-2xl text-slate-600 mb-8">
            {clockData?.date || "Loading..."}
          </div>
          
          <div className="text-lg text-slate-500">
            Timezone: {selectedCity.timezone.replace('_', ' ')}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-slate-800">World Clock</h2>
      
      {/* Top Countries Section */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-slate-700 mb-4">Top Countries</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {topCities.map((city) => {
            const clockData = topClocks[city.timezone];
            return (
              <Card
                key={city.timezone}
                className="p-4 hover:bg-slate-50 cursor-pointer transition-colors border-2 hover:border-blue-300"
                onClick={() => setSelectedCity(city)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{city.flag}</div>
                    <div className="text-left">
                      <div className="font-semibold text-slate-800">{city.name}</div>
                      <div className="text-sm text-slate-600">{city.country}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-lg font-bold text-slate-800">
                      {clockData?.time || "00:00:00"}
                    </div>
                    <div className="text-xs text-slate-500">
                      {clockData?.date?.split(',')[0] || "Loading..."}
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Other Cities Section */}
      <div>
        <h3 className="text-xl font-semibold text-slate-700 mb-4">Other Cities</h3>
        <div className="text-center mb-6">
          <p className="text-slate-600">Click on any city to view its current time</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {otherCities.map((city) => (
            <Card
              key={city.timezone}
              className="p-4 hover:bg-slate-50 cursor-pointer transition-colors border-2 hover:border-blue-300"
              onClick={() => setSelectedCity(city)}
            >
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{city.flag}</div>
                <div className="text-left">
                  <div className="font-semibold text-slate-800">{city.name}</div>
                  <div className="text-sm text-slate-600">{city.country}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
      
      <div className="mt-8 text-center text-sm text-slate-500">
        {allCities.length} cities available • Click any city to view detailed time information
      </div>
    </section>
  );
}