import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

interface AuthState {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
}

/**
 * Custom hook for authentication and admin role checking
 * Provides user session, admin status, and loading state
 */
export const useAuth = (requireAdmin: boolean = false) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAdmin: false,
    loading: true,
  });
  // navigate available for future use if needed
  const _navigate = useNavigate();

  useEffect(() => {
    let mounted = true;

    const checkAuth = async () => {
      try {
        // Get current session
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError) {
          console.error("Session error:", sessionError);
          if (mounted) {
            setAuthState({ user: null, isAdmin: false, loading: false });
          }
          return;
        }

        if (!session?.user) {
          if (mounted) {
            setAuthState({ user: null, isAdmin: false, loading: false });
          }
          return;
        }

        // Check admin role if required
        let isAdmin = false;
        if (requireAdmin) {
          const { data: hasRole, error: roleError } = await supabase.rpc("has_role", {
            _user_id: session.user.id,
            _role: "admin",
          });

          if (roleError) {
            console.error("Role check error:", roleError);
          } else {
            isAdmin = hasRole === true;
          }
        }

        if (mounted) {
          setAuthState({
            user: session.user,
            isAdmin,
            loading: false,
          });
        }
      } catch (error) {
        console.error("Auth check error:", error);
        if (mounted) {
          setAuthState({ user: null, isAdmin: false, loading: false });
        }
      }
    };

    checkAuth();

    // Listen to auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return;

      if (event === "SIGNED_OUT" || !session) {
        setAuthState({ user: null, isAdmin: false, loading: false });
        return;
      }

      // Re-check admin role on auth state change
      let isAdmin = false;
      if (requireAdmin && session.user) {
        const { data: hasRole } = await supabase.rpc("has_role", {
          _user_id: session.user.id,
          _role: "admin",
        });
        isAdmin = hasRole === true;
      }

      setAuthState({
        user: session.user,
        isAdmin,
        loading: false,
      });
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [requireAdmin]);

  return authState;
};
