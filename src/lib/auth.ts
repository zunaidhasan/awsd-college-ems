export type UserRole = "admin" | "teacher" | "student" | "guardian";

export interface AuthUser {
  role: UserRole;
  username: string;
  name: string;
}

const USER_STORAGE_KEY = "awsd-ems-user";

const roleDisplayNames: Record<UserRole, string> = {
  admin: "Principal / Admin",
  teacher: "Teacher",
  student: "Student",
  guardian: "Guardian",
};

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
