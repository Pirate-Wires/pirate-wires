import "@/styles/tailwind.css";
import { Providers } from "./providers";
import { cx } from "@/utils/all";
import { Inter, Lora, Spectral } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
});

const spectral = Spectral({
  weight: '400',
  subsets: ["latin"],
  variable: "--font-spectral"
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora"
});

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cx(inter.variable, lora.variable, spectral.variable)}>
      <body className="antialiased text-gray-800 dark:bg-neutral-950 dark:text-gray-400">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
