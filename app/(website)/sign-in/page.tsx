// /app/(website)/sign-in/page.tsx
import {getSession} from "@/app/(website)/supabase-server";
import AuthUI from "./AuthUI";
import {getGlobalFields, getSettings} from "@/lib/sanity/client";
import React from "react";
import Navigation from "@/components/navigation";
import {redirect} from "next/navigation";
import "@/styles/supabaseAuth.scss";
import {urlForImage} from "@/lib/sanity/image";
export async function generateMetadata({params}) {
  const settings = await getSettings();
  const title = "Sign In | Pirate Wires";
  const description = settings.meta_description;
  const image = urlForImage(settings?.openGraphImage)?.src ?? "";

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      images: [
        {
          url: image,
          width: 1200,
          height: 600,
        },
      ],
    },
  };
}
export default async function SignIn() {
  const session = await getSession();
  const globalFields = await getGlobalFields();

  if (session) {
    return redirect("/account");
  }

  return (
    <div
      className="colorWrapper reducedHeaderPage"
      style={
        {
          "--color": "#060606",
          "--bgColor": "#E3E3E3",
          "--accentLight": "rgba(43, 43, 43, 0.45)",
        } as React.CSSProperties
      }>
      <Navigation globalFields={globalFields} />
      <AuthUI />
    </div>
  );
}
