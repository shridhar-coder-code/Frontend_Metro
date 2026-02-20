import { ArrowRight, CheckCircle2, Clock, MapPin } from "lucide-react";
import { recentTrips } from "@/data/dashboardData";
import { cn } from "@/utils/cn";

interface RecentTripsProps {
  dark: boolean;
}

export function RecentTrips({ dark }: RecentTripsProps) {
  return (
    <div className={cn("rounded-2xl shadow-sm border overflow-hidden mb-6", dark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100")}>
      {/* Header */}
      <div className={cn("flex items-center justify-between px-5 py-4 border-b", dark ? "border-gray-800" : "border-gray-100")}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
            <MapPin className="w-4 h-4 text-emerald-600" />
          </div>
          <div>
            <h2 className={cn("font-semibold text-base", dark ? "text-white" : "text-gray-900")}>Recent Trips</h2>
            <p className={cn("text-xs", dark ? "text-gray-500" : "text-gray-400")}>
              Your last {recentTrips.length} metro journeys
            </p>
          </div>
        </div>
        <button className="text-emerald-600 text-sm font-semibold hover:text-emerald-500 transition-colors flex items-center gap-1">
          View All <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className={cn("text-left text-xs font-semibold uppercase tracking-wider", dark ? "bg-gray-800/50 text-gray-500" : "bg-gray-50 text-gray-400")}>
              <th className="px-5 py-3.5">Date</th>
              <th className="px-5 py-3.5">From</th>
              <th className="px-5 py-3.5">To</th>
              <th className="px-5 py-3.5">Distance</th>
              <th className="px-5 py-3.5">CO₂ Saved</th>
              <th className="px-5 py-3.5">Points Earned</th>
              <th className="px-5 py-3.5">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentTrips.map((trip) => (
              <tr
                key={trip.id}
                className={cn(
                  "border-t transition-colors duration-150",
                  dark ? "border-gray-800 hover:bg-gray-800/50" : "border-gray-50 hover:bg-emerald-50/50"
                )}
              >
                <td className={cn("px-5 py-4 text-sm", dark ? "text-gray-400" : "text-gray-500")}>{trip.date}</td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
                    <span className={cn("text-sm font-medium", dark ? "text-white" : "text-gray-900")}>{trip.from}</span>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
                    <span className={cn("text-sm font-medium", dark ? "text-white" : "text-gray-900")}>{trip.to}</span>
                  </div>
                </td>
                <td className={cn("px-5 py-4 text-sm", dark ? "text-gray-400" : "text-gray-500")}>{trip.distance}</td>
                <td className="px-5 py-4">
                  <span className={cn("inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold", dark ? "bg-blue-900/40 text-blue-300" : "bg-blue-50 text-blue-700")}>
                    🌿 {trip.co2Saved}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <span className={cn("inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold", dark ? "bg-emerald-900/40 text-emerald-400" : "bg-emerald-50 text-emerald-700")}>
                    ⭐ +{trip.pointsEarned} pts
                  </span>
                </td>
                <td className="px-5 py-4">
                  {trip.status === "Verified" ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">
                      <CheckCircle2 className="w-3 h-3" /> Verified
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-700">
                      <Clock className="w-3 h-3" /> Pending
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden divide-y divide-gray-100">
        {recentTrips.map((trip) => (
          <div key={trip.id} className={cn("p-4", dark ? "hover:bg-gray-800/50" : "hover:bg-emerald-50/30")}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className={cn("text-sm font-semibold", dark ? "text-white" : "text-gray-900")}>{trip.from}</span>
                <ArrowRight className={cn("w-3.5 h-3.5", dark ? "text-gray-600" : "text-gray-400")} />
                <span className={cn("text-sm font-semibold", dark ? "text-white" : "text-gray-900")}>{trip.to}</span>
              </div>
              {trip.status === "Verified"
                ? <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">✓</span>
                : <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-orange-100 text-orange-700">⏳</span>}
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className={dark ? "text-gray-500" : "text-gray-400"}>{trip.date}</span>
              <span className="text-blue-600 font-semibold">🌿 {trip.co2Saved}</span>
              <span className="text-emerald-600 font-bold">⭐ +{trip.pointsEarned} pts</span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className={cn("px-5 py-3 border-t text-center", dark ? "border-gray-800" : "border-gray-100")}>
        <button className="text-emerald-600 text-sm font-semibold hover:text-emerald-500 transition-colors inline-flex items-center gap-1.5">
          View All Trips <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
