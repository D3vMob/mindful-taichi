import Navigation from "~/components/navigation";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <div className="hidden flex-row gap-4 md:flex">
        <Navigation />
      </div>
      <div className="grow content-center text-center">{children}</div>
    </>
  );
}
