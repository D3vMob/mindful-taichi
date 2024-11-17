import { type StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { handleCapitalizeFirstLetter } from "~/lib/utils";
import { type Users } from "~/server/db/schema";

interface AdminCardProps {
  user: Users;
  image?: string | StaticImport;
}

export default function AdminCard({ user, image }: AdminCardProps) {
  return (
    <div className="relative flex min-w-full items-center justify-between gap-4 rounded-lg border-2 border-border/50 px-2 py-1 hover:border-primary md:min-w-96">
      <div className="flex items-center gap-2">
        <div className="relative aspect-square h-9">
          {image ? (
            <Image
              src={image}
              alt="personal image"
              fill
              sizes="(max-width: 36px) 100vw, 36px"
              className="rounded-full object-cover shadow-sm"
              loading="lazy"
            />
          ) : (
            <div className="h-full w-full rounded-full bg-gray-200" />
          )}
        </div>
        <div className="flex flex-col">
          <h4 className="text-xl font-bold text-foreground">
            {user.surname} {user.name}
          </h4>
          <div className="text-sm text-foreground">{user.email}</div>
        </div>
      </div>
      <div className="text-sm font-bold text-foreground">
        {handleCapitalizeFirstLetter(user.role ?? "")}
      </div>
    </div>
  );
}
