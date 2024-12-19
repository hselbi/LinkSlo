import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://link-slo.vercel.app'),
  title: 'LinkSlo - Simple & Secure URL Shortener',
  description: 'Transform long URLs into clean, manageable links instantly. Free URL shortening service with enterprise-grade security and reliability.',
  keywords: 'url shortener, link shortener, short links, url redirect, link management',
  authors: [{ name: 'LinkSlo' }],
  openGraph: {
    title: 'LinkSlo - Simple & Secure URL Shortener',
    description: 'Transform long URLs into clean, manageable links instantly',
    type: 'website',
    siteName: 'LinkSlo',
    images: [
      {
        url: '/og-image.png', // Make sure to add this image to your public folder
        width: 1200,
        height: 630,
        alt: 'LinkSlo URL Shortener'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LinkSlo - Simple & Secure URL Shortener',
    description: 'Transform long URLs into clean, manageable links instantly',
    images: ['/og-image.png']
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        {children}
        <Toaster richColors/>
      </body>
    </html>
  );
}