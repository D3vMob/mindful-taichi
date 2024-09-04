import Navigation from "~/components/navigation";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex flex-row gap-4 min-h-screen">
       <Navigation />
      <div className="w-full content-center text-center">{children}</div>
    </div>
  );
}
