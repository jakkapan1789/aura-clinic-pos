export type AppRole = "viewer" | "user" | "admin";

export interface JwtPayload {
  sub: string;
  email: string;
  role: AppRole;
  tenantId: string;
  branchId: string;
  exp: number;
}

// In production, JWT lives in HttpOnly cookie set by the backend.
// For this mock, we simulate by storing a token in memory only.
let _token: string | null = null;

export function setToken(token: string) {
  _token = token;
}

export function getToken(): string | null {
  return _token;
}

export function clearToken() {
  _token = null;
}

export function decodeJwt(token: string): JwtPayload {
  // Mock JWT is base64-encoded JSON payload
  const parts = token.split(".");
  if (parts.length !== 3) throw new Error("Invalid token");
  const payload = JSON.parse(atob(parts[1]));
  return payload as JwtPayload;
}

export function isTokenExpired(payload: JwtPayload): boolean {
  return Date.now() >= payload.exp * 1000;
}

// Mock JWT generator for dev — simulates what the backend would return
export function generateMockJwt(email: string, role: AppRole): string {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = btoa(
    JSON.stringify({
      sub: crypto.randomUUID(),
      email,
      role,
      tenantId: "tenant-001",
      branchId: "branch-main",
      exp: Math.floor(Date.now() / 1000) + 3600, // 1 hour
    }),
  );
  const signature = btoa("mock-signature");
  return `${header}.${payload}.${signature}`;
}

export function hasPermission(
  role: AppRole,
  action: "view_patients" | "create_patient",
): boolean {
  const permissions: Record<string, AppRole[]> = {
    view_patients: ["viewer", "user", "admin"],
    create_patient: ["user", "admin"],
  };
  return permissions[action]?.includes(role) ?? false;
}
