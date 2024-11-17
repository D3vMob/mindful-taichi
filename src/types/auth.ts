export type UserRole = "admin" | "user" | "guest";

export interface Permission {
  action: "create" | "read" | "update" | "delete";
  resource: "users" | "channels" | "videos" | "settings";
}

export interface UserClaims {
  role: UserRole;
  permissions: Permission[];
}

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  role: UserRole;
  permissions: string[];
}

export type AuthStatus = {
  user: AuthUser | null;
  loading: boolean;
  error: Error | null;
};

export enum AuthMode {
  SIGN_IN = "SIGN_IN",
  SIGN_UP = "SIGN_UP",
  RESET_PASSWORD = "RESET_PASSWORD",
}
