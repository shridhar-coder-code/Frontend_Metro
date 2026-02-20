import { useState, useRef } from "react";
import {
  X, Upload, MapPin, Calendar, CheckCircle2,
  ArrowRight, PlusCircle, Home, FileImage
} from "lucide-react";
import { stations } from "@/data/dashboardData";
import { cn } from "@/utils/cn";

interface AddTripModalProps {
  open: boolean;
  onClose: () => void;
  dark: boolean;
}

interface SuccessData {
  distance: string;
  co2: string;
  points: number;
  from: string;
  to: string;
}

export function AddTripModal({ open, onClose, dark }: AddTripModalProps) {
  const [step, setStep] = useState<"form" | "success">("form");
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successData, setSuccessData] = useState<SuccessData | null>(null);
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (f: File) => {
    setFile(f);
    if (f.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => setFilePreview(e.target?.result as string);
      reader.readAsDataURL(f);
    } else {
      setFilePreview(null);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!from) e.from = "Select source station";
    if (!to) e.to = "Select destination station";
    if (from && to && from === to) e.to = "Source and destination must differ";
    if (!date) e.date = "Select a date";
    if (!time) e.time = "Select a time";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSubmitting(true);
    if (file) {
      setUploading(true);
      await new Promise((r) => setTimeout(r, 800));
      setUploading(false);
    }
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitting(false);
    const dist = (Math.random() * 12 + 2).toFixed(1);
    const co2 = (parseFloat(dist) * 0.2).toFixed(2);
    const pts = Math.floor(parseFloat(dist) * 3.5);
    setSuccessData({ distance: `${dist} km`, co2: `${co2} kg`, points: pts, from, to });
    setStep("success");
  };

  const handleReset = () => {
    setStep("form");
    setFile(null);
    setFilePreview(null);
    setFrom("");
    setTo("");
    setDate("");
    setTime("");
    setErrors({});
    setSuccessData(null);
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />

      {/* Modal */}
      <div className={cn(
        "relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl animate-slide-up",
        dark ? "bg-gray-900 border border-gray-800" : "bg-white"
      )}>
        {step === "form" ? (
          <>
            {/* Header */}
            <div className={cn("flex items-center justify-between px-6 py-5 border-b", dark ? "border-gray-800" : "border-gray-100")}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center shadow-md">
                  <PlusCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className={cn("font-bold text-lg", dark ? "text-white" : "text-gray-900")}>Add Metro Trip</h2>
                  <p className={cn("text-xs", dark ? "text-gray-500" : "text-gray-400")}>Upload your ticket and earn GreenPoints</p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className={cn("p-2 rounded-xl transition-all", dark ? "hover:bg-gray-800 text-gray-400" : "hover:bg-gray-100 text-gray-500")}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Left: Upload */}
                <div className={cn("p-6 border-b md:border-b-0 md:border-r", dark ? "border-gray-800" : "border-gray-100")}>
                  <h3 className={cn("font-semibold text-sm mb-4 flex items-center gap-2", dark ? "text-gray-300" : "text-gray-700")}>
                    <FileImage className="w-4 h-4 text-emerald-500" />
                    Upload Metro Ticket
                  </h3>

                  <div
                    onClick={() => fileRef.current?.click()}
                    onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={handleDrop}
                    className={cn(
                      "relative border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all duration-200 min-h-[200px]",
                      dragging ? "border-emerald-500 bg-emerald-50 scale-[1.01]"
                        : file ? "border-emerald-400 bg-emerald-50/50"
                        : dark ? "border-gray-700 hover:border-emerald-600 hover:bg-emerald-900/10"
                        : "border-gray-200 hover:border-emerald-400 hover:bg-emerald-50/50"
                    )}
                  >
                    <input
                      ref={fileRef}
                      type="file"
                      accept=".jpg,.jpeg,.png,.pdf"
                      className="hidden"
                      onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                    />

                    {filePreview ? (
                      <div className="relative w-full">
                        <img src={filePreview} alt="Ticket preview" className="w-full h-32 object-cover rounded-xl" />
                        <div className="absolute inset-0 bg-black/20 rounded-xl flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <span className="text-white text-xs font-semibold">Click to change</span>
                        </div>
                      </div>
                    ) : file ? (
                      <div className="text-center">
                        <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                          <FileImage className="w-6 h-6 text-emerald-600" />
                        </div>
                        <p className={cn("text-sm font-semibold", dark ? "text-emerald-400" : "text-emerald-700")}>{file.name}</p>
                        <p className={cn("text-xs mt-1", dark ? "text-gray-500" : "text-gray-400")}>{(file.size / 1024).toFixed(0)} KB · Click to change</p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3", dark ? "bg-gray-800" : "bg-gray-100")}>
                          <Upload className={cn("w-7 h-7", dark ? "text-gray-500" : "text-gray-400")} />
                        </div>
                        <p className={cn("text-sm font-semibold mb-1", dark ? "text-gray-300" : "text-gray-700")}>Drop ticket here</p>
                        <p className={cn("text-xs", dark ? "text-gray-600" : "text-gray-400")}>or click to browse</p>
                        <div className="flex items-center gap-1.5 justify-center mt-3">
                          {["JPG", "PNG", "PDF"].map((f) => (
                            <span key={f} className={cn("px-2 py-0.5 rounded text-xs font-medium", dark ? "bg-gray-800 text-gray-400" : "bg-gray-100 text-gray-500")}>{f}</span>
                          ))}
                        </div>
                      </div>
                    )}

                    {uploading && (
                      <div className="absolute inset-0 bg-black/30 rounded-2xl flex items-center justify-center">
                        <div className="text-center text-white">
                          <svg className="w-8 h-8 animate-spin mx-auto mb-2" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          <p className="text-xs font-semibold">Uploading…</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <p className={cn("text-xs mt-2 text-center", dark ? "text-gray-600" : "text-gray-400")}>Optional — Upload for bonus verification points</p>
                </div>

                {/* Right: Trip Details */}
                <div className="p-6">
                  <h3 className={cn("font-semibold text-sm mb-4 flex items-center gap-2", dark ? "text-gray-300" : "text-gray-700")}>
                    <MapPin className="w-4 h-4 text-emerald-500" />
                    Trip Details
                  </h3>

                  <div className="space-y-4">
                    {/* Source */}
                    <div>
                      <label className={cn("block text-xs font-semibold mb-1.5", dark ? "text-gray-400" : "text-gray-600")}>Source Station *</label>
                      <select
                        value={from}
                        onChange={(e) => { setFrom(e.target.value); setErrors((p) => ({ ...p, from: "" })); }}
                        className={cn(
                          "w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-500",
                          errors.from ? "border-red-400" : dark ? "border-gray-700 bg-gray-800 text-white" : "border-gray-200 bg-gray-50 text-gray-900"
                        )}
                      >
                        <option value="">Select source station</option>
                        {stations.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                      {errors.from && <p className="text-red-500 text-xs mt-1">{errors.from}</p>}
                    </div>

                    {/* Destination */}
                    <div>
                      <label className={cn("block text-xs font-semibold mb-1.5", dark ? "text-gray-400" : "text-gray-600")}>Destination Station *</label>
                      <select
                        value={to}
                        onChange={(e) => { setTo(e.target.value); setErrors((p) => ({ ...p, to: "" })); }}
                        className={cn(
                          "w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-500",
                          errors.to ? "border-red-400" : dark ? "border-gray-700 bg-gray-800 text-white" : "border-gray-200 bg-gray-50 text-gray-900"
                        )}
                      >
                        <option value="">Select destination station</option>
                        {stations.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                      {errors.to && <p className="text-red-500 text-xs mt-1">{errors.to}</p>}
                    </div>

                    {/* Date & Time */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className={cn("block text-xs font-semibold mb-1.5", dark ? "text-gray-400" : "text-gray-600")}>
                          <Calendar className="inline w-3 h-3 mr-1" />Date *
                        </label>
                        <input
                          type="date"
                          value={date}
                          onChange={(e) => { setDate(e.target.value); setErrors((p) => ({ ...p, date: "" })); }}
                          className={cn(
                            "w-full px-3 py-3 rounded-xl border text-sm outline-none transition-all focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-500",
                            errors.date ? "border-red-400" : dark ? "border-gray-700 bg-gray-800 text-white" : "border-gray-200 bg-gray-50 text-gray-900"
                          )}
                        />
                        {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
                      </div>
                      <div>
                        <label className={cn("block text-xs font-semibold mb-1.5", dark ? "text-gray-400" : "text-gray-600")}>Time *</label>
                        <input
                          type="time"
                          value={time}
                          onChange={(e) => { setTime(e.target.value); setErrors((p) => ({ ...p, time: "" })); }}
                          className={cn(
                            "w-full px-3 py-3 rounded-xl border text-sm outline-none transition-all focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-500",
                            errors.time ? "border-red-400" : dark ? "border-gray-700 bg-gray-800 text-white" : "border-gray-200 bg-gray-50 text-gray-900"
                          )}
                        />
                        {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time}</p>}
                      </div>
                    </div>

                    {/* Points preview */}
                    {from && to && from !== to && (
                      <div className={cn("rounded-xl p-3 flex items-center gap-3 border", dark ? "bg-emerald-900/20 border-emerald-800" : "bg-emerald-50 border-emerald-100")}>
                        <span className="text-2xl">⭐</span>
                        <div>
                          <p className={cn("text-xs font-semibold", dark ? "text-emerald-400" : "text-emerald-700")}>Estimated reward</p>
                          <p className={cn("text-xs", dark ? "text-emerald-500/70" : "text-emerald-600")}>~15–35 GreenPoints for this trip</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Footer Buttons */}
              <div className={cn("flex items-center justify-end gap-3 px-6 py-4 border-t", dark ? "border-gray-800" : "border-gray-100")}>
                <button
                  type="button"
                  onClick={handleClose}
                  className={cn("px-5 py-2.5 rounded-xl text-sm font-semibold transition-all", dark ? "bg-gray-800 text-gray-300 hover:bg-gray-700" : "bg-gray-100 text-gray-700 hover:bg-gray-200")}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-emerald-500 to-green-500 text-white hover:shadow-lg hover:shadow-emerald-500/30 hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Submitting…
                    </>
                  ) : (
                    <>Submit Trip <ArrowRight className="w-4 h-4" /></>
                  )}
                </button>
              </div>
            </form>
          </>
        ) : (
          /* Success Screen */
          <div className="p-8 text-center">
            <div className="relative w-24 h-24 mx-auto mb-6">
              <div className="absolute inset-0 rounded-full bg-emerald-100 animate-ping opacity-30" />
              <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center shadow-xl shadow-emerald-500/30">
                <CheckCircle2 className="w-12 h-12 text-white" />
              </div>
            </div>

            <h2 className={cn("text-2xl font-bold mb-2", dark ? "text-white" : "text-gray-900")}>
              Trip Submitted Successfully! 🎉
            </h2>
            <p className={cn("text-sm mb-8", dark ? "text-gray-400" : "text-gray-500")}>
              Your metro journey has been recorded and is being verified.
            </p>

            {successData && (
              <>
                <div className={cn("flex items-center justify-center gap-2 text-sm font-semibold mb-6 px-4 py-3 rounded-xl", dark ? "bg-gray-800" : "bg-gray-50")}>
                  <span className={cn(dark ? "text-gray-300" : "text-gray-700")}>{successData.from}</span>
                  <ArrowRight className="w-4 h-4 text-emerald-500" />
                  <span className={cn(dark ? "text-gray-300" : "text-gray-700")}>{successData.to}</span>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-8">
                  {[
                    { label: "Distance", value: successData.distance, emoji: "📍", color: dark ? "bg-blue-900/30 text-blue-400" : "bg-blue-50 text-blue-700" },
                    { label: "CO₂ Saved", value: successData.co2, emoji: "🌿", color: dark ? "bg-emerald-900/30 text-emerald-400" : "bg-emerald-50 text-emerald-700" },
                    { label: "Points Earned", value: `+${successData.points}`, emoji: "⭐", color: dark ? "bg-yellow-900/30 text-yellow-400" : "bg-yellow-50 text-yellow-700" },
                  ].map((stat) => (
                    <div key={stat.label} className={cn("rounded-2xl p-4 text-center", stat.color)}>
                      <span className="text-2xl block mb-1">{stat.emoji}</span>
                      <div className="font-bold text-lg leading-none">{stat.value}</div>
                      <div className="text-xs mt-1 opacity-80">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleReset}
                className="flex-1 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-emerald-500 to-green-500 text-white hover:shadow-lg hover:shadow-emerald-500/25 transition-all flex items-center justify-center gap-2"
              >
                <PlusCircle className="w-4 h-4" />
                Add Another Trip
              </button>
              <button
                onClick={handleClose}
                className={cn("flex-1 py-3 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2", dark ? "bg-gray-800 text-gray-300 hover:bg-gray-700" : "bg-gray-100 text-gray-700 hover:bg-gray-200")}
              >
                <Home className="w-4 h-4" />
                Back to Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
