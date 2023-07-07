import "@/styles/global.css";
import { Inter } from "next/font/google";
import GlassPane from "@/components/GlassPane";
import Sidebar from "@/components/Sidebar";
import { ReactElement } from "react";
import { Toaster } from "@/components/ui/toaster";

export const metadata = {
  title: "Progress patron",
  description: "A modern tool for managing projects, tasks, and issues",
  authors: [{ name: "Adrian", url: "https://marcadrian.me" }],
  creator: "marcadrian",
};

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
      <body
        suppressHydrationWarning={true}
        className="h-screen w-screen candy-mesh p-6 sm:p-2"
      >
        <GlassPane
          className="w-full h-full flex sm:flex-col-reverse items-center p-4 sm:p-2"
          style={{ maxWidth: "100vw", overflow: "hidden" }}
        >
          <Sidebar />
          {children}
        </GlassPane>
        <div id="modal"></div>
        <div id="modal-task"></div>
        <div id="modal-issue"></div>
        <Toaster />
      </body>
    </html>
  );
}
