"use client";
import { useEffect} from "react";
import {ProtectedRoute} from "~/components/ProtectedRoute";
import { setCustomClaim } from "~/lib/firebase/auth";
import { auth } from "~/lib/firebase/firebase";
import { revokeRefreshTokens } from "~/lib/firebase/firebaseAdmin";
// import { getUserClaims } from "~/lib/firebase/firebaseAdmin";


export default function AdminPage() {
  const user = auth.currentUser;

  useEffect(() => {
    const fetchClaims = async () => {
      if (user) {
        try {
          if (auth.currentUser) {
            const idTokenResult = (await user.getIdTokenResult());
            console.log(auth.currentUser)
            // void revokeRefreshTokens(auth.currentUser.uid)
            void setCustomClaim(auth.currentUser.uid, { role: "admin" })
            console.log(idTokenResult)
          }
          // setClaims(idTokenResult.claims as Record<string, string>);
        } catch (error) {
          console.error("Error fetching claims:", error);
        }
      }
    };

    void fetchClaims();
  }, [user]);
  return (
    <ProtectedRoute requiredRole="admin">
      <div>Admin Page</div>
    </ProtectedRoute>
  );
}
