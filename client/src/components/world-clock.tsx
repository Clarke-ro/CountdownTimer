import { useWorldClock } from "@/hooks/use-world-clock";

const timeZones = [
  { name: "New York, USA", timezone: "America/New_York" },
  { name: "London, UK", timezone: "Europe/London" },
  { name: "Tokyo, Japan", timezone: "Asia/Tokyo" },
  { name: "Sydney, Australia", timezone: "Australia/Sydney" },
  { name: "Berlin, Germany", timezone: "Europe/Berlin" },
  { name: "Mumbai, India", timezone: "Asia/Kolkata" },
  { name: "São Paulo, Brazil", timezone: "America/Sao_Paulo" },
  { name: "Toronto, Canada", timezone: "America/Toronto" },
  { name: "Shanghai, China", timezone: "Asia/Shanghai" },
  { name: "Moscow, Russia", timezone: "Europe/Moscow" },
  { name: "Los Angeles, USA", timezone: "America/Los_Angeles" },
  { name: "Dubai, UAE", timezone: "Asia/Dubai" },
];

export default function WorldClock() {
  const clocks = useWorldClock(timeZones.map(tz => tz.timezone));

  return (
    <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-slate-800">World Clock</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {timeZones.map((zone, index) => {
          const clockData = clocks[zone.timezone];
          
          return (
            <div
              key={zone.timezone}
              className="bg-slate-50 rounded-lg p-4 text-center border border-slate-200"
            >
              <h3 className="font-semibold text-slate-800 mb-2">{zone.name}</h3>
              <div className="timer-display text-2xl font-bold text-slate-700 mb-1">
                {clockData?.time || "00:00:00"}
              </div>
              <div className="text-sm text-slate-500">
                {clockData?.date || "Loading..."}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
