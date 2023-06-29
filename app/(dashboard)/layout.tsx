import "@/styles/global.css";
import { Inter } from "next/font/google";
import GlassPane from "@/components/GlassPane";
import Sidebar from "@/components/Sidebar";
import { ReactElement } from "react";
import { Toaster } from "@/components/ui/toaster";

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
    <div
      suppressHydrationWarning={true}
      className="h-screen w-screen candy-mesh p-6 sm:p-4"
    >
      <GlassPane
        className="w-full h-full flex sm:flex-col-reverse items-center p-4 sm:p-2"
        style={{ maxWidth: "100vw", overflow: "hidden" }}
      >
        <Sidebar />
        {children}
      </GlassPane>
      <Toaster />
    </div>
  );
}
