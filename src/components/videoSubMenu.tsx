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
    "bg-gradient-to-r from-gray-300 to-gray-100 md:bg-gradient-to-r md:from-gray-100 md:to-gray-300";

  return (
    <>
      {channelList.map((channel) =>
        access.includes(channel.shortName) ? (
          <Link
            key={channel.id}
            href={`/nav/video/${channel.name}/${channel.playlistId}`}
            className={`select-none py-2 pl-8 text-sm hover:bg-gray-200 ${path === `${channel.name}` ? classString : ""}`}
            onClick={toggle}
          >
            {channel.name}
          </Link>
        ) : (
          <div
            key={channel.id}
            className={`select-none py-2 pl-8 text-sm text-gray-400 hover:bg-gray-200 ${path === `${channel.name}` ? classString : ""}`}
          >
            {channel.name}
          </div>
        ),
      )}
    </>
  );
}
