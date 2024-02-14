import { SpeedInsights } from "@vercel/speed-insights/next"
import { ClerkProvider } from '@clerk/nextjs'
import {Providers} from "./providers";
import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { Inter } from 'next/font/google'
import './globals.css';
import { Toaster } from 'react-hot-toast';

export function generateViewport() {
  return {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: 'no',
    themeColor: '#18181b',
  };
}

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  
  title: 'Tracktive: Log, Analyze, and Optimize Your Workouts',
  description: 'Take Control of Your Fitness Goals with Tracktive. The intuitive workout tracking web app designed to optimize your gym sessions and improve your results.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Providers>
            <Toaster />
            {children}
          </Providers>
          <SpeedInsights/>
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  )
}
