import Navigation from "~/components/navigation";
import { db } from "~/server/db";

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {

  const channelList = await db.query.channels.findMany();
  return (
    <>
      <div className="hidden flex-row gap-4 md:flex md:z-10 md:fixed md:top-16 md:left-0 h-screen">
        <Navigation channelList={channelList} />
      </div>
      <div className="grow w-screen!important overflow-x-hidden md:ml-48">{children}</div>
    </>
  );
}
