import { useState } from "react";
import { Gift, Star, CheckCircle2 } from "lucide-react";
import { rewards } from "@/data/dashboardData";
import { cn } from "@/utils/cn";

interface RewardsSectionProps {
  dark: boolean;
  userPoints?: number;
}

export function RewardsSection({ dark, userPoints = 120 }: RewardsSectionProps) {
  const [redeemed, setRedeemed] = useState<number[]>([]);
  const [redeeming, setRedeeming] = useState<number | null>(null);

  const handleRedeem = async (id: number, points: number) => {
    if (userPoints < points || redeemed.includes(id)) return;
    setRedeeming(id);
    await new Promise((r) => setTimeout(r, 1200));
    setRedeeming(null);
    setRedeemed((prev) => [...prev, id]);
  };

  return (
    <div className={cn("rounded-2xl shadow-sm border overflow-hidden", dark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100")}>
      {/* Header */}
      <div className={cn("flex items-center justify-between px-5 py-4 border-b", dark ? "border-gray-800" : "border-gray-100")}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-yellow-100 flex items-center justify-center">
            <Gift className="w-4 h-4 text-yellow-600" />
          </div>
          <div>
            <h2 className={cn("font-semibold text-base", dark ? "text-white" : "text-gray-900")}>Rewards</h2>
            <p className={cn("text-xs", dark ? "text-gray-500" : "text-gray-400")}>Redeem your GreenPoints</p>
          </div>
        </div>
        <div className={cn("flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-bold", dark ? "bg-yellow-900/30 text-yellow-400" : "bg-yellow-50 text-yellow-700")}>
          <Star className="w-4 h-4 fill-current" />
          {userPoints} pts
        </div>
      </div>

      {/* Rewards Grid */}
      <div className="p-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {rewards.map((reward) => {
          const isRedeemed = redeemed.includes(reward.id);
          const isRedeeming = redeeming === reward.id;
          const canRedeem = userPoints >= reward.points && !isRedeemed;

          return (
            <div
              key={reward.id}
              className={cn(
                "relative rounded-2xl border overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group",
                dark ? "border-gray-800 bg-gray-800" : "border-gray-100 bg-gray-50",
                isRedeemed && "opacity-75"
              )}
            >
              {/* Banner */}
              <div className={cn("h-24 flex items-center justify-center bg-gradient-to-br relative overflow-hidden", reward.color)}>
                <div className="absolute inset-0 bg-white/5" />
                <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-white/10 group-hover:scale-150 transition-transform duration-500" />
                <span className="text-5xl relative z-10 group-hover:scale-110 transition-transform duration-300">
                  {reward.emoji}
                </span>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className={cn("font-bold text-base mb-0.5", dark ? "text-white" : "text-gray-900")}>{reward.title}</h3>
                <p className={cn("text-xs mb-3", dark ? "text-gray-500" : "text-gray-400")}>{reward.description}</p>

                <div className="flex items-center justify-between mb-3">
                  <div className={cn("inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold", dark ? "bg-yellow-900/30 text-yellow-400" : "bg-yellow-50 text-yellow-700")}>
                    <Star className="w-3 h-3 fill-current" />
                    {reward.points} Points
                  </div>
                  {!canRedeem && !isRedeemed && (
                    <span className={cn("text-xs", dark ? "text-gray-600" : "text-gray-400")}>
                      Need {reward.points - userPoints} more
                    </span>
                  )}
                </div>

                <button
                  onClick={() => handleRedeem(reward.id, reward.points)}
                  disabled={!canRedeem || isRedeeming}
                  className={cn(
                    "w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2",
                    isRedeemed
                      ? "bg-emerald-100 text-emerald-700 cursor-default"
                      : canRedeem
                      ? "bg-gradient-to-r from-emerald-500 to-green-500 text-white hover:shadow-md hover:shadow-emerald-500/30 hover:-translate-y-0.5"
                      : dark ? "bg-gray-700 text-gray-500 cursor-not-allowed" : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  )}
                >
                  {isRedeeming ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Redeeming…
                    </>
                  ) : isRedeemed ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      Redeemed!
                    </>
                  ) : (
                    "Redeem Now"
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
