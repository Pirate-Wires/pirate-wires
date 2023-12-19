"use client";
import NewsletterCallout from "@/components/newsletterCallout";
import { useScrollBasedAnims } from "@/lib/hooks/useScrollBasedAnims";

export default function Newsletters({ pageData, globalFields }) {
  useScrollBasedAnims();
  return <NewsletterCallout newsletterData={pageData} globalFields={globalFields} />;
}
