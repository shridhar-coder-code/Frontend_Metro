import { useState } from "react";
import { PlusCircle, TrendingUp, Leaf, Award, ChevronRight } from "lucide-react";
import { Topbar } from "./Topbar";
import { Sidebar } from "./Sidebar";
import { SummaryCards } from "./SummaryCards";
import { RecentTrips } from "./RecentTrips";
import { RewardsSection } from "./RewardsSection";
import { AddTripModal } from "./AddTripModal";
import { cn } from "@/utils/cn";

interface DashboardProps {
  dark: boolean;
  setDark: (v: boolean) => void;
  role?: "user" | "admin";
  onLogout?: () => void;
}

export function Dashboard({ dark, setDark, role = "user", onLogout }: DashboardProps) {
  const [activeTab, setActiveTab] = useState("home");
  const [tripModalOpen, setTripModalOpen] = useState(false);

  const handleAddTrip = () => setTripModalOpen(true);

  return (
    <div className={cn("min-h-screen transition-colors duration-300", dark ? "bg-gray-950" : "bg-gray-50")}>
      {/* Top Navigation */}
      <Topbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onAddTrip={handleAddTrip}
        dark={dark}
        setDark={setDark}
        role={role}
        onLogout={onLogout}
      />

      {/* Left Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onAddTrip={handleAddTrip}
        dark={dark}
      />

      {/* Main Content */}
      <main className="pt-16 lg:pl-16 transition-all duration-300">
        <div className="p-4 sm:p-6 max-w-7xl mx-auto">

          {/* Welcome Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">👋</span>
                <h1 className={cn("text-xl sm:text-2xl font-bold", dark ? "text-white" : "text-gray-900")}>
                  Welcome back, {role === "admin" ? "Administrator!" : "Sridhar!"}
                </h1>
              </div>
              <p className={cn("text-sm", dark ? "text-gray-400" : "text-gray-500")}>
                {role === "admin"
                  ? "Metro authority dashboard — manage routes and commuters"
                  : "Here's your sustainability impact dashboard"}
              </p>
            </div>

            {/* Add Trip Button */}
            <button
              onClick={handleAddTrip}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-500 text-white font-semibold text-sm shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              <PlusCircle className="w-4 h-4" />
              Add New Trip
            </button>
          </div>

          {/* Summary Cards */}
          <SummaryCards />

          {/* Chart + Activity row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
            {/* CO2 bar chart */}
            <div className={cn("lg:col-span-2 rounded-2xl border p-5 shadow-sm", dark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100")}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-500" />
                  <h3 className={cn("font-semibold text-sm", dark ? "text-white" : "text-gray-900")}>
                    CO₂ Saved This Month
                  </h3>
                </div>
                <span className={cn("text-xs px-2 py-1 rounded-lg font-medium", dark ? "bg-emerald-900/30 text-emerald-400" : "bg-emerald-50 text-emerald-700")}>
                  Feb 2025
                </span>
              </div>
              <div className="flex items-end gap-1.5 h-28">
                {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 95, 68, 82, 77, 88, 92, 73, 86, 79, 94, 67, 83, 71, 89, 76, 91, 64, 87].map((h, i) => (
                  <div
                    key={i}
                    title={`Day ${i + 1}: ${(h * 2.5).toFixed(0)}g CO₂`}
                    className={cn(
                      "flex-1 rounded-t-sm transition-all duration-500 hover:opacity-80 cursor-pointer",
                      h > 80 ? "bg-gradient-to-t from-emerald-600 to-emerald-400"
                        : h > 60 ? "bg-gradient-to-t from-emerald-500 to-emerald-300"
                        : dark ? "bg-gray-700" : "bg-gray-200"
                    )}
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-2">
                <span className={cn("text-xs", dark ? "text-gray-600" : "text-gray-400")}>Feb 1</span>
                <span className={cn("text-xs", dark ? "text-gray-600" : "text-gray-400")}>Feb 28</span>
              </div>
            </div>

            {/* Eco Score */}
            <div className={cn("rounded-2xl border p-5 shadow-sm flex flex-col", dark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100")}>
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-4 h-4 text-yellow-500" />
                <h3 className={cn("font-semibold text-sm", dark ? "text-white" : "text-gray-900")}>Eco Score</h3>
              </div>
              <div className="flex-1 flex items-center justify-center">
                <div className="relative w-28 h-28">
                  <svg className="w-28 h-28 -rotate-90" viewBox="0 0 112 112">
                    <circle cx="56" cy="56" r="46" fill="none" stroke={dark ? "#1f2937" : "#f3f4f6"} strokeWidth="10" />
                    <circle
                      cx="56" cy="56" r="46" fill="none"
                      stroke="url(#ecoGrad)" strokeWidth="10"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 46}`}
                      strokeDashoffset={`${2 * Math.PI * 46 * (1 - 0.78)}`}
                    />
                    <defs>
                      <linearGradient id="ecoGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#10b981" />
                        <stop offset="100%" stopColor="#34d399" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className={cn("text-2xl font-bold", dark ? "text-white" : "text-gray-900")}>78</span>
                    <span className={cn("text-xs", dark ? "text-gray-500" : "text-gray-400")}>/100</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                {[
                  { label: "Consistency", val: 85 },
                  { label: "Distance", val: 70 },
                  { label: "Frequency", val: 78 },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className={dark ? "text-gray-400" : "text-gray-500"}>{item.label}</span>
                      <span className={cn("font-semibold", dark ? "text-white" : "text-gray-900")}>{item.val}%</span>
                    </div>
                    <div className={cn("h-1.5 rounded-full overflow-hidden", dark ? "bg-gray-800" : "bg-gray-100")}>
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-green-400"
                        style={{ width: `${item.val}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Trips */}
          <RecentTrips dark={dark} />

          {/* Rewards */}
          <RewardsSection dark={dark} userPoints={120} />

          {/* Quick links */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
            {[
              { label: "Carbon Certificate", emoji: "📜", desc: "Download PDF" },
              { label: "Refer a Friend", emoji: "👥", desc: "+50 bonus pts" },
              { label: "Metro Map", emoji: "🗺️", desc: "View all routes" },
              { label: "Support", emoji: "💬", desc: "Get help" },
            ].map((item) => (
              <button
                key={item.label}
                className={cn(
                  "flex items-center gap-3 p-4 rounded-2xl border text-left transition-all hover:-translate-y-0.5 hover:shadow-md group",
                  dark ? "bg-gray-900 border-gray-800 hover:border-emerald-800" : "bg-white border-gray-100 hover:border-emerald-200"
                )}
              >
                <span className="text-2xl">{item.emoji}</span>
                <div className="min-w-0">
                  <p className={cn("text-xs font-semibold truncate", dark ? "text-white" : "text-gray-900")}>{item.label}</p>
                  <p className={cn("text-xs", dark ? "text-gray-500" : "text-gray-400")}>{item.desc}</p>
                </div>
                <ChevronRight className={cn("w-3.5 h-3.5 ml-auto flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity", dark ? "text-gray-500" : "text-gray-400")} />
              </button>
            ))}
          </div>

          {/* Eco tip */}
          <div className={cn("mt-4 p-4 rounded-2xl flex items-start gap-3 border", dark ? "bg-emerald-900/20 border-emerald-800" : "bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-100")}>
            <Leaf className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className={cn("text-sm font-semibold", dark ? "text-emerald-400" : "text-emerald-800")}>
                💡 Eco Tip of the Day
              </p>
              <p className={cn("text-xs mt-1 leading-relaxed", dark ? "text-emerald-500/80" : "text-emerald-700")}>
                Taking metro instead of a car for your daily 10km commute saves approximately 2.5 kg of CO₂ per trip.
                That's over 650 kg per year — equivalent to planting 30 trees! 🌳
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className={cn("text-center text-xs py-6 mt-4", dark ? "text-gray-700" : "text-gray-400")}>
            © 2025 GreenMetro Rewards Platform · All rights reserved
          </div>
        </div>
      </main>

      {/* Floating Add Trip Button (Mobile) */}
      <button
        onClick={handleAddTrip}
        className="fixed bottom-6 right-6 z-40 lg:hidden w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500 to-green-500 text-white shadow-xl shadow-emerald-500/40 flex items-center justify-center hover:scale-110 active:scale-95 transition-transform duration-200"
        title="Add Trip"
      >
        <PlusCircle className="w-6 h-6" />
      </button>

      {/* Add Trip Modal */}
      <AddTripModal
        open={tripModalOpen}
        onClose={() => setTripModalOpen(false)}
        dark={dark}
      />
    </div>
  );
}
