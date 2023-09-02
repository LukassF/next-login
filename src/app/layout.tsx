import Providers from "@/components/Providers";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Text'em",
  description: "Chat with frinds and strangers alike!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
        <script
          src="https://kit.fontawesome.com/f83777b1f5.js"
          crossOrigin="anonymous"
          async
        ></script>
      </body>
    </html>
  );
}
