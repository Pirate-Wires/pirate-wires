import SupabaseProvider from './supabase-provider';
import { getSettings } from "@/lib/sanity/client";
import Footer from "@/components/footer";
import { urlForImage } from "@/lib/sanity/image";
import Navbar from "@/components/navbar";

export async function sharedMetaData(params) {
  const settings = await getSettings();

  return {
    metadataBase: new URL(settings.url),
    title: {
      default:
        settings?.title ||
        "Pirate Wires",
      template: "%s | Stablo"
    },
    description:
      settings?.description ||
      "Pirate Wires",
    keywords: ["Next.js", "Sanity", "Tailwind CSS", "Stripe"],
    authors: [{ name: "Surjith" }],
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
      title: settings?.title || "Stablo Template",
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
  const settings = await getSettings();
  return (
    <>
      <SupabaseProvider>

        <Navbar {...settings} />

        <div>{children}</div>

        <Footer {...settings} />
      </SupabaseProvider>
    </>
  );
}
// enable revalidate for all pages in this layout
// export const revalidate = 60;
