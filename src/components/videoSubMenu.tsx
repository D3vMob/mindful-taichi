import Link from "next/link";
import { type Channels } from "~/server/db/schema";

interface VideoSubMenuProps {
  channelList: Channels[];
  toggle?: () => void;
  path?: string;
}

export function VideoSubMenu({channelList, toggle, path}: VideoSubMenuProps) {

  const classString =
    "bg-gradient-to-r from-gray-300 to-gray-100 md:bg-gradient-to-r md:from-gray-100 md:to-gray-300";
  
  return (
    <>
      {channelList.map((channel) => {
        return (
          <Link
            key={channel.id}
            href={`/nav/video/${channel.name}/${channel.playlistId}`}
            className={`text-sm py-2 pl-8 select-none hover:bg-gray-200 ${path === `${channel.shortName}` ? classString : ""}`}
            onClick={toggle}
          >
            {channel.name}
          </Link>
        );
      })}
    </>
  );
}
