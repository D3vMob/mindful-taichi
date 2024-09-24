import { ProtectedRoute } from "~/components/ProtectedRoute";

export default function SettingsPage() {
  return (
    <ProtectedRoute>
      <h1>Settings Page</h1>
    </ProtectedRoute>
  );
}
