import { useState } from "react";
import {
  Train, Leaf, Home, PlusCircle, Wallet, Gift,
  User, LogOut, Menu, X, Bell, Moon, Sun
} from "lucide-react";
import { cn } from "@/utils/cn";

interface TopbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onAddTrip: () => void;
  dark: boolean;
  setDark: (v: boolean) => void;
  role?: "user" | "admin";
  onLogout?: () => void;
}

const navItems = [
  { key: "home", label: "Home", icon: Home },
  { key: "add-trip", label: "Add Trip", icon: PlusCircle },
  { key: "wallet", label: "Wallet", icon: Wallet },
  { key: "rewards", label: "Rewards", icon: Gift },
  { key: "profile", label: "Profile", icon: User },
];

export function Topbar({ activeTab, setActiveTab, onAddTrip, dark, setDark, onLogout }: TopbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const handleNav = (key: string) => {
    if (key === "add-trip") { onAddTrip(); setMobileOpen(false); return; }
    setActiveTab(key);
    setMobileOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-green-900 via-emerald-800 to-teal-800 shadow-2xl shadow-emerald-900/40">
      <div className="flex items-center justify-between px-4 sm:px-6 h-16">

        {/* Logo */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-white/15 border border-white/25 flex items-center justify-center">
            <Train className="w-5 h-5 text-emerald-300" />
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-white font-bold text-lg tracking-tight">Green Metro</span>
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-400/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold">
              <Leaf className="w-3 h-3" />
              Rewards
            </span>
          </div>
          <span className="sm:hidden text-white font-bold text-base">GreenMetro</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => handleNav(key)}
              className={cn(
                "flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                activeTab === key
                  ? "bg-white/20 text-white shadow-inner"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              )}
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          {/* Dark mode */}
          <button
            onClick={() => setDark(!dark)}
            className="p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200"
            title="Toggle dark mode"
          >
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200 relative"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-400 rounded-full border border-emerald-800" />
            </button>
            {notifOpen && (
              <div
                className={cn(
                  "absolute right-0 top-12 w-72 rounded-2xl shadow-2xl border p-4 z-50",
                  dark ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
                )}
              >
                <p className={cn("font-semibold text-sm mb-3", dark ? "text-white" : "text-gray-900")}>Notifications</p>
                {[
                  { msg: "Trip verified! +35 GreenPoints earned", time: "2m ago", dot: "bg-emerald-500" },
                  { msg: "New reward: Free Coffee unlocked!", time: "1h ago", dot: "bg-yellow-400" },
                  { msg: "Your carbon saved hit 18,000 kg!", time: "2h ago", dot: "bg-blue-500" },
                ].map((n, i) => (
                  <div key={i} className={cn("flex gap-3 py-2.5 border-b last:border-0", dark ? "border-gray-800" : "border-gray-100")}>
                    <span className={cn("w-2 h-2 rounded-full mt-1.5 flex-shrink-0", n.dot)} />
                    <div>
                      <p className={cn("text-xs leading-relaxed", dark ? "text-gray-300" : "text-gray-700")}>{n.msg}</p>
                      <p className={cn("text-xs mt-0.5", dark ? "text-gray-600" : "text-gray-400")}>{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Logout – desktop */}
          <button
            onClick={onLogout}
            className="hidden lg:flex items-center gap-2 px-3.5 py-2 rounded-xl text-white/70 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200 text-sm font-medium"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="lg:hidden bg-gradient-to-b from-emerald-900 to-green-900 border-t border-white/10 px-4 py-3 space-y-1">
          {navItems.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => handleNav(key)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                activeTab === key ? "bg-white/20 text-white" : "text-white/70 hover:text-white hover:bg-white/10"
              )}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-300 hover:bg-red-500/10 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      )}
    </header>
  );
}
