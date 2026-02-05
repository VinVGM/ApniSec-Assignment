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
  title: "CYBER-GM - Elite Cybersecurity Solutions",
  description: "Virtual CISO, VAPT, and Compliance services for the modern enterprise. Build your own in-house security team.",
  openGraph: {
    title: "CYBER-GM - Elite Cybersecurity Solutions",
    description: "Virtual CISO, VAPT, and Compliance services for the modern enterprise.",
    url: "https://cyber-gm.com",
    siteName: "CYBER-GM",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/opengraph.png",
        width: 1200,
        height: 630,
        alt: "CYBER-GM - Elite Cybersecurity Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CYBER-GM - Elite Cybersecurity Solutions",
    description: "Virtual CISO, VAPT, and Compliance services for the modern enterprise.",
    creator: "@cybergm",
    images: ["/opengraph.png"],
  },
  icons: {
    icon: "/logo.svg",
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
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
