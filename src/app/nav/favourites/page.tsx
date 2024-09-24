import { ProtectedRoute } from "~/components/ProtectedRoute";

export default function FavouritesPage() {
  return (
    <ProtectedRoute>
      <h1>Favourites Page</h1>
    </ProtectedRoute>
  );
}
