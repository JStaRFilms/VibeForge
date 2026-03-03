import type { Metadata, Viewport } from 'next';
import './globals.css';
import { instrumentSerif, geistMono } from '@/lib/fonts';

const titleStr = 'VibeCoding Protocol Suite | Code at the Speed of Thought';
const descriptionStr = 'The VibeCoding Protocol Suite – A premium system of 64 AI-coding skills and 26 workflows designed for modern web development.';

export const metadata: Metadata = {
  title: {
    default: titleStr,
    template: '%s | VibeCoding Protocol Suite'
  },
  description: descriptionStr,
  keywords: ['VibeCoding', 'Protocol Suite', 'AI Coding', 'Cursor', 'Next.js', 'React', 'TypeScript', 'Web Development'],
  authors: [{ name: 'VibeForge' }],
  creator: 'VibeForge',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://takumi.jstarstudios.com',
    title: 'VibeCoding Protocol Suite',
    description: descriptionStr,
    siteName: 'VibeCoding Protocol Suite',
    images: [{
      url: '/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'VibeCoding Protocol Suite',
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VibeCoding Protocol Suite',
    description: descriptionStr,
    images: ['/og-image.jpg'],
    creator: '@vibeforge'
  },
  metadataBase: new URL('https://takumi.jstarstudios.com'),
};

export const viewport: Viewport = {
  themeColor: '#0b1221',
  colorScheme: 'dark',
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "VibeCoding Protocol Suite",
  "operatingSystem": "Any",
  "applicationCategory": "DeveloperApplication",
  "description": descriptionStr,
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "author": {
    "@type": "Organization",
    "name": "VibeForge"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=satoshi@700&f[]=general-sans@400;500&display=swap"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${instrumentSerif.variable} ${geistMono.variable} antialiased`}
      >
        <div className="bg-grain" />
        {children}
      </body>
    </html>
  );
}
