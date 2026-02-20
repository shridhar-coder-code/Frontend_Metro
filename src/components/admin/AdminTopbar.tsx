import { useState } from "react";
import {
  Train, LayoutDashboard, Users, Map, BarChart2,
  FileText, Bell, User, LogOut, Menu, X, Moon, Sun, Shield
} from "lucide-react";
import { cn } from "@/utils/cn";
import { notifications } from "@/data/adminData";

interface AdminTopbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  dark: boolean;
  setDark: (v: boolean) => void;
  onLogout?: () => void;
}

const navItems = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "users",     label: "Users",     icon: Users },
  { key: "trips",     label: "Trips",     icon: Map },
  { key: "analytics", label: "Analytics", icon: BarChart2 },
  { key: "reports",   label: "Reports",   icon: FileText },
];

export function AdminTopbar({ activeTab, setActiveTab, dark, setDark, onLogout }: AdminTopbarProps) {
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [notifOpen,  setNotifOpen]    = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const unread = notifications.filter((n) => !n.read).length;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-green-950 via-green-900 to-emerald-800 shadow-2xl shadow-green-950/60">
      <div className="flex items-center justify-between px-4 sm:px-6 h-16">

        {/* Logo */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
            <Train className="w-5 h-5 text-emerald-300" />
          </div>
          <div className="hidden sm:block">
            <div className="flex items-center gap-2">
              <span className="text-white font-bold text-base tracking-tight leading-none">Green Metro Rewards</span>
              <span className="hidden xl:flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-400/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold">
                <Shield className="w-3 h-3" /> Admin Panel
              </span>
            </div>
            <span className="text-emerald-400/70 text-xs">Metro Authority Dashboard</span>
          </div>
          <span className="sm:hidden text-white font-bold text-sm">GreenMetro Admin</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center gap-0.5">
          {navItems.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200",
                activeTab === key
                  ? "bg-white/20 text-white shadow-inner"
                  : "text-white/65 hover:text-white hover:bg-white/10"
              )}
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
            </button>
          ))}
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-1.5">
          {/* Dark Mode */}
          <button
            onClick={() => setDark(!dark)}
            className="p-2 rounded-xl text-white/65 hover:text-white hover:bg-white/10 transition-all"
            title="Toggle dark mode"
          >
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); }}
              className="p-2 rounded-xl text-white/65 hover:text-white hover:bg-white/10 transition-all relative"
            >
              <Bell className="w-4 h-4" />
              {unread > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 rounded-full text-[9px] font-bold text-white flex items-center justify-center border border-green-900">
                  {unread}
                </span>
              )}
            </button>
            {notifOpen && (
              <div className={cn(
                "absolute right-0 top-12 w-80 rounded-2xl shadow-2xl border z-50 overflow-hidden",
                dark ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
              )}>
                <div className={cn("flex items-center justify-between px-4 py-3 border-b", dark ? "border-gray-800" : "border-gray-100")}>
                  <span className={cn("font-bold text-sm", dark ? "text-white" : "text-gray-900")}>Notifications</span>
                  <span className="text-xs text-emerald-600 font-semibold cursor-pointer hover:text-emerald-500">Mark all read</span>
                </div>
                {notifications.map((n) => (
                  <div key={n.id} className={cn(
                    "flex gap-3 px-4 py-3 border-b last:border-0 transition-colors cursor-pointer",
                    !n.read ? dark ? "bg-emerald-900/10 hover:bg-emerald-900/20" : "bg-emerald-50/50 hover:bg-emerald-50" : dark ? "hover:bg-gray-800" : "hover:bg-gray-50",
                    dark ? "border-gray-800" : "border-gray-50"
                  )}>
                    <span className="text-xl flex-shrink-0 mt-0.5">
                      {n.type === "trip" ? "🚇" : n.type === "reward" ? "🎁" : n.type === "user" ? "👥" : n.type === "alert" ? "⚠️" : "🔔"}
                    </span>
                    <div className="min-w-0">
                      <p className={cn("text-xs leading-relaxed", dark ? "text-gray-300" : "text-gray-700")}>{n.msg}</p>
                      <p className={cn("text-xs mt-0.5", dark ? "text-gray-600" : "text-gray-400")}>{n.time}</p>
                    </div>
                    {!n.read && <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0 mt-1.5" />}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); }}
              className="flex items-center gap-2 p-1.5 pr-3 rounded-xl text-white/65 hover:text-white hover:bg-white/10 transition-all"
            >
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center">
                <User className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="hidden sm:block text-xs font-semibold text-white/80">Admin</span>
            </button>
            {profileOpen && (
              <div className={cn(
                "absolute right-0 top-12 w-52 rounded-2xl shadow-2xl border z-50 overflow-hidden",
                dark ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
              )}>
                <div className={cn("px-4 py-3 border-b", dark ? "border-gray-800" : "border-gray-100")}>
                  <p className={cn("font-bold text-sm", dark ? "text-white" : "text-gray-900")}>Metro Authority</p>
                  <p className={cn("text-xs", dark ? "text-gray-500" : "text-gray-400")}>admin@greenmetro.gov</p>
                </div>
                {[
                  { label: "Profile Settings", icon: User },
                  { label: "System Settings", icon: Shield },
                ].map((item) => (
                  <button key={item.label} className={cn(
                    "w-full flex items-center gap-2.5 px-4 py-2.5 text-sm transition-all",
                    dark ? "text-gray-300 hover:bg-gray-800" : "text-gray-700 hover:bg-gray-50"
                  )}>
                    <item.icon className="w-3.5 h-3.5" />
                    {item.label}
                  </button>
                ))}
                <div className={cn("border-t", dark ? "border-gray-800" : "border-gray-100")}>
                  <button
                    onClick={onLogout}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-all"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Logout desktop */}
          <button
            onClick={onLogout}
            className="hidden xl:flex items-center gap-1.5 px-3 py-2 rounded-xl text-white/65 hover:text-red-300 hover:bg-red-500/10 transition-all text-xs font-semibold"
          >
            <LogOut className="w-3.5 h-3.5" />
            Logout
          </button>

          {/* Mobile Menu */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="xl:hidden p-2 rounded-xl text-white/65 hover:text-white hover:bg-white/10 transition-all"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="xl:hidden bg-gradient-to-b from-green-950 to-green-900 border-t border-white/10 px-4 py-3 space-y-1">
          {navItems.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => { setActiveTab(key); setMobileOpen(false); }}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all",
                activeTab === key ? "bg-white/20 text-white" : "text-white/65 hover:text-white hover:bg-white/10"
              )}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-300 hover:bg-red-500/10 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      )}
    </header>
  );
}
