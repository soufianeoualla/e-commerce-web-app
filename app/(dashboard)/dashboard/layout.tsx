import { Sidebar } from "@/components/Dashboard/Sidebar";
import { DataUpdateProvider } from "@/context/dataUpdate";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className=" bg-W100 h-screen">
          <Sidebar />
          <DataUpdateProvider>
            <div className="ml-[250px]   p-8 ">{children}</div>
          </DataUpdateProvider>
        </div>
      </body>
    </html>
  );
}
