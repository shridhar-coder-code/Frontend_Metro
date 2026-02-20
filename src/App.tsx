import { useState } from "react";
import { AdminLogin }     from "./components/AdminLogin";
import { UserLogin }      from "./components/UserLogin";
import { Dashboard }      from "./components/dashboard/Dashboard";
import { AdminDashboard } from "./components/admin/AdminDashboard";

type View = "user-login" | "admin-login" | "user-dashboard" | "admin-dashboard";

export function App() {
  const [view, setView]               = useState<View>("user-login");
  const [dark, setDark]               = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  const navigate = (to: View, delay = 350) => {
    setTransitioning(true);
    setTimeout(() => {
      setView(to);
      setTransitioning(false);
    }, delay);
  };

  return (
    <div className={dark ? "dark" : ""}>
      {/* Full-screen page transition overlay */}
      <div
        style={{
          position:        "fixed",
          inset:           0,
          zIndex:          9999,
          background:      "linear-gradient(135deg, #14532d, #166534, #15803d)",
          pointerEvents:   "none",
          transition:      "opacity 0.35s ease",
          opacity:         transitioning ? 1 : 0,
          display:         "flex",
          alignItems:      "center",
          justifyContent:  "center",
        }}
      >
        {transitioning && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
            <div style={{
              width: 60, height: 60, borderRadius: 16,
              background: "rgba(255,255,255,0.15)",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30,
            }}>
              🌿
            </div>
            <p style={{ color: "white", fontWeight: 700, fontSize: 18, letterSpacing: 1 }}>GreenMetro</p>
            <div style={{ display: "flex", gap: 6 }}>
              {[0, 1, 2].map((i) => (
                <span key={i} style={{
                  width: 8, height: 8,
                  background: "rgba(255,255,255,0.6)",
                  borderRadius: "50%",
                  display: "inline-block",
                  animation: "bounce 1s infinite",
                  animationDelay: `${i * 0.15}s`,
                }} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Views */}
      <div style={{
        transition: "opacity 0.35s ease, transform 0.35s ease",
        opacity:    transitioning ? 0 : 1,
        transform:  transitioning ? "scale(0.98)" : "scale(1)",
      }}>
        {view === "user-login" && (
          <UserLogin
            dark={dark}
            setDark={setDark}
            onLoginSuccess={() => navigate("user-dashboard", 400)}
            onSwitchToAdmin={() => navigate("admin-login")}
          />
        )}

        {view === "admin-login" && (
          <AdminLogin
            dark={dark}
            setDark={setDark}
            onLoginSuccess={() => navigate("admin-dashboard", 400)}
            onSwitchToUser={() => navigate("user-login")}
          />
        )}

        {view === "user-dashboard" && (
          <Dashboard
            dark={dark}
            setDark={setDark}
            role="user"
            onLogout={() => navigate("user-login", 300)}
          />
        )}

        {view === "admin-dashboard" && (
          <AdminDashboard
            dark={dark}
            setDark={setDark}
            onLogout={() => navigate("admin-login", 300)}
          />
        )}
      </div>
    </div>
  );
}
