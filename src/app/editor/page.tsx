import Post from "~/components/editor/NotePicker";
import {ProtectedRoute} from "~/components/ProtectedRoute";

export default function EditorPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <Post />
    </ProtectedRoute>
  );
}
