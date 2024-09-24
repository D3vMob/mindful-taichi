import { type User } from "firebase/auth";
import { updateProfile } from "firebase/auth";


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

