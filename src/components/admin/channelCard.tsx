import { type Channels } from "~/server/db/schema";

export default function ChannelCard({ channel }: { channel: Channels }) {
  return (
    <div className="flex min-w-full items-center justify-between gap-4 rounded-lg border-2 border-border/50 px-2 py-1 hover:border-primary md:min-w-96">
      <div className="flex flex-col justify-between">
        <h4 className="text-xl font-bold text-foreground">{channel.name}</h4>
        <div className="text-sm text-foreground">{channel.playlistId}</div>
      </div>
      <div className="font-bold">{channel.shortName}</div>
    </div>
  );
}
