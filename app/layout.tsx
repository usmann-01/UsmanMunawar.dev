import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "../styles/globals.css";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { siteName, siteUrl, siteDescription, defaultOgImage } from "@/lib/site-config";

// Type system (design pass): IBM Plex Mono is the display/structural face —
// headings, wordmark, labels, code — leaning into the monospace identity of a
// systems programmer. IBM Plex Sans is its companion body face for calm,
// long-form reading. A designed superfamily, self-hosted by next/font (no
// external requests, no layout-shift), only the weights we actually use.
const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const homeTitle = `${siteName} — Developer & Builder`;

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
      className={`${plexSans.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
