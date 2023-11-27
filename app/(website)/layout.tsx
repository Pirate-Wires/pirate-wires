import SupabaseProvider from "./supabase-provider";
import {getGlobalFields, getSettings} from "@/lib/sanity/client";
import {urlForImage} from "@/lib/sanity/image";
import React from "react";
import {getSession, getUserDetails, getProfile} from "./supabase-server";
import Script from 'next/script';
import { GoogleTagManager } from '@next/third-parties/google'
export async function sharedMetaData(params) {
  const settings = await getSettings();

  return {
    metadataBase: new URL(settings.url),
    title: {
      default: settings?.meta_title || "Pirate Wires",
    },
    description: settings?.description || "Technology, politics, culture",
    keywords: [
      "politics",
      "news",
      "media",
      "journalism",
      "blog",
      "opinion",
      "culture",
      "technology",
    ],
    authors: [{name: "Pirate Wires"}],
    canonical: settings?.url,
    openGraph: {
      title: settings?.meta_title || "Pirate Wires",
      description: settings?.description || "Technology, politics, culture",
      url: settings.url || "https://piratewires.us",
      siteName: "Pirate Wires",
      images: [
        {
          url:
            urlForImage(settings?.openGraphImage)?.src || "/img/opengraph.jpg",
          width: 1200,
          height: 600,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export async function generateMetadata({params}) {
  return await sharedMetaData(params);
}

export default async function Layout({children, params}) {
  const globalFields = await getGlobalFields();
  const session = await getSession();
  const user = await getUserDetails();
  const profile = await getProfile(user?.id!);

  return (
    <>
      <SupabaseProvider
        globalFields={globalFields}
        session={session}
        user={user}
        profile={profile}>
        <main
          style={
            {
              "--whitePillColor": globalFields.white_pill_bgcolor,
              "--industryColor": globalFields.industry_bgcolor,
              "--doloresParkColor": globalFields.dolores_park_bgcolor,
              "--accentLight": "rgba(227, 227, 227, 0.45)",
            } as React.CSSProperties
          }>
          <div>{children}</div>
        </main>
      </SupabaseProvider>
    </>
  );
}

// enable revalidate for all pages in this layout
// export const revalidate = 60;
