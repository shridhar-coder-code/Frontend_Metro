import { useState } from "react";
import {
  PlusCircle, Leaf, TrendingUp, Users, FileText,
  Download, RefreshCw, Award, Shield, Map, BarChart2
} from "lucide-react";
import { AdminTopbar }        from "./AdminTopbar";
import { AdminSidebar }       from "./AdminSidebar";
import { AdminSummaryCards }  from "./AdminSummaryCards";
import { AdminAnalytics }     from "./AdminAnalytics";
import { AdminTripsTable }    from "./AdminTripsTable";
import { AdminRewardsManager } from "./AdminRewardsManager";
import { cn } from "@/utils/cn";

interface AdminDashboardProps {
  dark: boolean;
  setDark: (v: boolean) => void;
  onLogout?: () => void;
}

export function AdminDashboard({ dark, setDark, onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className={cn("min-h-screen transition-colors duration-300", dark ? "bg-gray-950" : "bg-gray-50")}>
      {/* Top Nav */}
      <AdminTopbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        dark={dark}
        setDark={setDark}
        onLogout={onLogout}
      />

      {/* Left Sidebar */}
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        dark={dark}
      />

      {/* Main Content */}
      <main className="pt-16 lg:pl-16 transition-all duration-300">
        <div className="p-4 sm:p-6 max-w-[1600px] mx-auto">

          {/* Page header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-800 to-emerald-700 flex items-center justify-center">
                  {activeTab === "dashboard"  && <BarChart2 className="w-4 h-4 text-white" />}
                  {activeTab === "users"      && <Users className="w-4 h-4 text-white" />}
                  {activeTab === "trips"      && <Map className="w-4 h-4 text-white" />}
                  {activeTab === "rewards"    && <Award className="w-4 h-4 text-white" />}
                  {activeTab === "analytics"  && <TrendingUp className="w-4 h-4 text-white" />}
                  {activeTab === "reports"    && <FileText className="w-4 h-4 text-white" />}
                  {activeTab === "settings"   && <Shield className="w-4 h-4 text-white" />}
                </div>
                <h1 className={cn("text-xl sm:text-2xl font-black", dark ? "text-white" : "text-gray-900")}>
                  {activeTab === "dashboard"  && "Admin Dashboard"}
                  {activeTab === "users"      && "User Management"}
                  {activeTab === "trips"      && "Trip Management"}
                  {activeTab === "rewards"    && "Rewards Management"}
                  {activeTab === "analytics"  && "Analytics"}
                  {activeTab === "reports"    && "Reports"}
                  {activeTab === "settings"   && "Settings"}
                </h1>
              </div>
              <p className={cn("text-sm", dark ? "text-gray-400" : "text-gray-500")}>
                {activeTab === "dashboard"  && "Metro authority overview · Green Metro Rewards platform"}
                {activeTab === "users"      && "Manage registered commuters and their accounts"}
                {activeTab === "trips"      && "Review, approve or reject commuter metro trips"}
                {activeTab === "rewards"    && "Create and manage reward catalogue for commuters"}
                {activeTab === "analytics"  && "Platform-wide analytics and sustainability metrics"}
                {activeTab === "reports"    && "Download and export platform reports"}
                {activeTab === "settings"   && "Configure platform and system settings"}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold transition-all border",
                dark ? "border-gray-700 text-gray-300 hover:bg-gray-800" : "border-gray-200 text-gray-600 hover:bg-gray-100"
              )}>
                <RefreshCw className="w-3.5 h-3.5" />
                Refresh
              </button>
              {activeTab !== "settings" && (
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-green-800 to-emerald-700 text-white text-sm font-bold shadow-lg shadow-green-900/30 hover:shadow-green-800/50 hover:-translate-y-0.5 transition-all">
                  {activeTab === "rewards"   ? <PlusCircle className="w-3.5 h-3.5" /> : <Download className="w-3.5 h-3.5" />}
                  {activeTab === "rewards"   ? "Create Reward" : "Export"}
                </button>
              )}
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════ */}
          {/*  DASHBOARD TAB                                          */}
          {/* ═══════════════════════════════════════════════════════ */}
          {activeTab === "dashboard" && (
            <>
              {/* Summary Cards */}
              <AdminSummaryCards />

              {/* Quick action row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                {[
                  { label: "Pending Trips",     val: "4",     sub: "Need review",       color: "text-amber-600",  bg: dark ? "bg-amber-900/20 border-amber-800" : "bg-amber-50 border-amber-200", icon: "⏳" },
                  { label: "New Users Today",   val: "238",   sub: "+12% vs yesterday", color: "text-emerald-600", bg: dark ? "bg-emerald-900/20 border-emerald-800" : "bg-emerald-50 border-emerald-200", icon: "👥" },
                  { label: "System Uptime",     val: "99.9%", sub: "All services live",  color: "text-blue-600",   bg: dark ? "bg-blue-900/20 border-blue-800" : "bg-blue-50 border-blue-200",     icon: "⚡" },
                  { label: "CO₂ Saved Today",  val: "6.4 t", sub: "Real-time",          color: "text-green-600",  bg: dark ? "bg-green-900/20 border-green-800" : "bg-green-50 border-green-200",  icon: "🌿" },
                ].map((item) => (
                  <div key={item.label} className={cn("p-4 rounded-2xl border transition-all hover:-translate-y-0.5 hover:shadow-md", item.bg)}>
                    <div className="text-2xl mb-2">{item.icon}</div>
                    <p className={cn("text-xl font-black", item.color)}>{item.val}</p>
                    <p className={cn("text-xs font-bold mt-0.5", dark ? "text-gray-300" : "text-gray-700")}>{item.label}</p>
                    <p className={cn("text-xs", dark ? "text-gray-600" : "text-gray-400")}>{item.sub}</p>
                  </div>
                ))}
              </div>

              {/* Analytics */}
              <AdminAnalytics dark={dark} />

              {/* Trips table preview */}
              <AdminTripsTable dark={dark} />

              {/* Bottom row: Rewards preview + eco stats */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
                {/* Top rewards */}
                <div className={cn("lg:col-span-2 rounded-2xl border p-5 shadow-sm", dark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100")}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className={cn("font-bold text-sm", dark ? "text-white" : "text-gray-900")}>Top Redeemed Rewards</h3>
                    <button
                      onClick={() => setActiveTab("rewards")}
                      className="text-emerald-600 text-xs font-semibold hover:text-emerald-500"
                    >Manage →</button>
                  </div>
                  <div className="space-y-3">
                    {[
                      { name: "Free Coffee", val: 3420, max: 3420, emoji: "☕", color: "bg-amber-500" },
                      { name: "Shopping Voucher", val: 1820, max: 3420, emoji: "🛍️", color: "bg-purple-500" },
                      { name: "Movie Ticket", val: 940, max: 3420, emoji: "🎬", color: "bg-blue-500" },
                      { name: "Metro Day Pass", val: 680, max: 3420, emoji: "🚇", color: "bg-emerald-500" },
                    ].map((r) => (
                      <div key={r.name} className="flex items-center gap-3">
                        <span className="text-xl w-8 flex-shrink-0">{r.emoji}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between text-xs mb-1">
                            <span className={cn("font-semibold truncate", dark ? "text-gray-300" : "text-gray-700")}>{r.name}</span>
                            <span className={cn("font-bold flex-shrink-0 ml-2", dark ? "text-white" : "text-gray-900")}>{r.val.toLocaleString()}</span>
                          </div>
                          <div className={cn("h-2 rounded-full overflow-hidden", dark ? "bg-gray-800" : "bg-gray-100")}>
                            <div className={cn("h-full rounded-full", r.color)} style={{ width: `${(r.val / r.max) * 100}%` }} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Eco impact */}
                <div className={cn("rounded-2xl border p-5 shadow-sm", dark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100")}>
                  <div className="flex items-center gap-2 mb-4">
                    <Leaf className="w-4 h-4 text-emerald-500" />
                    <h3 className={cn("font-bold text-sm", dark ? "text-white" : "text-gray-900")}>Eco Impact</h3>
                  </div>
                  <div className="space-y-4">
                    {[
                      { label: "Trees Equivalent", val: "9,216", icon: "🌳", color: dark ? "text-green-400" : "text-green-600" },
                      { label: "Car Trips Avoided", val: "61,440", icon: "🚗", color: dark ? "text-red-400" : "text-red-500" },
                      { label: "Fuel Saved (L)", val: "73,728", icon: "⛽", color: dark ? "text-orange-400" : "text-orange-600" },
                      { label: "Active Routes", val: "48", icon: "🛤️", color: dark ? "text-blue-400" : "text-blue-600" },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{item.icon}</span>
                          <span className={cn("text-xs font-semibold", dark ? "text-gray-400" : "text-gray-600")}>{item.label}</span>
                        </div>
                        <span className={cn("text-sm font-black", item.color)}>{item.val}</span>
                      </div>
                    ))}
                  </div>

                  <div className={cn("mt-4 p-3 rounded-xl text-xs text-center font-semibold", dark ? "bg-emerald-900/30 text-emerald-400" : "bg-emerald-50 text-emerald-700")}>
                    🌍 Platform equivalent to planting 9,216 trees this year
                  </div>
                </div>
              </div>

              {/* Eco tip banner */}
              <div className={cn("p-4 rounded-2xl flex items-start gap-3 border mb-4", dark ? "bg-emerald-900/20 border-emerald-800" : "bg-gradient-to-r from-green-50 to-emerald-50 border-green-100")}>
                <Leaf className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className={cn("text-sm font-bold", dark ? "text-emerald-400" : "text-emerald-800")}>💡 Admin Insight</p>
                  <p className={cn("text-xs mt-1 leading-relaxed", dark ? "text-emerald-500/80" : "text-emerald-700")}>
                    Yeshwanthpur and Whitefield corridors show 34% higher CO₂ saving per trip than average.
                    Consider incentivising longer-distance commuters with bonus reward multipliers!
                  </p>
                </div>
              </div>
            </>
          )}

          {/* ═══════════════════════════════════════════════════════ */}
          {/*  TRIPS TAB                                              */}
          {/* ═══════════════════════════════════════════════════════ */}
          {activeTab === "trips" && <AdminTripsTable dark={dark} />}

          {/* ═══════════════════════════════════════════════════════ */}
          {/*  ANALYTICS TAB                                          */}
          {/* ═══════════════════════════════════════════════════════ */}
          {activeTab === "analytics" && (
            <>
              <AdminSummaryCards />
              <AdminAnalytics dark={dark} />
            </>
          )}

          {/* ═══════════════════════════════════════════════════════ */}
          {/*  REWARDS TAB                                            */}
          {/* ═══════════════════════════════════════════════════════ */}
          {activeTab === "rewards" && <AdminRewardsManager dark={dark} />}

          {/* ═══════════════════════════════════════════════════════ */}
          {/*  USERS TAB                                              */}
          {/* ═══════════════════════════════════════════════════════ */}
          {activeTab === "users" && (
            <div className={cn("rounded-2xl border shadow-sm overflow-hidden", dark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100")}>
              <div className={cn("px-5 py-4 border-b flex items-center justify-between", dark ? "border-gray-800" : "border-gray-100")}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-700 to-emerald-600 flex items-center justify-center">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h2 className={cn("font-bold text-base", dark ? "text-white" : "text-gray-900")}>Registered Commuters</h2>
                    <p className={cn("text-xs", dark ? "text-gray-500" : "text-gray-400")}>94,218 total users</p>
                  </div>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 text-white text-sm font-bold hover:bg-emerald-500 transition-all">
                  <Download className="w-3.5 h-3.5" />Export CSV
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className={cn("text-left text-xs font-bold uppercase tracking-wider", dark ? "bg-gray-800/60 text-gray-500" : "bg-gray-50 text-gray-400")}>
                      {["User", "Email", "Joined", "Total Trips", "CO₂ Saved", "Points", "Status"].map((h) => (
                        <th key={h} className="px-4 py-3.5 whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: "Arjun Sharma", avatar: "AS", email: "arjun@mail.com", joined: "Jan 2024", trips: 68, co2: "24.2 kg", pts: 348, active: true },
                      { name: "Priya Nair",   avatar: "PN", email: "priya@mail.com", joined: "Feb 2024", trips: 45, co2: "18.6 kg", pts: 210, active: true },
                      { name: "Rahul Verma",  avatar: "RV", email: "rahul@mail.com", joined: "Mar 2024", trips: 92, co2: "31.4 kg", pts: 520, active: true },
                      { name: "Sneha Reddy",  avatar: "SR", email: "sneha@mail.com", joined: "Nov 2023", trips: 33, co2: "12.8 kg", pts: 145, active: false },
                      { name: "Kiran Kumar",  avatar: "KK", email: "kiran@mail.com", joined: "Oct 2023", trips: 120, co2: "44.6 kg", pts: 680, active: true },
                      { name: "Divya Menon",  avatar: "DM", email: "divya@mail.com", joined: "Dec 2023", trips: 57, co2: "22.1 kg", pts: 290, active: true },
                    ].map((u) => (
                      <tr key={u.name} className={cn("border-t transition-all cursor-pointer", dark ? "border-gray-800 hover:bg-gray-800/50" : "border-gray-50 hover:bg-emerald-50/40")}>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">{u.avatar}</div>
                            <span className={cn("text-sm font-semibold", dark ? "text-white" : "text-gray-900")}>{u.name}</span>
                          </div>
                        </td>
                        <td className={cn("px-4 py-4 text-xs", dark ? "text-gray-400" : "text-gray-500")}>{u.email}</td>
                        <td className={cn("px-4 py-4 text-xs", dark ? "text-gray-400" : "text-gray-500")}>{u.joined}</td>
                        <td className={cn("px-4 py-4 text-sm font-bold", dark ? "text-white" : "text-gray-900")}>{u.trips}</td>
                        <td className="px-4 py-4">
                          <span className={cn("inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold", dark ? "bg-blue-900/30 text-blue-300" : "bg-blue-50 text-blue-700")}>🌿 {u.co2}</span>
                        </td>
                        <td className="px-4 py-4">
                          <span className={cn("inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold", dark ? "bg-yellow-900/30 text-yellow-300" : "bg-yellow-50 text-yellow-700")}>⭐ {u.pts}</span>
                        </td>
                        <td className="px-4 py-4">
                          <span className={cn("inline-flex px-2.5 py-1 rounded-full text-xs font-bold", u.active ? "bg-emerald-100 text-emerald-700" : dark ? "bg-gray-700 text-gray-400" : "bg-gray-100 text-gray-500")}>
                            {u.active ? "Active" : "Inactive"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════ */}
          {/*  REPORTS TAB                                            */}
          {/* ═══════════════════════════════════════════════════════ */}
          {activeTab === "reports" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {[
                { title: "CO₂ Savings Report",   sub: "Monthly carbon offset summary",       icon: "🌿", ready: true  },
                { title: "Trip Analytics Report", sub: "All trips with stats for Feb 2025",   icon: "🚇", ready: true  },
                { title: "User Activity Report",  sub: "Engagement and commuter stats",        icon: "👥", ready: true  },
                { title: "Rewards Usage Report",  sub: "Redemption patterns and trends",       icon: "🎁", ready: false },
                { title: "Financial Report",      sub: "Token economics and transactions",     icon: "💰", ready: true  },
                { title: "System Audit Log",      sub: "Admin actions and security events",    icon: "🛡️", ready: true  },
              ].map((r) => (
                <div key={r.title} className={cn("rounded-2xl border p-5 shadow-sm flex items-start gap-4 hover:-translate-y-1 hover:shadow-lg transition-all cursor-pointer", dark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100")}>
                  <span className="text-3xl">{r.icon}</span>
                  <div className="flex-1 min-w-0">
                    <h3 className={cn("font-bold text-sm mb-0.5", dark ? "text-white" : "text-gray-900")}>{r.title}</h3>
                    <p className={cn("text-xs mb-3", dark ? "text-gray-500" : "text-gray-400")}>{r.sub}</p>
                    <button className={cn(
                      "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                      r.ready
                        ? "bg-gradient-to-r from-green-700 to-emerald-600 text-white hover:shadow-md hover:shadow-emerald-500/25"
                        : dark ? "bg-gray-800 text-gray-500 cursor-not-allowed" : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    )}>
                      <Download className="w-3 h-3" />
                      {r.ready ? "Download PDF" : "Generating…"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════ */}
          {/*  SETTINGS TAB                                           */}
          {/* ═══════════════════════════════════════════════════════ */}
          {activeTab === "settings" && (
            <div className="max-w-2xl space-y-4">
              {[
                { section: "Platform", items: [
                  { label: "Platform Name", val: "Green Metro Rewards", type: "text" },
                  { label: "Points per km", val: "3.5", type: "number" },
                  { label: "CO₂ factor (g/km)", val: "200", type: "number" },
                ]},
                { section: "Notifications", items: [
                  { label: "Email alerts for pending trips", val: "Enabled", type: "toggle" },
                  { label: "Weekly report emails", val: "Enabled", type: "toggle" },
                  { label: "Low stock reward alerts", val: "Enabled", type: "toggle" },
                ]},
              ].map((group) => (
                <div key={group.section} className={cn("rounded-2xl border shadow-sm overflow-hidden", dark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100")}>
                  <div className={cn("px-5 py-3.5 border-b font-bold text-sm", dark ? "border-gray-800 text-gray-300 bg-gray-800/40" : "border-gray-100 text-gray-700 bg-gray-50")}>
                    {group.section}
                  </div>
                  <div className="divide-y divide-gray-100">
                    {group.items.map((item) => (
                      <div key={item.label} className={cn("flex items-center justify-between px-5 py-4", dark ? "divide-gray-800" : "")}>
                        <span className={cn("text-sm font-semibold", dark ? "text-gray-300" : "text-gray-700")}>{item.label}</span>
                        {item.type === "toggle" ? (
                          <div className="w-10 h-5 rounded-full bg-emerald-500 flex items-center justify-end px-0.5 cursor-pointer">
                            <div className="w-4 h-4 rounded-full bg-white shadow" />
                          </div>
                        ) : (
                          <input
                            type={item.type}
                            defaultValue={item.val}
                            className={cn("w-36 px-3 py-1.5 rounded-lg border text-sm font-bold outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-500 text-right", dark ? "bg-gray-800 border-gray-700 text-white" : "bg-gray-50 border-gray-200 text-gray-900")}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-800 to-emerald-700 text-white text-sm font-bold shadow-lg hover:shadow-emerald-700/30 hover:-translate-y-0.5 transition-all">
                Save Settings
              </button>
            </div>
          )}

          {/* Footer */}
          <div className={cn("text-center text-xs py-6 mt-4", dark ? "text-gray-700" : "text-gray-400")}>
            © 2025 GreenMetro Rewards Platform · Metro Authority Admin Panel · v2.0
          </div>
        </div>
      </main>

      {/* Floating action button */}
      <button
        className="fixed bottom-6 right-6 z-40 lg:hidden w-14 h-14 rounded-full bg-gradient-to-br from-green-800 to-emerald-700 text-white shadow-xl shadow-green-900/50 flex items-center justify-center hover:scale-110 active:scale-95 transition-transform duration-200"
        title="Quick Action"
        onClick={() => setActiveTab("rewards")}
      >
        <PlusCircle className="w-6 h-6" />
      </button>
    </div>
  );
}
