import { useState } from "react";
import { TrendingUp, Users, Train, Leaf, Gift, BarChart2 } from "lucide-react";
import { userGrowthData, tripsPerDay, co2Trend, rewardsUsage } from "@/data/adminData";
import { cn } from "@/utils/cn";

interface AdminAnalyticsProps {
  dark: boolean;
}

type ChartKey = "users" | "trips" | "co2" | "rewards";

const charts: { key: ChartKey; label: string; icon: typeof TrendingUp; color: string; data: number[]; unit: string; accent: string }[] = [
  { key: "users",   label: "User Growth",      icon: Users,     color: "from-emerald-500 to-teal-500",   data: userGrowthData, unit: "users/day",  accent: "#10b981" },
  { key: "trips",   label: "Trips Per Day",     icon: Train,     color: "from-orange-400 to-amber-500",   data: tripsPerDay,    unit: "trips",      accent: "#f97316" },
  { key: "co2",     label: "CO₂ Savings Trend", icon: Leaf,      color: "from-blue-500 to-cyan-500",      data: co2Trend,       unit: "tonnes",     accent: "#3b82f6" },
  { key: "rewards", label: "Rewards Usage",     icon: Gift,      color: "from-purple-500 to-pink-500",    data: rewardsUsage,   unit: "redeemed",   accent: "#a855f7" },
];

function MiniBarChart({ data, accent }: { data: number[]; accent: string }) {
  const max = Math.max(...data);
  return (
    <div className="flex items-end gap-0.5 h-20 mt-2">
      {data.map((val, i) => (
        <div
          key={i}
          className="flex-1 rounded-t-sm transition-all duration-500 hover:opacity-70 cursor-pointer"
          style={{
            height: `${(val / max) * 100}%`,
            background: i > data.length - 8 ? accent : "#e5e7eb",
          }}
          title={`Day ${i + 1}: ${val}`}
        />
      ))}
    </div>
  );
}

function LineChart({ data, accent }: { data: number[]; accent: string; dark?: boolean }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 300;
  const h = 80;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * h * 0.85 - h * 0.075;
    return `${x},${y}`;
  }).join(" ");
  const fillPts = `0,${h} ${pts} ${w},${h}`;

  return (
    <div className="mt-2">
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ height: 80 }}>
        <defs>
          <linearGradient id={`grad-${accent}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={accent} stopOpacity="0.3" />
            <stop offset="100%" stopColor={accent} stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon points={fillPts} fill={`url(#grad-${accent})`} />
        <polyline
          points={pts}
          fill="none"
          stroke={accent}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Last point dot */}
        {(() => {
          const last = data.length - 1;
          const x = (last / (data.length - 1)) * w;
          const y = h - ((data[last] - min) / range) * h * 0.85 - h * 0.075;
          return <circle cx={x} cy={y} r="4" fill={accent} />;
        })()}
      </svg>
    </div>
  );
}

export function AdminAnalytics({ dark }: AdminAnalyticsProps) {
  const [active, setActive] = useState<ChartKey>("users");
  const activeChart = charts.find((c) => c.key === active)!;

  const totals: Record<ChartKey, string> = {
    users:   "94,218",
    trips:   "3,47,560",
    co2:     "1,840 t",
    rewards: "12,840",
  };

  return (
    <div className={cn("rounded-2xl border shadow-sm overflow-hidden mb-6", dark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100")}>
      {/* Header */}
      <div className={cn("flex items-center justify-between px-5 py-4 border-b", dark ? "border-gray-800" : "border-gray-100")}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-700 to-emerald-600 flex items-center justify-center">
            <BarChart2 className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className={cn("font-bold text-base", dark ? "text-white" : "text-gray-900")}>Analytics Overview</h2>
            <p className={cn("text-xs", dark ? "text-gray-500" : "text-gray-400")}>Last 28 days · Live data</p>
          </div>
        </div>
        <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-xs font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Live
        </span>
      </div>

      {/* Tab selectors */}
      <div className={cn("flex gap-1 p-3 border-b", dark ? "border-gray-800" : "border-gray-100")}>
        {charts.map(({ key, label, icon: Icon, color }) => (
          <button
            key={key}
            onClick={() => setActive(key)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 flex-1 justify-center",
              active === key
                ? `bg-gradient-to-r ${color} text-white shadow-md`
                : dark ? "text-gray-500 hover:bg-gray-800 hover:text-gray-300" : "text-gray-500 hover:bg-gray-100"
            )}
          >
            <Icon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </div>

      {/* Main chart area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
        {/* Big line chart */}
        <div className="lg:col-span-2 p-5">
          <div className="flex items-center justify-between mb-1">
            <h3 className={cn("font-bold text-sm", dark ? "text-white" : "text-gray-800")}>{activeChart.label}</h3>
            <span className={cn("text-xl font-black", dark ? "text-white" : "text-gray-900")}>{totals[active]}</span>
          </div>
          <p className={cn("text-xs mb-3", dark ? "text-gray-500" : "text-gray-400")}>{activeChart.unit} · Feb 2025</p>
          <LineChart data={activeChart.data} accent={activeChart.accent} dark={dark} />
          <div className="flex justify-between mt-1">
            <span className={cn("text-xs", dark ? "text-gray-600" : "text-gray-400")}>Feb 1</span>
            <span className={cn("text-xs", dark ? "text-gray-600" : "text-gray-400")}>Feb 28</span>
          </div>
        </div>

        {/* Sidebar mini charts */}
        <div className={cn("border-t lg:border-t-0 lg:border-l p-4 space-y-4", dark ? "border-gray-800" : "border-gray-100")}>
          {charts.filter((c) => c.key !== active).map(({ key, label, icon: Icon, accent, data }) => (
            <button
              key={key}
              onClick={() => setActive(key)}
              className={cn(
                "w-full text-left rounded-xl p-3 transition-all hover:-translate-y-0.5 hover:shadow-md border",
                dark ? "border-gray-800 hover:bg-gray-800" : "border-gray-100 hover:bg-gray-50"
              )}
            >
              <div className="flex items-center justify-between mb-0.5">
                <div className="flex items-center gap-1.5">
                  <Icon className="w-3.5 h-3.5" style={{ color: accent }} />
                  <span className={cn("text-xs font-semibold", dark ? "text-gray-300" : "text-gray-700")}>{label}</span>
                </div>
                <span className="text-xs font-bold" style={{ color: accent }}>{totals[key as ChartKey]}</span>
              </div>
              <MiniBarChart data={data} accent={accent} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
