"use client";
import { type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "~/context/authContext";
import { type UserRole, type Permission } from "~/types/auth";
import { PermissionService } from "~/services/permissionService";
import { Loader2Icon } from "lucide-react";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: UserRole;
  requiredPermissions?: Permission[];
}

export const ProtectedRoute = ({
  children,
  requiredRole,
  requiredPermissions,
}: ProtectedRouteProps) => {
  const { user, loading, error } = useAuth();
  const router = useRouter();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2Icon className="size-16 animate-spin" />
      </div>
    );
  }

  if (error || !user) {
    router.push("/login");
    return null;
  }
  // Check role
  if (requiredRole && user.role !== requiredRole && user.role !== "admin") {
    router.push("/unauthorized");
    return null;
  }

  // Check permissions
  if (requiredPermissions?.length) {
    const hasPermissions = PermissionService.hasAllPermissions(
      user.permissions as unknown as Permission[],
      requiredPermissions,
    );

    if (!hasPermissions) {
      router.push("/unauthorized");
      return null;
    }
  }

  return <>{children}</>;
};
