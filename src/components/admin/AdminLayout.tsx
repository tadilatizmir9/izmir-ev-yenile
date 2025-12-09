import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { LayoutDashboard, MessageSquare, FileText, LogOut, Home, Menu } from "lucide-react";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAuth } from "@/hooks/use-auth";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { user: _user, isAdmin: _isAdmin } = useAuth(true); // Require admin role

  const handleLogout = async () => {
    try {
      const { supabase } = await import("@/integrations/supabase/client");
      await supabase.auth.signOut();
      navigate("/admin/auth");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const menuItems = [
    { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
    { title: "İletişim Formları", url: "/admin/contact", icon: MessageSquare },
    { title: "Blog Yazıları", url: "/admin/blog", icon: FileText },
    { title: "Sayfa İçerikleri", url: "/admin/pages", icon: FileText },
  ];

  return (
    <ProtectedRoute requireAdmin={true}>
      <div className="min-h-screen flex bg-background">
        {/* Sidebar */}
        <aside
          className={`${sidebarOpen ? "w-64" : "w-0"} bg-card border-r border-border transition-all duration-300 overflow-hidden`}
        >
          <div className="p-4 border-b border-border">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">A</span>
              </div>
              <div>
                <h2 className="font-display font-semibold text-foreground">Admin Panel</h2>
                <p className="text-xs text-muted-foreground">Yönetim Sistemi</p>
              </div>
            </div>
          </div>

          <nav className="p-4 space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.title}
                onClick={() => navigate(item.url)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors
                ${
                  location.pathname === item.url
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </button>
            ))}
          </nav>

          <div className="absolute bottom-0 left-0 w-64 p-4 border-t border-border space-y-2">
            <button
              onClick={() => navigate("/")}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
            >
              <Home className="h-4 w-4" />
              Siteye Git
            </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-destructive hover:bg-destructive/10 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Çıkış Yap
            </button>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 flex flex-col">
          <header className="h-14 border-b border-border flex items-center px-4 bg-card">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-secondary rounded-lg transition-colors"
            >
              <Menu className="h-5 w-5 text-muted-foreground" />
            </button>
          </header>
          <main className="flex-1 p-6 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AdminLayout;
