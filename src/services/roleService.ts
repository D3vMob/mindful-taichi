import { type UserClaims, type Permission, UserRole } from "~/types/auth";
import { auth } from "~/lib/firebase/firebase";
import { PermissionService } from "./permissionService";

export class RoleService {
  private static instance: RoleService;

  private constructor() {}

  public static getInstance(): RoleService {
    if (!RoleService.instance) {
      RoleService.instance = new RoleService();
    }
    return RoleService.instance;
  }

  async setUserRole(uid: string, role: UserRole): Promise<void> {
    try {
      const permissions = PermissionService.getPermissionsForRole(role);
      const claims: UserClaims = {
        role,
        permissions,
      };

      const response = await fetch("/api/setCustomClaims", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uid, claims }),
      });

      if (!response.ok) {
        throw new Error("Failed to set user role");
      }

      // Force token refresh
      const user = auth.currentUser;
      if (user) {
        await user.getIdToken(true);
      }
    } catch (error) {
      console.error("Error setting user role:", error);
      throw error;
    }
  }

  async getUserClaims(forceRefresh = false): Promise<UserClaims | null> {
    try {
      const user = auth.currentUser;
      if (!user) return null;

      const tokenResult = await user.getIdTokenResult(forceRefresh);
      return {
        role: (tokenResult.claims.role as UserRole) ?? "guest",
        permissions: (tokenResult.claims.permissions as Permission[]) ?? [],
      };
    } catch (error) {
      console.error("Error getting user claims:", error);
      return null;
    }
  }
}

export const roleService = RoleService.getInstance();
