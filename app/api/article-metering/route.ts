// /api/article-metering/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || '',
);

export async function POST(req: NextRequest) {
  if (req.method === 'POST') { 

    const { cookieId, viewedArticles, viewCounts, ipAddresses, lastAccessedAt } = await req.json();

    try {
      const { data, error } = await supabase
        .from('article_metering')
        .update({
          viewed_articles: viewedArticles,
          view_counts: viewCounts,
          ip_addresses: ipAddresses,
          last_accessed_at: lastAccessedAt,
        })
        .eq('cookie_id', cookieId);

      if (error) {
        throw error;
      }

      return new Response(
        JSON.stringify({ message: 'Record updated successfully', updatedRecord: data }),
        { status: 200 }
      );
    } catch (error) {
      console.error('Error updating record:', error);
      return new Response(
        JSON.stringify({ error: 'Internal Server Error' }),
        { status: 500 }
      );
    }
  } else {
    return new Response(
      JSON.stringify({ error: 'Method Not Allowed' }),
      { status: 405 }
    );
  }
}
