import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/shared/Header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TacticBasicsFootball | Pizarra tactica para entrenadores",
  description:
    "Pizarra tactica de futbol gratis, open source y moderna. Editor 2D y 3D, formaciones preset, grabacion de jugadas y biblioteca de entrenamientos.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
  applicationName: "TacticBasicsFootball",
  keywords: [
    "futbol",
    "tactica",
    "entrenador",
    "pizarra tactica",
    "formaciones",
    "entrenamientos",
    "tactical board",
    "football coaching",
  ],
  authors: [{ name: "meser1905" }],
  openGraph: {
    title: "TacticBasicsFootball",
    description: "Pizarra tactica de futbol gratis y open source para entrenadores",
    type: "website",
    locale: "es_AR",
    images: ["/readmelogo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "TacticBasicsFootball",
    description: "Pizarra tactica de futbol gratis y open source para entrenadores",
    images: ["/readmelogo.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
