// /api/article-metering/route.ts
import {NextApiRequest, NextApiResponse} from "next";
import {createClient} from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_ROLE_KEY || "",
);

export default async function articleMetering(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "PUT") {
    const {cookieId, viewedArticles, viewCounts, ipAddresses, lastAccessedAt} =
      req.body;

    try {
      const {data, error} = await supabase
        .from("article_metering")
        .update({
          viewed_articles: viewedArticles,
          view_counts: viewCounts,
          ip_addresses: ipAddresses,
          last_accessed_at: lastAccessedAt,
        })
        .eq("cookie_id", cookieId);

      if (error) {
        throw error;
      }

      res
        .status(200)
        .json({message: "Record updated successfully", updatedRecord: data});
    } catch (error) {
      console.error("Error updating record:", error);
      res.status(500).json({error: "Internal Server Error"});
    }
  } else {
    res.status(405).json({error: "Method Not Allowed"});
  }
}
