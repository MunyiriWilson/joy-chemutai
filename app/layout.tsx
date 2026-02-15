import type { Metadata } from "next";
import { Great_Vibes, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const script = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script",
  display: "swap",
});

const body = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "A Scrapbook For You 💜",
  description: "A vintage lilac scrapbook of our memories",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${script.variable} ${body.variable}`}>
      <body className="relative min-h-screen overflow-x-hidden">

        {/* Vintage lilac background */}
        <div
          className="fixed inset-0 -z-20"
          style={{
            background: `
              radial-gradient(circle at 20% 20%, #ffffff 0%, #f8f5ff 25%, #efeaff 50%, #e6ddff 75%, #ddd0ff 100%)
            `,
          }}
        />

        {/* subtle paper texture tint */}
        <div
          className="fixed inset-0 -z-10 opacity-30"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                45deg,
                rgba(255,255,255,0.4) 0px,
                rgba(255,255,255,0.4) 2px,
                transparent 2px,
                transparent 6px
              )
            `,
          }}
        />

        {children}
      </body>
    </html>
  );
}
