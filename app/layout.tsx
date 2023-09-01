"use client"
// app/layout.tsx
import '@/styles/tailwind.css';
import supabase from '@/lib/supabase-comments/utils/initSupabase';
import { UserContextProvider } from '@/lib/supabase-comments/hooks/use-user';
import { ThemeProvider } from 'next-themes';
import { Providers } from './providers';
import { cx } from '@/utils/all';
import { Inter, Lora, Spectral } from 'next/font/google';
import type { AppProps } from 'next/app';
import React from 'react';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const spectral = Spectral({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-spectral',
});

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cx(inter.variable, lora.variable, spectral.variable)}>
      <body className="antialiased text-gray-800 dark:bg-neutral-950 dark:text-gray-400">
        <Providers>
          <UserContextProvider supabaseClient={supabase}>
            <ThemeProvider attribute="class">{children}</ThemeProvider>
          </UserContextProvider>
        </Providers>
      </body>
    </html>
  );
}
