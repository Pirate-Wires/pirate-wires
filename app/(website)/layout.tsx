import SupabaseProvider from './supabase-provider';
import {getGlobalFields, getSettings} from "@/lib/sanity/client";
import Footer from "@/components/footer";
import { urlForImage } from "@/lib/sanity/image";
import Navigation from '@/components/navigation';
import SectionTabs from '@/components/section-tabs';
import React from "react";
import { headers } from "next/headers";
import MegaNav from "@/components/megaNav";

export async function sharedMetaData(params) {
  const settings = await getSettings();

  return {
    metadataBase: new URL(settings.url),
    title: {
      default:
        settings?.meta_title ||
        "Pirate Wires"
    },
    description:
      settings?.description ||
      "Technology, politics, culture",
    keywords: ["politics", "news", "media", "journalism", "blog", "opinion", "culture", "technology"],
    authors: [{ name: "Pirate Wires" }],
    canonical: settings?.url,
    openGraph: {
      title: settings?.meta_title ||
        "Pirate Wires",
      description: settings?.description ||
        "Technology, politics, culture",
      url: settings.url || "https://piratewires.us",
      siteName: 'Pirate Wires',
      images: [
        {
          url:
            urlForImage(settings?.openGraphImage)?.src ||
            "/img/opengraph.jpg",
          width: 1200,
          height: 600
        }
      ],
      locale: 'en_US',
      type: 'website',
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
  console.log(globalFields)
  return (
    <>
      <SupabaseProvider>
        <main style={{
          "--whitePillColor": globalFields.white_pill_color,
          "--whitePillBgColor": globalFields.white_pill_bgcolor,
          "--industryColor": globalFields.industry_color,
          "--industryBgColor": globalFields.industry_bgcolor,
          "--accentLight": "rgba(227, 227, 227, 0.45)"
        } as React.CSSProperties}>
          <div>{children}</div>
        </main>
      </SupabaseProvider>
    </>
  );
}

// enable revalidate for all pages in this layout
// export const revalidate = 60;
