"use client";
import { type ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCurrentUserStore } from "~/store/useCurrentUsertStore";
import { Loader2Icon } from "lucide-react";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: "admin" | "user";
}

export const ProtectedRoute = ({
  children,
  requiredRole,
}: ProtectedRouteProps) => {
  const [loading, setLoading] = useState(true);
  const { role } = useCurrentUserStore();
  const router = useRouter();

  useEffect(() => {
    if (role === undefined || role === null) {
      setLoading(true);
    } else if (!role) {
      router.push("/");
      setLoading(false);
    } else if (requiredRole && role !== "admin") {
      router.push("/");
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [role, requiredRole, router]);

  if (loading) {
    return (
      <Loader2Icon className="mx-auto size-16 h-screen animate-spin items-center justify-center" />
    );
  }

  if (!role || (requiredRole && role !== "admin")) {
    return null;
  }

  return <>{children}</>;
};
