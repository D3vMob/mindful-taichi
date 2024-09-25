import { FavPlayer } from "~/components/favPlayer";
import { ProtectedRoute } from "~/components/ProtectedRoute";

export default async function FavouritesPage() {
  return (
    <ProtectedRoute>
      <FavPlayer />
    </ProtectedRoute>
  );
}
