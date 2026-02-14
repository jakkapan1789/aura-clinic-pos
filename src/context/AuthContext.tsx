import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import {
  type AppRole,
  type JwtPayload,
  setToken,
  getToken,
  clearToken,
  decodeJwt,
  generateMockJwt,
  hasPermission,
} from "@/lib/auth";

interface AuthState {
  isAuthenticated: boolean;
  user: JwtPayload | null;
  login: (email: string, password: string, role: AppRole) => Promise<void>;
  logout: () => void;
  can: (action: "view_patients" | "create_patient") => boolean;
}

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<JwtPayload | null>(() => {
    const token = getToken();
    if (!token) return null;
    try {
      return decodeJwt(token);
    } catch {
      return null;
    }
  });

  const login = useCallback(
    async (email: string, _password: string, role: AppRole) => {
      // Mock: In production, POST /auth/login and backend sets HttpOnly cookie
      const token = generateMockJwt(email, role);
      setToken(token);
      setUser(decodeJwt(token));
    },
    [],
  );

  const logout = useCallback(() => {
    clearToken();
    setUser(null);
  }, []);

  const can = useCallback(
    (action: "view_patients" | "create_patient") => {
      if (!user) return false;
      return hasPermission(user.role, action);
    },
    [user],
  );

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!user, user, login, logout, can }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
