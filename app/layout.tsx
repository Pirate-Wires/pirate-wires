import "@/styles/tailwind.css";
import { Providers } from "./providers";
import { cx } from "@/utils/all";
import { Inter, Lora } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
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
      className={cx(inter.variable, lora.variable)}>
      <body className="antialiased text-gray-800 dark:bg-black dark:text-gray-400">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

// Temporary work-around for the cookie issues with Supabase Auth
// https://github.com/vercel/nextjs-subscription-payments/issues/201#issuecomment-1610863734
// export const revalidate = 0;
// not doing `export const revalidate = 0;` anymore. 
// did this to fix: https://github.com/vercel/nextjs-subscription-payments/issues/201#issuecomment-1620501090
