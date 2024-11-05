import ScheduleEditor from "~/components/home/scheduleEditor";
import { ProtectedRoute } from "~/components/ProtectedRoute";
import { db } from "~/server/db";
export default async function ScheduleEditorPage({
  params,
}: {
  params: { scheduleSlug: string };
}) {
  const schedule = await db.query.schedule.findMany({
    where: (schedule, { eq }) => eq(schedule.id, parseInt(params.scheduleSlug)),
  });
  return (
    <ProtectedRoute requiredRole="admin">
      <ScheduleEditor
        schedule={schedule[0]?.content}
        scheduleId={parseInt(params.scheduleSlug)}
      />
    </ProtectedRoute>
  );
}
