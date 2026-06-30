import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { siteName, siteUrl, siteDescription, defaultOgImage } from "@/lib/site-config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const homeTitle = `${siteName} — Systems Developer`;

// Site-wide OG/Twitter defaults (Section 12). Next.js shallowly replaces the
// whole openGraph/twitter object per route segment, so every page that needs
// unique social copy (blog posts, project details) builds its own complete
// object via lib/metadata.ts rather than relying on these as a base to extend.
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: homeTitle,
  description: siteDescription,
  openGraph: {
    title: homeTitle,
    description: siteDescription,
    url: siteUrl,
    siteName,
    type: "website",
    images: [{ url: defaultOgImage }],
  },
  twitter: {
    card: "summary_large_image",
    title: homeTitle,
    description: siteDescription,
    images: [defaultOgImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
