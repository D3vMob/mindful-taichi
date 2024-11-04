"use server";

import { revalidatePath } from "next/cache";

export async function refreshPosts() {
  revalidatePath("/");
}

export async function refreshChannels() {
  revalidatePath("/nav/admin");
}

export async function refreshUsers() {
  revalidatePath("/nav/admin");
}

export async function refreshSettings() {
  revalidatePath("/nav/settings");
}

export async function refreshSchedule() {
  revalidatePath("/nav/schedule");
}
