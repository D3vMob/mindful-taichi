import Navigation from "~/components/navigation";
import { db } from "~/server/db";

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {

  const channelList = await db.query.channels.findMany();
  return (
    <>
      <div className="hidden flex-row gap-4 md:flex">
        <Navigation channelList={channelList} />
      </div>
      <div className="grow max-w-screen!important overflow-x-hidden">{children}</div>
    </>
  );
}
