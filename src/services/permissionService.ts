import { type Permission, UserRole } from "~/types/auth";

// Define role-based permissions
const rolePermissions: Record<UserRole, Permission[]> = {
  admin: [
    { action: "create", resource: "users" },
    { action: "read", resource: "users" },
    { action: "update", resource: "users" },
    { action: "delete", resource: "users" },
    { action: "create", resource: "channels" },
    { action: "read", resource: "channels" },
    { action: "update", resource: "channels" },
    { action: "delete", resource: "channels" },
    { action: "create", resource: "videos" },
    { action: "read", resource: "videos" },
    { action: "update", resource: "videos" },
    { action: "delete", resource: "videos" },
  ],
  user: [
    { action: "read", resource: "channels" },
    { action: "read", resource: "videos" },
    { action: "update", resource: "settings" },
  ],
  guest: [
    { action: "read", resource: "channels" },
    { action: "read", resource: "videos" },
  ],
};

export class PermissionService {
  static getPermissionsForRole(role: UserRole): Permission[] {
    return rolePermissions[role] ?? [];
  }

  static hasPermission(
    userPermissions: Permission[],
    requiredPermission: Permission,
  ): boolean {
    return userPermissions.some(
      (p) =>
        p.action === requiredPermission.action &&
        p.resource === requiredPermission.resource,
    );
  }

  static hasAllPermissions(
    userPermissions: Permission[],
    requiredPermissions: Permission[],
  ): boolean {
    return requiredPermissions.every((required) =>
      this.hasPermission(userPermissions, required),
    );
  }
}
