import "@/styles/global.css";
import GlassPane from "@/components/GlassPane";
import { ReactElement } from "react";
import { Inter } from "next/font/google";

type AuthRootLayoutProps = {
  children: ReactElement;
};

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export default function AuthRootLayout({ children }: AuthRootLayoutProps) {
  return (
    <div>
      <div className="h-screen w-screen rainbow-mesh p-6">
        <GlassPane className="w-full h-full flex items-center justify-center">
          {children}
        </GlassPane>
      </div>
    </div>
  );
}
