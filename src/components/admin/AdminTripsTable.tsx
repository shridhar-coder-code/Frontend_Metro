import { useState } from "react";
import {
  Map, Eye, CheckCircle, XCircle, ChevronUp, ChevronDown,
  Search, Filter, Download, Clock, X, Train, Leaf
} from "lucide-react";
import { adminTrips } from "@/data/adminData";
import { cn } from "@/utils/cn";

interface AdminTripsTableProps {
  dark: boolean;
}

type SortKey = "user" | "date" | "from" | "co2" | "points" | "status";
type Trip = (typeof adminTrips)[0] & { status: string };

interface TripDetailModalProps {
  trip: Trip | null;
  onClose: () => void;
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
  dark: boolean;
}

function TripDetailModal({ trip, onClose, onApprove, onReject, dark }: TripDetailModalProps) {
  const [loading, setLoading] = useState<"approve" | "reject" | null>(null);

  if (!trip) return null;

  const handleAction = async (action: "approve" | "reject") => {
    setLoading(action);
    await new Promise((r) => setTimeout(r, 1200));
    if (action === "approve") onApprove(trip.id);
    else onReject(trip.id);
    setLoading(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className={cn(
        "relative w-full max-w-lg rounded-3xl shadow-2xl animate-slide-up overflow-hidden",
        dark ? "bg-gray-900 border border-gray-700" : "bg-white"
      )}>
        {/* Header */}
        <div className="bg-gradient-to-r from-green-900 to-emerald-800 px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center">
              <Train className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-white font-bold text-base">Trip Details</h2>
              <p className="text-white/60 text-xs">#{trip.id.toString().padStart(6, "0")}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-all">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {/* User */}
          <div className={cn("flex items-center gap-3 p-4 rounded-2xl mb-5", dark ? "bg-gray-800" : "bg-gray-50")}>
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
              {trip.avatar}
            </div>
            <div>
              <p className={cn("font-bold text-sm", dark ? "text-white" : "text-gray-900")}>{trip.user}</p>
              <p className={cn("text-xs", dark ? "text-gray-400" : "text-gray-500")}>{trip.date}</p>
            </div>
            <div className="ml-auto">
              <span className={cn(
                "px-3 py-1.5 rounded-xl text-xs font-bold",
                trip.status === "Approved" ? "bg-emerald-100 text-emerald-700" :
                trip.status === "Rejected" ? "bg-red-100 text-red-700" :
                "bg-amber-100 text-amber-700"
              )}>
                {trip.status}
              </span>
            </div>
          </div>

          {/* Ticket (mock) */}
          <div className={cn("rounded-2xl overflow-hidden mb-5 border", dark ? "border-gray-700" : "border-gray-200")}>
            <div className="bg-gradient-to-br from-green-900 to-emerald-800 p-5 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <Train className="w-4 h-4 text-emerald-300" />
                  <span className="text-emerald-300 text-xs font-semibold uppercase tracking-wider">Metro Ticket</span>
                  {trip.ticket ? (
                    <span className="ml-auto px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 text-xs">✓ Uploaded</span>
                  ) : (
                    <span className="ml-auto px-2 py-0.5 rounded-full bg-white/10 text-white/50 text-xs">No ticket</span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <div>
                    <p className="text-white/60 text-xs">From</p>
                    <p className="text-white font-bold text-lg">{trip.from}</p>
                  </div>
                  <div className="flex-1 flex items-center gap-1 px-2">
                    <div className="flex-1 border-t-2 border-dashed border-white/20" />
                    <Train className="w-4 h-4 text-white/40" />
                    <div className="flex-1 border-t-2 border-dashed border-white/20" />
                  </div>
                  <div className="text-right">
                    <p className="text-white/60 text-xs">To</p>
                    <p className="text-white font-bold text-lg">{trip.to}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { label: "Distance", value: trip.distance, emoji: "📍", color: dark ? "bg-blue-900/30 text-blue-300" : "bg-blue-50 text-blue-700" },
              { label: "CO₂ Saved", value: trip.co2, emoji: "🌿", color: dark ? "bg-emerald-900/30 text-emerald-300" : "bg-emerald-50 text-emerald-700" },
              { label: "Points", value: `+${trip.points}`, emoji: "⭐", color: dark ? "bg-yellow-900/30 text-yellow-300" : "bg-yellow-50 text-yellow-700" },
            ].map((s) => (
              <div key={s.label} className={cn("rounded-2xl p-3 text-center", s.color)}>
                <span className="text-xl block mb-1">{s.emoji}</span>
                <p className="font-bold text-sm">{s.value}</p>
                <p className="text-xs opacity-70 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Actions */}
          {trip.status === "Pending" && (
            <div className="flex gap-3">
              <button
                onClick={() => handleAction("reject")}
                disabled={loading !== null}
                className={cn(
                  "flex-1 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all border",
                  dark ? "border-gray-700 text-gray-300 hover:bg-red-900/20 hover:border-red-800 hover:text-red-300" : "border-gray-200 text-gray-700 hover:bg-red-50 hover:border-red-200 hover:text-red-600",
                  loading === "reject" && "opacity-70 cursor-not-allowed"
                )}
              >
                {loading === "reject" ? (
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                ) : <XCircle className="w-4 h-4" />}
                Reject
              </button>
              <button
                onClick={() => handleAction("approve")}
                disabled={loading !== null}
                className={cn(
                  "flex-1 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5",
                  loading === "approve" && "opacity-70 cursor-not-allowed"
                )}
              >
                {loading === "approve" ? (
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                ) : <CheckCircle className="w-4 h-4" />}
                Approve
              </button>
            </div>
          )}
          {trip.status !== "Pending" && (
            <button onClick={onClose} className={cn(
              "w-full py-3 rounded-xl text-sm font-bold transition-all",
              dark ? "bg-gray-800 text-gray-300 hover:bg-gray-700" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            )}>
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export function AdminTripsTable({ dark }: AdminTripsTableProps) {
  const [trips, setTrips] = useState<Trip[]>(adminTrips.map((t) => ({ ...t })));
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortAsc, setSortAsc] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortAsc(!sortAsc);
    else { setSortKey(key); setSortAsc(true); }
  };

  const handleApprove = (id: number) =>
    setTrips((prev) => prev.map((t) => t.id === id ? { ...t, status: "Approved" } : t));
  const handleReject = (id: number) =>
    setTrips((prev) => prev.map((t) => t.id === id ? { ...t, status: "Rejected" } : t));

  const filtered = trips
    .filter((t) => {
      const q = search.toLowerCase();
      return (
        (t.user.toLowerCase().includes(q) || t.from.toLowerCase().includes(q) || t.to.toLowerCase().includes(q)) &&
        (statusFilter === "All" || t.status === statusFilter)
      );
    })
    .sort((a, b) => {
      let av: string | number = "", bv: string | number = "";
      if (sortKey === "user") { av = a.user; bv = b.user; }
      else if (sortKey === "date") { av = a.date; bv = b.date; }
      else if (sortKey === "from") { av = a.from; bv = b.from; }
      else if (sortKey === "co2") { av = parseFloat(a.co2); bv = parseFloat(b.co2); }
      else if (sortKey === "points") { av = a.points; bv = b.points; }
      else if (sortKey === "status") { av = a.status; bv = b.status; }
      if (av < bv) return sortAsc ? -1 : 1;
      if (av > bv) return sortAsc ? 1 : -1;
      return 0;
    });

  const SortIcon = ({ k }: { k: SortKey }) =>
    sortKey === k ? (
      sortAsc ? <ChevronUp className="w-3 h-3 text-emerald-500 inline ml-1" /> : <ChevronDown className="w-3 h-3 text-emerald-500 inline ml-1" />
    ) : <ChevronUp className="w-3 h-3 opacity-20 inline ml-1" />;

  return (
    <>
      <div className={cn("rounded-2xl border shadow-sm overflow-hidden mb-6", dark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100")}>
        {/* Header */}
        <div className={cn("flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-5 py-4 border-b", dark ? "border-gray-800" : "border-gray-100")}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-700 to-emerald-600 flex items-center justify-center">
              <Map className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className={cn("font-bold text-base", dark ? "text-white" : "text-gray-900")}>Trip Management</h2>
              <p className={cn("text-xs", dark ? "text-gray-500" : "text-gray-400")}>{filtered.length} trips · Click row to view details</p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {/* Search */}
            <div className={cn("flex items-center gap-2 px-3 py-2 rounded-xl border text-sm", dark ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200")}>
              <Search className={cn("w-3.5 h-3.5", dark ? "text-gray-500" : "text-gray-400")} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search trips…"
                className={cn("bg-transparent outline-none text-xs w-28", dark ? "text-white placeholder-gray-600" : "text-gray-900 placeholder-gray-400")}
              />
            </div>
            {/* Filter */}
            <div className={cn("flex items-center gap-1 px-2 py-2 rounded-xl border", dark ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-gray-50")}>
              <Filter className={cn("w-3.5 h-3.5", dark ? "text-gray-500" : "text-gray-400")} />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className={cn("bg-transparent outline-none text-xs font-semibold", dark ? "text-gray-300" : "text-gray-700")}
              >
                {["All", "Approved", "Pending", "Rejected"].map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
            {/* Export */}
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-500 transition-all">
              <Download className="w-3.5 h-3.5" />
              Export
            </button>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={cn("text-left text-xs font-bold uppercase tracking-wider", dark ? "bg-gray-800/60 text-gray-500" : "bg-gray-50 text-gray-400")}>
                {[
                  { label: "User", k: "user" as SortKey },
                  { label: "Date", k: "date" as SortKey },
                  { label: "From → To", k: "from" as SortKey },
                  { label: "Distance", k: null },
                  { label: "CO₂ Saved", k: "co2" as SortKey },
                  { label: "Points", k: "points" as SortKey },
                  { label: "Status", k: "status" as SortKey },
                  { label: "Actions", k: null },
                ].map(({ label, k }) => (
                  <th
                    key={label}
                    onClick={() => k && handleSort(k)}
                    className={cn("px-4 py-3.5 whitespace-nowrap", k && "cursor-pointer hover:text-emerald-600 transition-colors select-none")}
                  >
                    {label}{k && <SortIcon k={k} />}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((trip) => (
                <tr
                  key={trip.id}
                  onClick={() => setSelectedTrip(trip)}
                  className={cn(
                    "border-t transition-all duration-150 cursor-pointer",
                    dark ? "border-gray-800 hover:bg-gray-800/50" : "border-gray-50 hover:bg-emerald-50/40"
                  )}
                >
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {trip.avatar}
                      </div>
                      <span className={cn("text-sm font-semibold", dark ? "text-white" : "text-gray-900")}>{trip.user}</span>
                    </div>
                  </td>
                  <td className={cn("px-4 py-4 text-xs whitespace-nowrap", dark ? "text-gray-400" : "text-gray-500")}>{trip.date}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2 text-xs">
                      <span className={cn("font-semibold", dark ? "text-white" : "text-gray-900")}>{trip.from}</span>
                      <span className={dark ? "text-gray-600" : "text-gray-300"}>→</span>
                      <span className={cn("font-semibold", dark ? "text-white" : "text-gray-900")}>{trip.to}</span>
                    </div>
                  </td>
                  <td className={cn("px-4 py-4 text-xs", dark ? "text-gray-400" : "text-gray-500")}>{trip.distance}</td>
                  <td className="px-4 py-4">
                    <span className={cn("inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold", dark ? "bg-blue-900/30 text-blue-300" : "bg-blue-50 text-blue-700")}>
                      <Leaf className="w-3 h-3" />{trip.co2}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={cn("inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold", dark ? "bg-yellow-900/30 text-yellow-300" : "bg-yellow-50 text-yellow-700")}>
                      ⭐ +{trip.points}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={cn(
                      "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold",
                      trip.status === "Approved" ? "bg-emerald-100 text-emerald-700" :
                      trip.status === "Rejected" ? "bg-red-100 text-red-600" :
                      "bg-amber-100 text-amber-700"
                    )}>
                      {trip.status === "Approved" ? <CheckCircle className="w-3 h-3" /> : trip.status === "Rejected" ? <XCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                      {trip.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => setSelectedTrip(trip)}
                        className={cn("p-1.5 rounded-lg transition-all text-xs", dark ? "hover:bg-gray-700 text-gray-400 hover:text-white" : "hover:bg-gray-100 text-gray-500 hover:text-gray-800")}
                        title="View"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      {trip.status === "Pending" && (
                        <>
                          <button
                            onClick={() => handleApprove(trip.id)}
                            className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 transition-all"
                            title="Approve"
                          >
                            <CheckCircle className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleReject(trip.id)}
                            className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-all"
                            title="Reject"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden divide-y divide-gray-100">
          {filtered.map((trip) => (
            <div
              key={trip.id}
              onClick={() => setSelectedTrip(trip)}
              className={cn("p-4 cursor-pointer transition-colors", dark ? "hover:bg-gray-800/50 border-gray-800" : "hover:bg-emerald-50/30")}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center text-white text-xs font-bold">
                    {trip.avatar}
                  </div>
                  <span className={cn("font-semibold text-sm", dark ? "text-white" : "text-gray-900")}>{trip.user}</span>
                </div>
                <span className={cn(
                  "px-2 py-0.5 rounded-full text-xs font-bold",
                  trip.status === "Approved" ? "bg-emerald-100 text-emerald-700" :
                  trip.status === "Rejected" ? "bg-red-100 text-red-600" :
                  "bg-amber-100 text-amber-700"
                )}>{trip.status}</span>
              </div>
              <div className={cn("text-xs flex items-center gap-2", dark ? "text-gray-400" : "text-gray-500")}>
                <span>{trip.from} → {trip.to}</span>
                <span>·</span>
                <span className="text-emerald-600 font-semibold">🌿 {trip.co2}</span>
                <span className="text-yellow-600 font-bold">⭐ +{trip.points}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trip detail modal */}
      <TripDetailModal
        trip={selectedTrip}
        onClose={() => setSelectedTrip(null)}
        onApprove={handleApprove}
        onReject={handleReject}
        dark={dark}
      />
    </>
  );
}
