"use client";
import NewsletterCallout from "@/components/newsletterCallout";
import {useScrollBasedAnims} from "@/hooks/useScrollBasedAnims";

export default function Newsletters({pageData}) {
  useScrollBasedAnims();
  return <NewsletterCallout newsletterData={pageData} />;
}
