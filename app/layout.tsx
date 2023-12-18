"use client";
// app/layout.tsx
import {ThemeProvider} from "next-themes";
import {Providers} from "./providers";
import React from "react";
import "../styles/global.scss";
import TrackingScripts from "@/components/trackingScripts";
import {SpeedInsights} from "@vercel/speed-insights/next"
export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <ThemeProvider attribute="class">{children}</ThemeProvider>
        </Providers>
        <TrackingScripts />
        <SpeedInsights />
      </body>
    </html>
  );
}
