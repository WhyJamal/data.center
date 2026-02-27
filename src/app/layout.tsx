import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { SectionProvider } from "@/shared/context/SectionContext";
import AudioPlayer from "@/components/audio-player";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "Data center Kvarts",
  description: "Data center",
  icons: {
    icon: "/icons/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${manrope.variable} antialiased`}>
        <SectionProvider>
          <AudioPlayer />
          {children}
        </SectionProvider>
      </body>
    </html>
  );
}
