import { useState } from "react";
import {
  Mail, Lock, Eye, EyeOff, Shield, BarChart3, Train,
  Leaf, ChevronRight, AlertCircle, CheckCircle2, Moon, Sun, User
} from "lucide-react";
import { MetroIllustration } from "./MetroIllustration";
import { LeafBackground } from "./LeafBackground";
import { cn } from "@/utils/cn";

interface AdminLoginProps {
  dark: boolean;
  setDark?: (v: boolean) => void;
  onLoginSuccess?: () => void;
  onSwitchToUser?: () => void;
}

export function AdminLogin({ dark, setDark, onLoginSuccess, onSwitchToUser }: AdminLoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [success, setSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const validate = () => {
    const e: { email?: string; password?: string } = {};
    if (!email.trim()) e.email = "Email address is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Enter a valid email address";
    if (!password) e.password = "Password is required";
    else if (password.length < 6) e.password = "Password must be at least 6 characters";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    await new Promise((r) => setTimeout(r, 2200));
    setLoading(false);
    setSuccess(true);
    setTimeout(() => {
      onLoginSuccess?.();
    }, 800);
  };

  const stats = [
    { label: "Active Routes", value: "48", icon: Train, color: "text-emerald-400" },
    { label: "CO₂ Saved Today", value: "12.4t", icon: Leaf, color: "text-green-400" },
    { label: "Commuters", value: "94.2k", icon: BarChart3, color: "text-teal-400" },
  ];

  return (
    <div className={cn(
      "min-h-screen flex flex-col transition-colors duration-500 relative overflow-hidden",
      dark ? "bg-gray-950" : "bg-slate-50"
    )}>

      {/* Utility top bar */}
      <div className={cn(
        "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-2.5 border-b backdrop-blur-xl",
        dark ? "bg-gray-950/90 border-gray-800" : "bg-white/90 border-gray-200"
      )}>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-700 to-green-800 flex items-center justify-center">
            <Train className="w-4 h-4 text-white" />
          </div>
          <span className={cn("font-bold text-sm", dark ? "text-white" : "text-gray-900")}>
            Green<span className="text-emerald-600">Metro</span>
          </span>
          <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium", dark ? "bg-emerald-900/50 text-emerald-400" : "bg-emerald-100 text-emerald-700")}>
            Admin Portal
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onSwitchToUser?.()}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all",
              dark ? "text-gray-400 hover:text-white hover:bg-gray-800" : "text-gray-500 hover:text-gray-800 hover:bg-gray-100"
            )}
          >
            <User className="w-3.5 h-3.5" />
            Commuter Login
          </button>
          <button
            onClick={() => setDark?.(!dark)}
            className={cn(
              "p-1.5 rounded-lg transition-all",
              dark ? "text-yellow-400 hover:bg-gray-800" : "text-gray-500 hover:bg-gray-100"
            )}
          >
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main content row */}
      <div className="flex flex-1 mt-[49px]">
      {/* Left Panel – Illustration */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-[55%] relative flex-col justify-between overflow-hidden bg-gradient-to-br from-green-900 via-emerald-800 to-teal-900">
        <LeafBackground dark />

        {/* Decorative circles */}
        <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute bottom-[-80px] right-[-80px] w-[350px] h-[350px] rounded-full bg-teal-400/10 blur-3xl" />

        <div className="relative z-10 p-10">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center animate-pulse-ring">
              <Train className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <span className="text-white font-bold text-xl tracking-tight">GreenMetro</span>
              <span className="block text-emerald-300/80 text-xs tracking-widest uppercase">Admin Portal</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 px-10 pb-6">
          {/* Metro SVG */}
          <div className="animate-float">
            <MetroIllustration className="w-full max-w-lg mx-auto drop-shadow-2xl" />
          </div>

          {/* Tagline */}
          <div className="mt-4 mb-8">
            <h2 className="text-white text-3xl font-bold leading-tight">
              Powering Sustainable
              <br />
              <span className="text-emerald-300">Urban Mobility</span>
            </h2>
            <p className="text-white/60 mt-2 text-sm leading-relaxed max-w-sm">
              Manage metro operations, track carbon credits, and reward eco-conscious commuters — all from one intelligent dashboard.
            </p>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3">
            {stats.map((s) => (
              <div key={s.label} className="glass rounded-xl p-3 animate-fade-in">
                <s.icon className={cn("w-4 h-4 mb-1", s.color)} />
                <div className="text-white font-bold text-lg leading-none">{s.value}</div>
                <div className="text-white/50 text-xs mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="relative z-10 px-10 py-4 border-t border-white/10">
          <p className="text-white/30 text-xs">© 2025 GreenMetro Authority · All rights reserved</p>
        </div>
      </div>

      {/* Right Panel – Form */}
      <div className={cn(
        "flex-1 flex items-center justify-center p-6 sm:p-10 relative transition-colors duration-500",
        dark ? "bg-gray-950" : "bg-white"
      )}>
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, #22c55e 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

        <div className="w-full max-w-md animate-slide-up">
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-3 mb-8">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center">
              <Train className="w-5 h-5 text-white" />
            </div>
            <span className={cn("font-bold text-xl", dark ? "text-white" : "text-gray-900")}>GreenMetro</span>
          </div>

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-5 h-5 text-emerald-500" />
              <span className="text-emerald-600 text-sm font-semibold tracking-wide uppercase">Secure Admin Access</span>
            </div>
            <h1 className={cn("text-3xl font-bold mb-2", dark ? "text-white" : "text-gray-900")}>
              Welcome back,
              <br />
              <span className="text-emerald-600">Administrator</span>
            </h1>
            <p className={cn("text-sm", dark ? "text-gray-400" : "text-gray-500")}>
              Sign in to access your metro authority dashboard and manage sustainable transport operations.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {/* Email */}
            <div>
              <label className={cn("block text-sm font-medium mb-1.5", dark ? "text-gray-300" : "text-gray-700")}>
                Admin Email
              </label>
              <div className={cn(
                "flex items-center gap-3 border rounded-xl px-4 py-3.5 input-field transition-all duration-200",
                focusedField === "email"
                  ? "border-emerald-500 ring-2 ring-emerald-500/20"
                  : errors.email
                  ? "border-red-400 ring-2 ring-red-400/20"
                  : dark ? "border-gray-700 bg-gray-900" : "border-gray-200 bg-gray-50"
              )}>
                <Mail className={cn("w-4 h-4 flex-shrink-0", focusedField === "email" ? "text-emerald-500" : dark ? "text-gray-500" : "text-gray-400")} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors((p) => ({ ...p, email: undefined })); }}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="admin@greenmetro.gov"
                  className={cn("flex-1 bg-transparent outline-none text-sm", dark ? "text-white placeholder-gray-600" : "text-gray-900 placeholder-gray-400")}
                />
                {email && !errors.email && <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />}
              </div>
              {errors.email && (
                <div className="flex items-center gap-1.5 mt-1.5 animate-fade-in">
                  <AlertCircle className="w-3.5 h-3.5 text-red-500" />
                  <p className="text-red-500 text-xs">{errors.email}</p>
                </div>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className={cn("text-sm font-medium", dark ? "text-gray-300" : "text-gray-700")}>Password</label>
                <button type="button" className="text-emerald-600 text-xs font-medium hover:text-emerald-500 transition-colors">
                  Forgot password?
                </button>
              </div>
              <div className={cn(
                "flex items-center gap-3 border rounded-xl px-4 py-3.5 input-field transition-all duration-200",
                focusedField === "password"
                  ? "border-emerald-500 ring-2 ring-emerald-500/20"
                  : errors.password
                  ? "border-red-400 ring-2 ring-red-400/20"
                  : dark ? "border-gray-700 bg-gray-900" : "border-gray-200 bg-gray-50"
              )}>
                <Lock className={cn("w-4 h-4 flex-shrink-0", focusedField === "password" ? "text-emerald-500" : dark ? "text-gray-500" : "text-gray-400")} />
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); if (errors.password) setErrors((p) => ({ ...p, password: undefined })); }}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="••••••••••••"
                  className={cn("flex-1 bg-transparent outline-none text-sm", dark ? "text-white placeholder-gray-600" : "text-gray-900 placeholder-gray-400")}
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className={cn("flex-shrink-0 transition-colors", dark ? "text-gray-500 hover:text-gray-300" : "text-gray-400 hover:text-gray-600")}>
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <div className="flex items-center gap-1.5 mt-1.5 animate-fade-in">
                  <AlertCircle className="w-3.5 h-3.5 text-red-500" />
                  <p className="text-red-500 text-xs">{errors.password}</p>
                </div>
              )}
            </div>

            {/* Remember me */}
            <div className="flex items-center gap-2.5">
              <input type="checkbox" id="remember" className="w-4 h-4 rounded border-gray-300 text-emerald-600 accent-emerald-600" />
              <label htmlFor="remember" className={cn("text-sm", dark ? "text-gray-400" : "text-gray-600")}>
                Keep me signed in for 30 days
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || success}
              className={cn(
                "w-full py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 relative overflow-hidden",
                success
                  ? "bg-emerald-500 text-white"
                  : "shimmer-btn text-white hover:shadow-lg hover:shadow-emerald-500/30 hover:-translate-y-0.5 active:translate-y-0",
                loading && "opacity-90 cursor-not-allowed"
              )}
            >
              {loading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  <span>Authenticating…</span>
                </>
              ) : success ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Access Granted!</span>
                </>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          {/* <div className="flex items-center gap-3 my-6">
            <div className={cn("flex-1 h-px", dark ? "bg-gray-800" : "bg-gray-200")} />
            <span className={cn("text-xs", dark ? "text-gray-600" : "text-gray-400")}>or continue with</span>
            <div className={cn("flex-1 h-px", dark ? "bg-gray-800" : "bg-gray-200")} />
          </div> */}

          {/* SSO / Auth options */}
          {/* <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Google SSO", icon: "G", bg: dark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200" },
              { label: "Microsoft SSO", icon: "M", bg: dark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200" },
            ].map((opt) => (
              <button key={opt.label} className={cn(
                "flex items-center justify-center gap-2 py-3 rounded-xl border text-sm font-medium transition-all duration-200 hover:border-emerald-500/50 hover:shadow-sm",
                opt.bg, dark ? "text-gray-300" : "text-gray-700"
              )}>
                <span className="w-5 h-5 rounded font-bold text-xs flex items-center justify-center bg-emerald-600 text-white">{opt.icon}</span>
                {opt.label}
              </button>
            ))}
          </div> */}

          {/* Security badge */}
          {/* <div className={cn("mt-6 flex items-center gap-2 rounded-xl p-3.5", dark ? "bg-gray-900 border border-gray-800" : "bg-emerald-50 border border-emerald-100")}>
            <Shield className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <p className={cn("text-xs", dark ? "text-gray-400" : "text-emerald-800")}>
              This portal is protected by 256-bit TLS encryption and multi-factor authentication.
            </p>
          </div> */}
        </div>
      </div>
      </div>{/* end main content row */}
    </div>
  );
}
