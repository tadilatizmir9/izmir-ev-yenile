import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";

const AdminAuth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user, isAdmin, loading: authLoading } = useAuth(true);

  // Redirect if already authenticated and is admin
  useEffect(() => {
    if (!authLoading && user && isAdmin) {
      navigate("/admin");
    }
  }, [user, isAdmin, authLoading, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Lütfen email ve şifrenizi girin.");
      return;
    }

    setLoading(true);

    // Dynamic import to handle potential build issues
    try {
      const { supabase } = await import("@/integrations/supabase/client");

      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError("Geçersiz email veya şifre.");
        setLoading(false);
        return;
      }

      if (data.user) {
        const { data: hasRole } = await supabase.rpc("has_role", {
          _user_id: data.user.id,
          _role: "admin",
        });

        if (!hasRole) {
          await supabase.auth.signOut();
          setError("Admin yetkiniz bulunmuyor.");
          setLoading(false);
          return;
        }

        navigate("/admin");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  // Show loading while checking auth
  if (authLoading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f5f5f5",
        }}
      >
        <div style={{ fontSize: "16px", color: "#666" }}>Yükleniyor...</div>
      </div>
    );
  }

  // Don't render login form if already authenticated
  if (user && isAdmin) {
    return null; // Will redirect via useEffect
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f5f5f5",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          background: "white",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          padding: "32px",
        }}
      >
        <h1
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "8px",
            color: "#1a1a1a",
          }}
        >
          Admin Paneli
        </h1>
        <p
          style={{
            textAlign: "center",
            color: "#666",
            marginBottom: "24px",
          }}
        >
          Giriş yapın
        </p>

        {error && (
          <div
            style={{
              background: "#fee2e2",
              color: "#dc2626",
              padding: "12px",
              borderRadius: "8px",
              marginBottom: "16px",
              fontSize: "14px",
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", marginBottom: "4px", color: "#333" }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                fontSize: "16px",
                boxSizing: "border-box",
              }}
              placeholder="admin@example.com"
            />
          </div>
          <div style={{ marginBottom: "24px" }}>
            <label style={{ display: "block", marginBottom: "4px", color: "#333" }}>Şifre</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                fontSize: "16px",
                boxSizing: "border-box",
              }}
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px",
              background: "#f97316",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminAuth;
