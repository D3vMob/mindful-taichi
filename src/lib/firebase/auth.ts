import { type User } from "firebase/auth";
import { auth } from "./firebase";
import { updateProfile } from "firebase/auth";

export const signout = async () => {
    try {
        await auth.signOut();
    } catch (error) {
        console.error("Error signing out:", error);
    }
}

export const updateUserPhoto = async (user: User, url: string) => {
    try {
        await updateProfile(user,{
            photoURL: url,
        });
    } catch (error) {
        console.error("Error updating user photo:", error);
    }
}

export const updateUserName = async (user: User, name: string) => {
    try {
        await updateProfile(user,{
            displayName: name,
        });
    } catch (error) {
        console.error("Error updating user name:", error);
    }
}

