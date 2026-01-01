import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: {
    default: "Seller Sense",
    template: "%s | Seller Sense",
  },
  description:
    "Seller Sense is an AI-powered seller intelligence platform for inventory, alerts, trends, and operational insights.",
  applicationName: "Seller Sense",
  keywords: [
    "Seller Sense",
    "inventory management",
    "AI alerts",
    "ecommerce analytics",
    "seller dashboard",
    "stock forecasting",
  ],
  authors: [{ name: "Seller Sense" }],
  creator: "Seller Sense",
  metadataBase: new URL("https://sellersense.ai"), // change if needed
  openGraph: {
    title: "Seller Sense",
    description:
      "AI-powered insights for inventory, alerts, and trends to help sellers scale smarter.",
    siteName: "Seller Sense",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Seller Sense",
    description:
      "AI-powered seller intelligence for inventory, alerts, and trends.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = process.env.NEXT_PUBLIC_DEFAULT_THEME || "light";
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
