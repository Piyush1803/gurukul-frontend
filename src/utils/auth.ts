import {jwtDecode} from "jwt-decode";

interface DecodedToken {
  sub: string;
  email: string;
  role: string;
  exp?: number;
  iat?: number;
}

export function getUserRoleFromToken(): string | null {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode<DecodedToken>(token);
    return decoded.role || null;
  } catch (err) {
    console.error("Invalid token", err);
    return null;
  }
}
