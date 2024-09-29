import { ProtectedRoute } from "~/components/ProtectedRoute";
import { DisplayName } from "~/components/settings/displayName";
import { PersonalImage } from "~/components/settings/personalImage";

export default function SettingsPage() {
  return (
    <ProtectedRoute>
      <div className="flex flex-col items-center gap-4 pt-16">
        <h1>Settings Page</h1>
        <PersonalImage />
        <DisplayName />
      </div>
    </ProtectedRoute>
  );
}
