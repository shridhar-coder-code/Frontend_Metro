import { Leaf, Star, Train, TrendingUp } from "lucide-react";
import { summaryCards } from "@/data/dashboardData";
import { cn } from "@/utils/cn";

const icons = [Leaf, Star, Train];

export function SummaryCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      {summaryCards.map((card, i) => {
        const Icon = icons[i];
        return (
          <div
            key={card.title}
            className={cn(
              "relative overflow-hidden rounded-2xl p-5 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group cursor-default",
              `bg-gradient-to-br ${card.gradient}`
            )}
          >
            {/* Decorative circles */}
            <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full bg-white/10 group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full bg-white/5" />

            {/* Icon + change badge */}
            <div className="relative z-10 flex items-center justify-between mb-4">
              <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm border border-white/20">
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-sm">
                <TrendingUp className="w-3 h-3 text-white" />
                <span className="text-white text-xs font-semibold">{card.change}</span>
              </div>
            </div>

            {/* Value */}
            <div className="relative z-10">
              <div className="flex items-baseline gap-1.5">
                <span className="text-white font-bold text-3xl leading-none">{card.value}</span>
                <span className="text-white/80 text-sm font-medium">{card.unit}</span>
              </div>
              <p className="text-white/70 text-sm mt-1.5 font-medium">{card.title}</p>
            </div>

            {/* Progress bar */}
            <div className="relative z-10 mt-4">
              <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white/60 rounded-full"
                  style={{ width: i === 0 ? "73%" : i === 1 ? "48%" : "56%" }}
                />
              </div>
              <p className="text-white/50 text-xs mt-1">
                {i === 0 ? "73% of annual goal" : i === 1 ? "48 more to next reward" : "This month"}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
