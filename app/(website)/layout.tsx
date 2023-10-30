import SupabaseProvider from './supabase-provider';
import {getGlobalFields, getSettings} from "@/lib/sanity/client";
import Footer from "@/components/footer";
import { urlForImage } from "@/lib/sanity/image";
import Navigation from '@/components/navigation';
import SectionTabs from '@/components/section-tabs';
import React from "react";
import { headers } from "next/headers";

export async function sharedMetaData(params) {
  const settings = await getSettings();

  return {
    metadataBase: new URL(settings.url),
    title: {
      default:
        settings?.title ||
        "Pirate Wires",
      template: "%s | Pirate Wires"
    },
    description:
      settings?.description ||
      "Pirate Wires",
    keywords: ["politics", "news", "media", "journalism", "blog", "opinion", "culture", "technology"],
    authors: [{ name: "Pirate Wires" }],
    canonical: settings?.url,
    openGraph: {
      images: [
        {
          url:
            urlForImage(settings?.openGraphImage)?.src ||
            "/img/opengraph.jpg",
          width: 800,
          height: 600
        }
      ]
    },
    twitter: {
      title: settings?.title || "Pirate Wires",
      card: "summary_large_image"
    },
    robots: {
      index: true,
      follow: true
    }
  };
}

export async function generateMetadata({ params }) {
  return await sharedMetaData(params);
}

export default async function Layout({ children, params }) {
  const globalFields = await getGlobalFields();

  return (
    <>
      <SupabaseProvider>
        <main style={{
          "--whitePillColor": globalFields.white_pill_color,
          "--whitePillBgColor": globalFields.white_pill_bgcolor,
          "--industryColor": globalFields.industry_color,
          "--industryBgColor": globalFields.industry_bgcolor,
          "--accentLight": "rgba(227, 227, 227, 0.28)",
          "--accentDark": "rgba(227, 227, 227, 0.45)"
        } as React.CSSProperties}>
          <div>{children}</div>
        </main>
      </SupabaseProvider>
    </>
  );
}

// enable revalidate for all pages in this layout
// export const revalidate = 60;
