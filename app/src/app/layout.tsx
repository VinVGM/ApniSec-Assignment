import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ApniSec - Elite Cybersecurity Solutions",
  description: "Virtual CISO, VAPT, and Compliance services for the modern enterprise. Build your own in-house security team.",
  openGraph: {
    title: "ApniSec - Elite Cybersecurity Solutions",
    description: "Virtual CISO, VAPT, and Compliance services for the modern enterprise.",
    url: "https://apnisec.com",
    siteName: "ApniSec",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ApniSec - Elite Cybersecurity Solutions",
    description: "Virtual CISO, VAPT, and Compliance services for the modern enterprise.",
    creator: "@apnisec",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
