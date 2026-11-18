import type { Metadata, Viewport } from "next";
import { Baloo_2 } from "next/font/google";
import "./globals.css";

const baloo = Baloo_2({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-baloo",
});

export const metadata: Metadata = {
  title: "Nerede? | Okul Öncesi Dil ve Konuşma Oyunu",
  description:
    "Okul öncesi çocuklar için 'nerede' sorusu çalışma oyunu. Bir karakter seç, ihtiyacını dinle ve şehirde doğru yeri bul.",
};

export const viewport: Viewport = {
  themeColor: "#fef3c7",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={baloo.variable}>
      <body>{children}</body>
    </html>
  );
}
