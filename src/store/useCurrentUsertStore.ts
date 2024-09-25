import { create } from "zustand";

type UserState = {
  role: string | null;
  fav: string[] | null;
};

type UserUpdate = {
  setUserRole: (role: string | null) => void;
  setFav: (fav: string[] | null) => void;
};

type UserStore = UserState & UserUpdate;
import { persist, createJSONStorage } from "zustand/middleware";

export const useCurrentUserStore = create<UserStore>()(
  persist(
    (set) => ({
      role: null,
      fav: null,
      setUserRole: (value) => set({ role: value }),
      setFav: (value) => set({ fav: value }),
    }),
    {
      name: "user-store",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
