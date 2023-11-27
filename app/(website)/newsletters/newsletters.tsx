"use client";
import NewsletterCallout from "@/components/newsletterCallout";
import {useScrollBasedAnims} from "@/hooks/useScrollBasedAnims";

export default function Newsletters({pageData, globalFields}) {
  useScrollBasedAnims();
  return <NewsletterCallout newsletterData={pageData} globalFields={globalFields} />;
}
