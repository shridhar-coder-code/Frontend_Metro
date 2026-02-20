import { useState } from "react";
import {
  LayoutDashboard, Users, Map, Gift, BarChart2,
  FileText, Settings, ChevronRight
} from "lucide-react";
import { cn } from "@/utils/cn";

interface AdminSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  dark: boolean;
}

const sideItems = [
  { key: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { key: "users",     icon: Users,           label: "Users" },
  { key: "trips",     icon: Map,             label: "Trips" },
  { key: "rewards",   icon: Gift,            label: "Rewards" },
  { key: "analytics", icon: BarChart2,       label: "Analytics" },
  { key: "reports",   icon: FileText,        label: "Reports" },
  { key: "settings",  icon: Settings,        label: "Settings" },
];

export function AdminSidebar({ activeTab, setActiveTab, dark }: AdminSidebarProps) {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <aside className={cn(
      "hidden lg:flex flex-col fixed left-0 top-16 bottom-0 z-40 transition-all duration-300 ease-in-out overflow-hidden",
      dark ? "bg-gray-900 border-r border-gray-800" : "bg-white border-r border-gray-200",
      collapsed ? "w-16" : "w-56"
    )}>
      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className={cn(
          "flex items-center justify-center w-10 h-10 mx-auto mt-3 mb-2 rounded-xl transition-all",
          dark ? "hover:bg-gray-800 text-gray-400" : "hover:bg-gray-100 text-gray-500"
        )}
      >
        <ChevronRight className={cn("w-4 h-4 transition-transform duration-300", !collapsed && "rotate-180")} />
      </button>

      <nav className="flex flex-col gap-1 px-2 flex-1">
        {sideItems.map(({ key, icon: Icon, label }) => {
          const isActive = activeTab === key;
          return (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              title={collapsed ? label : ""}
              className={cn(
                "relative flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group overflow-hidden",
                isActive
                  ? "bg-gradient-to-r from-green-800 to-emerald-700 text-white shadow-md"
                  : dark
                  ? "text-gray-400 hover:bg-gray-800 hover:text-white"
                  : "text-gray-500 hover:bg-emerald-50 hover:text-emerald-700"
              )}
            >
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-emerald-300/60 rounded-r-full" />
              )}
              <Icon className={cn("w-5 h-5 flex-shrink-0", isActive ? "text-white" : "")} />
              {!collapsed && (
                <span className={cn("text-sm font-semibold whitespace-nowrap", isActive ? "text-white" : "")}>
                  {label}
                </span>
              )}
              {/* Tooltip */}
              {collapsed && (
                <div className={cn(
                  "absolute left-full ml-2 px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 translate-x-1 group-hover:translate-x-0 z-50",
                  dark ? "bg-gray-700 text-white" : "bg-gray-900 text-white"
                )}>
                  {label}
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom badge */}
      <div className="px-2 pb-4">
        <div className={cn("rounded-xl p-3 text-center", dark ? "bg-gray-800" : "bg-green-50")}>
          {collapsed ? (
            <span className="text-lg">🛡️</span>
          ) : (
            <div>
              <span className="text-xl">🛡️</span>
              <p className={cn("text-xs font-bold mt-1", dark ? "text-gray-300" : "text-green-800")}>Authority</p>
              <p className={cn("text-xs", dark ? "text-gray-600" : "text-green-600")}>Admin Access</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
