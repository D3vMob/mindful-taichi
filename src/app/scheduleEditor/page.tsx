import ScheduleEditor from "~/components/home/scheduleEditor";
import { ProtectedRoute } from "~/components/ProtectedRoute";

export default function ScheduleEditorPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <ScheduleEditor />
    </ProtectedRoute>
  );
}
