import { apiFetch, ApiError } from "./api";

export type UserRole = "admin" | "teacher" | "student" | "guardian";

/**
 * User object as used across the frontend. `username` is kept for backward
 * compatibility with existing components and mirrors the account email.
 */
export interface AuthUser {
  id: string;
  role: UserRole;
  username: string;
  email: string;
  name: string;
  linkedProfileId?: string;
}

/** Shape returned by the backend (`/auth/login`, `/auth/me`). */
interface BackendUser {
  id: string;
  email: string;
  name: string;
  role: string;
  linkedProfileId?: string;
}

interface LoginResponse {
  accessToken: string;
  expiresIn: string;
  user: BackendUser;
}

const USER_STORAGE_KEY = "awsd-ems-user";

const roleDisplayNames: Record<UserRole, string> = {
  admin: "Principal / Admin",
  teacher: "Teacher",
  student: "Student",
  guardian: "Guardian",
};

/**
 * Map the backend's UPPERCASE role enum
 * (ADMIN|PRINCIPAL|TEACHER|STUDENT|GUARDIAN|ACCOUNTANT) onto the four
 * frontend roles. PRINCIPAL and ACCOUNTANT fall back to the admin surface.
 */
export const mapBackendRole = (role: string): UserRole => {
  switch (role?.toUpperCase()) {
    case "TEACHER":
      return "teacher";
    case "STUDENT":
      return "student";
    case "GUARDIAN":
      return "guardian";
    case "ADMIN":
    case "PRINCIPAL":
    case "ACCOUNTANT":
    default:
      return "admin";
  }
};

const toAuthUser = (u: BackendUser): AuthUser => ({
  id: u.id,
  role: mapBackendRole(u.role),
  username: u.email,
  email: u.email,
  name: u.name,
  ...(u.linkedProfileId ? { linkedProfileId: u.linkedProfileId } : {}),
});

// --- Session cache (client-side hint only) --------------------------------
// The real credential is the backend's httpOnly `access_token` cookie, which
// JS cannot read. We cache the user object in sessionStorage purely so the UI
// can render immediately on navigation without awaiting /auth/me. The cache is
// never trusted for authorization — protected data comes from the API, which
// validates the cookie server-side.

export const getSessionUser = (): AuthUser | null => {
  if (typeof window === "undefined") return null;
  try {
    const stored = window.sessionStorage.getItem(USER_STORAGE_KEY);
    if (!stored) return null;
    return JSON.parse(stored) as AuthUser;
  } catch (error) {
    console.error("Failed to read session user", error);
    return null;
  }
};

export const setSessionUser = (user: AuthUser) => {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
};

export const clearSessionUser = () => {
  if (typeof window === "undefined") return;
  window.sessionStorage.removeItem(USER_STORAGE_KEY);
};

// --- Backend-backed auth actions ------------------------------------------

/**
 * Authenticate against the real backend. On success the backend sets the
 * httpOnly cookie; we cache the returned user for the UI and return it.
 * Throws ApiError on failure (caller renders the message).
 */
export const login = async (email: string, password: string): Promise<AuthUser> => {
  const data = await apiFetch<LoginResponse>("/auth/login", {
    method: "POST",
    json: { email: email.trim().toLowerCase(), password },
  });
  const user = toAuthUser(data.user);
  setSessionUser(user);
  return user;
};

/**
 * Re-hydrate the current user from the cookie via /auth/me. Returns null if
 * not authenticated (expired/absent cookie). Keeps the session cache in sync.
 */
export const fetchCurrentUser = async (): Promise<AuthUser | null> => {
  try {
    const u = await apiFetch<BackendUser>("/auth/me", { method: "GET" });
    const user = toAuthUser(u);
    setSessionUser(user);
    return user;
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) {
      clearSessionUser();
      return null;
    }
    throw error;
  }
};

/** Clear the backend cookie and the local cache. */
export const logout = async (): Promise<void> => {
  try {
    await apiFetch("/auth/logout", { method: "POST" });
  } catch (error) {
    // Even if the network call fails, drop the local session.
    console.warn("Logout request failed; clearing local session anyway.", error);
  } finally {
    clearSessionUser();
  }
};

// --- Synchronous helpers (unchanged signatures) ---------------------------

export const isAuthenticated = () => Boolean(getSessionUser());

export const getUserRole = (): UserRole | null => getSessionUser()?.role ?? null;

export const getUserHomeRoute = (role: UserRole) => {
  if (role === "guardian") {
    return "/student?mode=guardian";
  }
  return `/${role}`;
};

export const isAuthorized = (role: UserRole, allowedRoles: UserRole | UserRole[]) => {
  const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
  return roles.includes(role);
};

export const getRoleLabel = (role: UserRole) => roleDisplayNames[role];
