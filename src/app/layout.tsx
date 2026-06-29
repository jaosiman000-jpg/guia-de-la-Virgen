import type { Metadata } from "next";
import { Inter } from "next/font/google";
import MetaPixel from "@/components/MetaPixel";
import UtmifyPixel from "@/components/UtmifyPixel";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Guía de La Virgen",
  description:
    "Conoce el poder de los Embudos Interactivos para captar leads y vender a través de internet.",
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-MX" translate="no" className={`${inter.variable} h-full`}>
      <body className="min-h-full bg-white font-sans text-gray-950 antialiased">
        <MetaPixel />
        <UtmifyPixel />
        {children}
      </body>
    </html>
  );
}
