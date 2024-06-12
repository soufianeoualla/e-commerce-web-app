import { Sidebar } from "@/components/Dashboard/Sidebar";
import type { Metadata } from "next";
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
        <div className=" bg-W100">
          <Sidebar />
          <div className="ml-[250px]  p-8 h-screen">{children}</div>
        </div>
      </body>
    </html>
  );
}
