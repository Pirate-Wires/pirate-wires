import SupabaseProvider from './supabase-provider';
import { getSettings } from "@/lib/sanity/client";
import Footer from "@/components/footer";
import { urlForImage } from "@/lib/sanity/image";
import Navigation from '@/components/navigation';
import SectionTabs from '@/components/section-tabs';

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
  const settings = await getSettings();
  return (
    <>
      <SupabaseProvider>

        {/* <Navbar {...settings} /> */}
        <Navigation />

        <div className="flex items-center justify-center py-4">
          <SectionTabs />
        </div>

        <div>{children}</div>

        <Footer {...settings} />
      </SupabaseProvider>
    </>
  );
}

// enable revalidate for all pages in this layout
// export const revalidate = 60;
