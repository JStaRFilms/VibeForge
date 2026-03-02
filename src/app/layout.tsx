import type { Metadata } from 'next';
import './globals.css';
import { instrumentSerif, geistMono } from '@/lib/fonts';

export const metadata: Metadata = {
  title: 'VibeForge',
  description: 'Terminal Noir meets Art Deco',
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
