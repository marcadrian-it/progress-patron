import "@/styles/global.css";
import { Inter } from "next/font/google";
import GlassPane from "@/components/GlassPane";
import Sidebar from "@/components/Sidebar";
import { ReactElement } from "react";

type DashboardRootLayoutProps = {
  children: ReactElement;
};

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export default function DashboardRootLayout({
  children,
}: DashboardRootLayoutProps) {
  return (
    <html lang="en" className={inter.variable}>
      <head />
      <body
        suppressHydrationWarning={true}
        className="h-screen w-screen candy-mesh p-6 sm:p-4"
      >
        <GlassPane
          className="w-full h-full flex sm:flex-col items-center p-4 sm:p-2"
          style={{ maxWidth: "100vw", overflow: "hidden" }}
        >
          <Sidebar />
          {children}
        </GlassPane>
        <div id="modal"></div>
        <div id="modal-task"></div>
      </body>
    </html>
  );
}
