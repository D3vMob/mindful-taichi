import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { AuthLayout } from "~/components/login/AuthLayout";

export default async function LoginPage() {
  // Redirect if user is already authenticated
  const session = cookies().get("session");

  if (session) {
    redirect("/");
  }

  return <AuthLayout />;
}
