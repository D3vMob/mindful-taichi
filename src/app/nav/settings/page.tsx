import { auth } from "~/lib/firebase/firebase";
import { redirect } from "next/navigation";
import { ProtectedRoute } from "~/components/ProtectedRoute";
import { DisplayName } from "~/components/settings/displayName";
import { PersonalImage } from "~/components/settings/personalImage";

import { deleteFirebaseUser } from "~/lib/firebase/firebaseAdmin";
import { deleteUser } from "~/server/usersQueries";
import { DeleteCurrentUser } from "~/components/settings/deleteCurrentUser";

// Create the server action

export default function SettingsPage() {
  return (
    <ProtectedRoute>
      <div className="flex flex-col items-center gap-4 pt-2">
        <h1>設定ページ</h1>
        <PersonalImage />
        <DisplayName />
        <DeleteCurrentUser />
      </div>
    </ProtectedRoute>
  );
}
