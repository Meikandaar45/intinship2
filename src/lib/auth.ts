export interface AuthUser {
  id: string;
  email: string;
  name: string;
}

const AUTH_USER_KEY = "ipl_auth_user";
const AUTH_TOKEN_KEY = "ipl_auth_token";

export function getStoredUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(AUTH_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

export function setStoredSession(user: AuthUser, token: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
  localStorage.setItem(AUTH_TOKEN_KEY, token);
  window.dispatchEvent(new Event("ipl_auth_change"));
}

export function clearStoredSession() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(AUTH_USER_KEY);
  localStorage.removeItem(AUTH_TOKEN_KEY);
  window.dispatchEvent(new Event("ipl_auth_change"));
}

export async function loginUser(email: string, password: string): Promise<AuthUser> {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Login failed");
  }

  setStoredSession(data.user, data.session.access_token);
  return data.user;
}

export async function registerUser(email: string, password: string, name?: string): Promise<AuthUser> {
  const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, name }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Registration failed");
  }

  // After registration, auto login
  return loginUser(email, password);
}

export async function logoutUser(): Promise<void> {
  const token = getStoredToken();
  try {
    await fetch("/api/auth/logout", {
      method: "POST",
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
  } catch {
    // ignore
  } finally {
    clearStoredSession();
  }
}

export async function verifyCurrentSession(): Promise<AuthUser | null> {
  const token = getStoredToken();
  if (!token) return null;

  try {
    const res = await fetch("/api/auth/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    if (data.user) {
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(data.user));
      return data.user;
    } else {
      clearStoredSession();
      return null;
    }
  } catch {
    return getStoredUser();
  }
}
