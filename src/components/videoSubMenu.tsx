import Link from "next/link";
import { type Channels } from "~/server/db/schema";

interface VideoSubMenuProps {
  channelList: Channels[];
  toggle?: () => void;
  path?: string;
  access?: string[];
}

export function VideoSubMenu({
  channelList,
  toggle,
  path,
  access,
}: VideoSubMenuProps) {
  if (!access) return;

  const classString =
    "bg-gradient-to-r from-border/40 to-background md:bg-gradient-to-r md:from-background md:to-border/40";

  return (
    <>
      {channelList.map((channel) =>
        access.includes(channel.shortName) ? (
          <Link
            key={channel.id}
            href={`/nav/video/${channel.name}/${channel.playlistId}`}
            className={`select-none py-2 pl-8 text-sm hover:bg-primary/20 ${path === `${channel.name}` ? classString : ""}`}
            onClick={toggle}
          >
            {channel.name}
          </Link>
        ) : (
          <div
            key={channel.id}
            className={`select-none py-2 pl-8 text-sm text-gray-400 hover:bg-primary/20 ${path === `${channel.name}` ? classString : ""}`}
          >
            {channel.name}
          </div>
        ),
      )}
    </>
  );
}
