"use client";
// app/layout.tsx
// import supabase from '@/lib/supabase-comments/utils/initSupabase';
// import { UserContextProvider } from '@/lib/supabase-comments/hooks/use-user';
import {ThemeProvider} from "next-themes";
import {Providers} from "./providers";
import {cx} from "@/utils/all";
import type {AppProps} from "next/app";
import React from "react";
import "../styles/global.scss";
export default function RootLayout({children}: {children: React.ReactNode}) {
  // TODO: properly load typekit fonts
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          {/* <UserContextProvider supabaseClient={supabase}> */}
          <ThemeProvider attribute="class">{children}</ThemeProvider>
          {/* </UserContextProvider> */}
        </Providers>
      </body>
    </html>
  );
}
