import "@/styles/global.css";
import { Inter } from "next/font/google";
import { ReactElement } from "react";
import { ClerkProvider } from "@clerk/nextjs";

type MainRootLayoutProps = {
  children: ReactElement;
};

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export default function MainRootLayout({ children }: MainRootLayoutProps) {
  return (
    <ClerkProvider>
      <html lang="en" className={inter.variable}>
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
