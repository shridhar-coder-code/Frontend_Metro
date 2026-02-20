import { Leaf, Users, Train, Gift, TrendingUp } from "lucide-react";
import { adminStats } from "@/data/adminData";
import { cn } from "@/utils/cn";

const icons = [Leaf, Users, Train, Gift];

export function AdminSummaryCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
      {adminStats.map((card, i) => {
        const Icon = icons[i];
        return (
          <div
            key={card.title}
            className={cn(
              "relative overflow-hidden rounded-2xl p-5 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl group cursor-default",
              `bg-gradient-to-br ${card.gradient}`
            )}
          >
            {/* Decorative circles */}
            <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10 group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-white/5" />
            <div className="absolute top-1/2 right-4 w-16 h-16 rounded-full bg-white/5 blur-sm" />

            {/* Icon + badge */}
            <div className="relative z-10 flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/25 flex items-center justify-center shadow-inner">
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-sm border border-white/10">
                <TrendingUp className="w-3 h-3 text-white" />
                <span className="text-white text-xs font-bold">{card.change}</span>
              </div>
            </div>

            {/* Value */}
            <div className="relative z-10">
              <div className="flex items-baseline gap-1.5 mb-1">
                <span className="text-white font-black text-2xl sm:text-3xl leading-none">{card.value}</span>
              </div>
              <p className="text-white/75 text-sm font-semibold">{card.title}</p>
              <p className="text-white/50 text-xs mt-0.5 capitalize">{card.unit}</p>
            </div>

            {/* Progress glow bar */}
            <div className="relative z-10 mt-4">
              <div className="h-1 bg-white/15 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white/50 rounded-full transition-all duration-1000"
                  style={{ width: `${[74, 62, 81, 55][i]}%` }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
