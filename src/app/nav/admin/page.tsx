import {ProtectedRoute} from "~/components/ProtectedRoute";

export default function AdminPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <div>Admin Page</div>
    </ProtectedRoute>
  );
}
