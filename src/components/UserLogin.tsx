import { useState } from "react";
import {
  Mail, Lock, Eye, EyeOff, Leaf, Star, ArrowRight,
  AlertCircle, CheckCircle2, Smartphone, Gift, Zap, TreePine,
  Moon, Sun, Shield
} from "lucide-react";
import { LeafBackground } from "./LeafBackground";
import { cn } from "@/utils/cn";

interface UserLoginProps {
  dark: boolean;
  setDark?: (v: boolean) => void;
  onLoginSuccess?: () => void;
  onSwitchToAdmin?: () => void;
}

export function UserLogin({ dark, setDark, onLoginSuccess, onSwitchToAdmin }: UserLoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [success, setSuccess] = useState(false);
  const [otpMode, setOtpMode] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<"login" | "signup">("login");

  const validate = () => {
    const e: { email?: string; password?: string } = {};
    if (!email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Enter a valid email";
    if (!otpMode && !password) e.password = "Password is required";
    else if (!otpMode && password.length < 6) e.password = "At least 6 characters";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otpMode) {
      setLoading(true);
      await new Promise((r) => setTimeout(r, 2000));
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        onLoginSuccess?.();
      }, 800);
      return;
    }
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    await new Promise((r) => setTimeout(r, 2000));
    setLoading(false);
    setSuccess(true);
    setTimeout(() => {
      onLoginSuccess?.();
    }, 800);
  };

  const handleOtp = (val: string, idx: number) => {
    if (!/^\d*$/.test(val)) return;
    const next = [...otp];
    next[idx] = val.slice(-1);
    setOtp(next);
    if (val && idx < 5) {
      const el = document.getElementById(`otp-${idx + 1}`);
      el?.focus();
    }
  };

  const perks = [
    { icon: Gift, label: "Earn Rewards", sub: "Points per trip", color: "text-emerald-500" },
    { icon: TreePine, label: "Save Carbon", sub: "Track your impact", color: "text-green-500" },
    { icon: Zap, label: "Instant Access", sub: "QR boarding pass", color: "text-teal-500" },
    { icon: Star, label: "Redeem Points", sub: "For discounts", color: "text-emerald-400" },
  ];

  return (
    <div className={cn(
      "min-h-screen flex flex-col lg:flex-row transition-colors duration-500 relative",
      dark ? "bg-gray-950" : "bg-gray-50"
    )}>

      {/* Utility top bar */}
      <div className={cn(
        "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-2.5 border-b backdrop-blur-xl",
        dark ? "bg-gray-950/90 border-gray-800" : "bg-white/90 border-gray-200"
      )}>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center">
            <Leaf className="w-4 h-4 text-white" />
          </div>
          <span className={cn("font-bold text-sm", dark ? "text-white" : "text-gray-900")}>
            Green<span className="text-emerald-600">Metro</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onSwitchToAdmin?.()}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all",
              dark ? "text-gray-400 hover:text-white hover:bg-gray-800" : "text-gray-500 hover:text-gray-800 hover:bg-gray-100"
            )}
          >
            <Shield className="w-3.5 h-3.5" />
            Admin Login
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

      {/* Spacer for top bar */}
      <div className="h-[49px] lg:hidden" />

      {/* Mobile-first: top hero section */}
      <div className="relative lg:hidden overflow-hidden bg-gradient-to-br from-emerald-600 to-green-700 px-6 pt-10 pb-16">
        <LeafBackground dark />
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-current opacity-10 rounded-t-3xl" />

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <Leaf className="w-4 h-4 text-white" />
            </div>
            <span className="text-white font-bold text-lg">GreenMetro</span>
          </div>
          <h2 className="text-white text-2xl font-bold leading-tight mb-1">Ride Smart.<br />Save Carbon. Earn Rewards.</h2>
          <p className="text-white/70 text-sm">Every eco-trip earns you GreenPoints.</p>

          {/* Floating rewards card */}
          <div className="mt-5 glass rounded-2xl p-4 flex items-center gap-4 max-w-xs">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <Star className="w-6 h-6 text-yellow-300 fill-yellow-300" />
            </div>
            <div>
              <div className="text-white font-bold text-xl">1,248 pts</div>
              <div className="text-white/60 text-xs">Your GreenPoints balance</div>
              <div className="flex items-center gap-1 mt-1">
                <div className="w-24 h-1.5 bg-white/20 rounded-full overflow-hidden">
                  <div className="w-16 h-full bg-yellow-300 rounded-full" />
                </div>
                <span className="text-white/50 text-xs">65%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop left panel */}
      <div className="hidden lg:flex lg:w-[45%] xl:w-2/5 relative flex-col justify-between overflow-hidden bg-gradient-to-br from-emerald-600 via-green-600 to-teal-700">
        <LeafBackground dark />
        <div className="absolute top-[-80px] right-[-80px] w-[300px] h-[300px] rounded-full bg-white/5 blur-3xl" />
        <div className="absolute bottom-[-60px] left-[-60px] w-[250px] h-[250px] rounded-full bg-emerald-300/10 blur-3xl" />

        <div className="relative z-10 p-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 border border-white/25 flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-white font-bold text-xl">GreenMetro</span>
              <span className="block text-white/60 text-xs tracking-widest uppercase">Commuter App</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 px-10 pb-10">
          {/* Phone mockup */}
          <div className="animate-float-slow flex justify-center mb-8">
            <div className={cn("w-48 h-[300px] rounded-[2.5rem] border-4 border-white/20 p-2 relative overflow-hidden", dark ? "bg-gray-900" : "bg-gray-900")}>
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-1.5 bg-white/20 rounded-full" />
              <div className="w-full h-full rounded-[2rem] bg-gradient-to-b from-emerald-950 to-green-950 overflow-hidden flex flex-col p-4 pt-8">
                <div className="text-white/50 text-xs mb-1">Next Trip</div>
                <div className="text-white font-bold text-sm mb-3">Central → Airport</div>
                <div className="flex-1 flex flex-col gap-2">
                  {[80, 60, 45, 90, 55].map((w, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <div className="h-2 bg-white/10 rounded-full" style={{ width: `${w}%` }} />
                    </div>
                  ))}
                </div>
                <div className="mt-3 bg-emerald-600/30 rounded-xl p-2 text-center">
                  <div className="text-emerald-300 text-xs font-semibold">+42 GreenPoints</div>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-white text-2xl font-bold mb-2">Ride Green,<br />Earn More</h2>
          <p className="text-white/60 text-sm mb-6">Join 94,000+ commuters saving carbon and earning rewards on every metro ride.</p>

          {/* Perks grid */}
          <div className="grid grid-cols-2 gap-2.5">
            {perks.map((p) => (
              <div key={p.label} className="glass rounded-xl p-3">
                <p.icon className={cn("w-4 h-4 mb-1.5", p.color)} />
                <div className="text-white text-sm font-semibold">{p.label}</div>
                <div className="text-white/50 text-xs">{p.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel / Main form area */}
      <div className={cn(
        "flex-1 flex items-center justify-center p-6 sm:p-8 transition-colors duration-500 relative",
        dark ? "bg-gray-950" : "bg-white"
      )}>
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, #22c55e 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

        <div className="w-full max-w-sm animate-slide-up">
          {/* Tab: Login / Sign up */}
          <div className={cn("flex mb-8 p-1 rounded-2xl relative", dark ? "bg-gray-900" : "bg-gray-100")}>
            <div
              className="absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-xl bg-emerald-600 shadow-md transition-all duration-300 tab-slider"
              style={{ transform: activeView === "login" ? "translateX(4px)" : "translateX(calc(100% + 0px))" }}
            />
            {(["login", "signup"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setActiveView(v)}
                className={cn(
                  "flex-1 py-2.5 text-sm font-semibold rounded-xl relative z-10 transition-colors duration-300",
                  activeView === v ? "text-white" : dark ? "text-gray-400" : "text-gray-500"
                )}
              >
                {v === "login" ? "Sign In" : "Sign Up"}
              </button>
            ))}
          </div>

          {activeView === "login" ? (
            <>
              <div className="mb-6">
                <h1 className={cn("text-2xl font-bold mb-1", dark ? "text-white" : "text-gray-900")}>
                  Welcome back! 👋
                </h1>
                <p className={cn("text-sm", dark ? "text-gray-400" : "text-gray-500")}>
                  Sign in to your GreenMetro account
                </p>
              </div>

              {/* OTP / Password toggle */}
              {/* <div className={cn("flex mb-5 p-1 rounded-xl gap-1", dark ? "bg-gray-900" : "bg-gray-100")}>
                {[
                  { key: false, label: "Password" },
                  { key: true, label: "OTP Login" },
                ].map((opt) => (
                  <button
                    key={String(opt.key)}
                    onClick={() => setOtpMode(opt.key)}
                    className={cn(
                      "flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200",
                      otpMode === opt.key
                        ? "bg-white text-emerald-700 shadow-sm"
                        : dark ? "text-gray-500" : "text-gray-400"
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div> */}

              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                {/* Email / Phone */}
                <div>
                  <div className={cn(
                    "flex items-center gap-3 border rounded-2xl px-4 py-3.5 input-field transition-all",
                    focusedField === "email"
                      ? "border-emerald-500 ring-2 ring-emerald-500/20"
                      : errors.email
                      ? "border-red-400 ring-2 ring-red-400/20"
                      : dark ? "border-gray-800 bg-gray-900" : "border-gray-200 bg-gray-50"
                  )}>
                    {otpMode ? <Smartphone className={cn("w-4 h-4", focusedField === "email" ? "text-emerald-500" : dark ? "text-gray-500" : "text-gray-400")} /> : <Mail className={cn("w-4 h-4", focusedField === "email" ? "text-emerald-500" : dark ? "text-gray-500" : "text-gray-400")} />}
                    <input
                      type={otpMode ? "tel" : "email"}
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors((p) => ({ ...p, email: undefined })); }}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      placeholder={otpMode ? "+91 98765 43210" : "your@email.com"}
                      className={cn("flex-1 bg-transparent outline-none text-sm", dark ? "text-white placeholder-gray-600" : "text-gray-900 placeholder-gray-400")}
                    />
                  </div>
                  {errors.email && (
                    <div className="flex items-center gap-1.5 mt-1 animate-fade-in">
                      <AlertCircle className="w-3 h-3 text-red-500" />
                      <p className="text-red-500 text-xs">{errors.email}</p>
                    </div>
                  )}
                </div>

                {/* Password or OTP */}
                {otpMode ? (
                  <div>
                    <label className={cn("block text-xs font-medium mb-2", dark ? "text-gray-400" : "text-gray-600")}>Enter 6-digit OTP</label>
                    <div className="flex gap-2">
                      {otp.map((digit, i) => (
                        <input
                          key={i}
                          id={`otp-${i}`}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOtp(e.target.value, i)}
                          className={cn(
                            "w-full aspect-square text-center text-lg font-bold rounded-xl border outline-none transition-all input-field",
                            digit
                              ? "border-emerald-500 text-emerald-600 bg-emerald-50"
                              : dark ? "border-gray-800 bg-gray-900 text-white" : "border-gray-200 bg-gray-50 text-gray-900",
                            "focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                          )}
                        />
                      ))}
                    </div>
                    <button type="button" className="text-emerald-600 text-xs font-medium mt-2 hover:text-emerald-500">
                      Send OTP →
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className={cn(
                      "flex items-center gap-3 border rounded-2xl px-4 py-3.5 input-field transition-all",
                      focusedField === "password"
                        ? "border-emerald-500 ring-2 ring-emerald-500/20"
                        : errors.password
                        ? "border-red-400 ring-2 ring-red-400/20"
                        : dark ? "border-gray-800 bg-gray-900" : "border-gray-200 bg-gray-50"
                    )}>
                      <Lock className={cn("w-4 h-4", focusedField === "password" ? "text-emerald-500" : dark ? "text-gray-500" : "text-gray-400")} />
                      <input
                        type={showPass ? "text" : "password"}
                        value={password}
                        onChange={(e) => { setPassword(e.target.value); if (errors.password) setErrors((p) => ({ ...p, password: undefined })); }}
                        onFocus={() => setFocusedField("password")}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Enter password"
                        className={cn("flex-1 bg-transparent outline-none text-sm", dark ? "text-white placeholder-gray-600" : "text-gray-900 placeholder-gray-400")}
                      />
                      <button type="button" onClick={() => setShowPass(!showPass)} className={cn("transition-colors", dark ? "text-gray-500 hover:text-gray-300" : "text-gray-400 hover:text-gray-600")}>
                        {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {errors.password && (
                      <div className="flex items-center gap-1.5 mt-1 animate-fade-in">
                        <AlertCircle className="w-3 h-3 text-red-500" />
                        <p className="text-red-500 text-xs">{errors.password}</p>
                      </div>
                    )}
                    <div className="flex justify-end mt-1.5">
                      <button type="button" className="text-emerald-600 text-xs font-medium hover:text-emerald-500 transition-colors">
                        Forgot password?
                      </button>
                    </div>
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading || success}
                  className={cn(
                    "w-full py-3.5 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300",
                    success
                      ? "bg-emerald-500 text-white"
                      : "shimmer-btn text-white hover:shadow-lg hover:shadow-emerald-500/30 hover:-translate-y-0.5",
                    loading && "opacity-80 cursor-not-allowed"
                  )}
                >
                  {loading ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      <span>Signing in…</span>
                    </>
                  ) : success ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Welcome back! 🎉</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Divider */}
              {/* <div className="flex items-center gap-3 my-5">
                <div className={cn("flex-1 h-px", dark ? "bg-gray-800" : "bg-gray-200")} />
                <span className={cn("text-xs", dark ? "text-gray-600" : "text-gray-400")}>or</span>
                <div className={cn("flex-1 h-px", dark ? "bg-gray-800" : "bg-gray-200")} />
              </div> */}

              {/* Social login */}
              {/* <button className={cn(
                "w-full flex items-center justify-center gap-3 py-3 rounded-2xl border text-sm font-medium transition-all duration-200 hover:border-emerald-500/50",
                dark ? "border-gray-800 bg-gray-900 text-gray-300" : "border-gray-200 bg-white text-gray-700"
              )}>
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Continue with Google
              </button> */}
            </>
          ) : (
            /* Sign Up View */
            <div>
              <div className="mb-6">
                <h1 className={cn("text-2xl font-bold mb-1", dark ? "text-white" : "text-gray-900")}>
                  Join GreenMetro 🌿
                </h1>
                <p className={cn("text-sm", dark ? "text-gray-400" : "text-gray-500")}>
                  Create your account and start earning rewards
                </p>
              </div>

              <div className="space-y-4">
                {[
                  { placeholder: "Full Name", type: "text" },
                  { placeholder: "Email address", type: "email" },
                  { placeholder: "Phone number", type: "tel" },
                  { placeholder: "Create password", type: "password" },
                ].map((field) => (
                  <div key={field.placeholder} className={cn(
                    "flex items-center gap-3 border rounded-2xl px-4 py-3.5 input-field transition-all focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20",
                    dark ? "border-gray-800 bg-gray-900" : "border-gray-200 bg-gray-50"
                  )}>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      className={cn("flex-1 bg-transparent outline-none text-sm", dark ? "text-white placeholder-gray-600" : "text-gray-900 placeholder-gray-400")}
                    />
                  </div>
                ))}

                <div className="flex items-start gap-2.5 mt-1">
                  <input type="checkbox" id="terms" className="mt-0.5 w-4 h-4 accent-emerald-600" />
                  <label htmlFor="terms" className={cn("text-xs leading-relaxed", dark ? "text-gray-400" : "text-gray-600")}>
                    I agree to GreenMetro's{" "}
                    <span className="text-emerald-600 font-medium">Terms of Service</span> and{" "}
                    <span className="text-emerald-600 font-medium">Privacy Policy</span>
                  </label>
                </div>

                <button className="w-full shimmer-btn text-white py-3.5 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-emerald-500/30 transition-all hover:-translate-y-0.5">
                  Create Account
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Perks hint */}
                <div className={cn("rounded-2xl p-4 flex items-center gap-3", dark ? "bg-gray-900 border border-gray-800" : "bg-emerald-50 border border-emerald-100")}>
                  <Gift className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                  <div>
                    <div className={cn("text-sm font-semibold", dark ? "text-white" : "text-gray-900")}>Welcome bonus!</div>
                    <div className={cn("text-xs", dark ? "text-gray-400" : "text-gray-600")}>Get 200 GreenPoints on your first ride 🎁</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
