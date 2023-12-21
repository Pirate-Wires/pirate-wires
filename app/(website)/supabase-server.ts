// /app/(website)/supabase-server.ts
import type { Database } from "@/types/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { cache } from "react";
import { ViewedArticle } from "@/types/supabase";

export const createServerSupabaseClient = cache(() => {
  const cookieStore = cookies();
  return createServerComponentClient<Database>({ cookies: () => cookieStore });
});

export async function getSession() {
  const supabase = createServerSupabaseClient();
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    return session;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export async function getUserDetails(userId: string) {
  const supabase = createServerSupabaseClient();
  try {
    const { data: userDetails } = await supabase.from("users").select("*").eq("id", userId).single();
    return userDetails;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export async function getProfile(profileId: string) {
  const supabase = createServerSupabaseClient();
  try {
    const { data: profile } = await supabase.from("users").select("*").eq("id", profileId).single();
    return profile;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export async function getSubscription() {
  const supabase = createServerSupabaseClient();
  try {
    const { data: subscription } = await supabase
      .from("subscriptions")
      .select("*, prices(*, products(*))")
      .in("status", ["trialing", "active"])
      .maybeSingle()
      .throwOnError();
    return subscription;
  } catch (error) {
    console.error("Error: ", error.message);
    return null;
  }
}

export const getActiveProductsWithPrices = async () => {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from("products")
    .select("*, prices(*)")
    .eq("active", true)
    .eq("prices.active", true)
    .order("metadata->index")
    .order("unit_amount", { foreignTable: "prices" });

  if (error) {
    console.error(error.message);
  }
  return data ?? [];
};

export async function getViewedArticles(ipAddress: string) {
  const supabase = createServerSupabaseClient();
  try {
    const { data } = await supabase
      .from("article_metering")
      .select("viewed_articles")
      .eq("ip_address", ipAddress)
      .single()
      .throwOnError();

    if (!data?.viewed_articles) return [];

    return data?.viewed_articles.filter(article => {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth();

      const targetDate = new Date(article?.viewed_at);
      const targetYear = targetDate.getFullYear();
      const targetMonth = targetDate.getMonth();

      return currentYear === targetYear && currentMonth === targetMonth;
    });
  } catch (error) {
    console.error("Error fetching viewed articles: ", error.message);
    return [];
  }
}

export async function upsertViewedArticles(ip_address: string, viewed_articles: ViewedArticle[]) {
  const supabase = createServerSupabaseClient();
  try {
    const { data } = await supabase
      .from("article_metering")
      .upsert({ ip_address, viewed_articles }, { onConflict: "ip_address" })
      .select()
      .single()
      .throwOnError();

    return data;
  } catch (error) {
    console.error("Error upserting viewed articles: ", error.message);
    return null;
  }
}
