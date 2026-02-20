import { useState } from "react";
import { Home, PlusCircle, Wallet, Gift, ChevronRight } from "lucide-react";
import { cn } from "@/utils/cn";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onAddTrip: () => void;
  dark: boolean;
}

const sideItems = [
  { key: "home", icon: Home, label: "Home" },
  { key: "add-trip", icon: PlusCircle, label: "Add Trip" },
  { key: "wallet", icon: Wallet, label: "Wallet" },
  { key: "rewards", icon: Gift, label: "Rewards" },
];

export function Sidebar({ activeTab, setActiveTab, onAddTrip, dark }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(true);

  const handleClick = (key: string) => {
    if (key === "add-trip") { onAddTrip(); return; }
    setActiveTab(key);
  };

  return (
    <aside
      className={cn(
        "hidden lg:flex flex-col fixed left-0 top-16 bottom-0 z-40 transition-all duration-300 ease-in-out overflow-hidden",
        dark ? "bg-gray-900 border-r border-gray-800" : "bg-white border-r border-gray-200",
        collapsed ? "w-16" : "w-52"
      )}
    >
      {/* Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className={cn(
          "flex items-center justify-center h-10 mx-auto mt-3 mb-2 rounded-xl transition-all duration-200 w-10",
          dark ? "hover:bg-gray-800 text-gray-400" : "hover:bg-gray-100 text-gray-500"
        )}
        title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        <ChevronRight className={cn("w-4 h-4 transition-transform duration-300", !collapsed && "rotate-180")} />
      </button>

      <nav className="flex flex-col gap-1 px-2 flex-1">
        {sideItems.map(({ key, icon: Icon, label }) => {
          const isActive = activeTab === key;
          return (
            <button
              key={key}
              onClick={() => handleClick(key)}
              title={collapsed ? label : ""}
              className={cn(
                "relative flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group overflow-hidden",
                isActive
                  ? "bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-md shadow-emerald-500/25"
                  : dark
                  ? "text-gray-400 hover:bg-gray-800 hover:text-white"
                  : "text-gray-500 hover:bg-emerald-50 hover:text-emerald-700"
              )}
            >
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-white/50 rounded-r-full" />
              )}
              <Icon className={cn("w-5 h-5 flex-shrink-0", isActive ? "text-white" : "")} />
              {!collapsed && (
                <span className={cn("text-sm font-medium whitespace-nowrap", isActive ? "text-white" : "")}>
                  {label}
                </span>
              )}
              {/* Tooltip */}
              {collapsed && (
                <div className={cn(
                  "absolute left-full ml-2 px-2.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 translate-x-1 group-hover:translate-x-0 z-50",
                  dark ? "bg-gray-700 text-white" : "bg-gray-900 text-white"
                )}>
                  {label}
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom eco badge */}
      <div className="px-3 pb-4">
        <div className={cn("rounded-xl p-3 text-center", dark ? "bg-gray-800" : "bg-emerald-50")}>
          {collapsed ? (
            <span className="text-lg">🌿</span>
          ) : (
            <div>
              <span className="text-lg">🌿</span>
              <p className={cn("text-xs font-medium mt-1", dark ? "text-gray-400" : "text-emerald-700")}>Eco Mode</p>
              <p className={cn("text-xs mt-0.5", dark ? "text-gray-600" : "text-emerald-500")}>Active</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
