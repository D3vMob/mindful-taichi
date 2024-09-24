"use client";
import { type ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCurrentUserStore } from "~/store/useCurrentUsertStore";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: "admin" | "user";
}

export const ProtectedRoute = ({
  children,
  requiredRole,
}: ProtectedRouteProps) => {
  const { role, setUserRole } = useCurrentUserStore();
  const router = useRouter();

  useEffect(() => {
    if (!role) {
      router.push("/");
    } else if (requiredRole && role !== "admin") {
      router.push("/");
    }
  }, [role, requiredRole, router, setUserRole]);

  if (!role || (requiredRole && role !== "admin")) {
    return null;
  }

  return <>{children}</>;
};
