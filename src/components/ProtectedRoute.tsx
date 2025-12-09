import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
  redirectTo?: string;
}

/**
 * ProtectedRoute component that guards routes requiring authentication
 * Optionally requires admin role
 */
export const ProtectedRoute = ({
  children,
  requireAdmin = false,
  redirectTo = "/admin/auth",
}: ProtectedRouteProps) => {
  const { user, isAdmin, loading } = useAuth(requireAdmin);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      // If no user, redirect to login
      if (!user) {
        navigate(redirectTo);
        return;
      }

      // If admin required but user is not admin, redirect to login
      if (requireAdmin && !isAdmin) {
        navigate(redirectTo);
        return;
      }
    }
  }, [user, isAdmin, loading, requireAdmin, navigate, redirectTo]);

  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // If not authenticated or not admin (when required), don't render children
  // The useEffect will handle the redirect
  if (!user || (requireAdmin && !isAdmin)) {
    return null;
  }

  return <>{children}</>;
};


