import { create } from "zustand";

type UserState = {
  role: string | null;
};

type UserUpdate = {
    setUserRole: (role: string) => void;
}

type UserStore = UserState & UserUpdate;
import { persist, createJSONStorage } from 'zustand/middleware';

export const useCurrentUserStore = create<UserStore>()(
    persist(
        (set) => ({
            role: null,
            setUserRole: (value) => set({ role: value }),
        }),
        {
            name: "user-store",
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);