import { db } from "~/server/db";

export default async function AdminPage({
  params,
}: {
  params: { adminSlug: string };
}) {
    const userDetails = await db.query.users.findFirst({
        where: (users, {eq}) => eq(users.uuid, params.adminSlug)
    })
  return <div>{userDetails?.name ?? "No user found"}</div>;
}
