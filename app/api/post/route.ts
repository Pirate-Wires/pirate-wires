import { upsertPostRecord } from "@/utils/supabase-admin";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { payload: postData } = body;

    const { data, error } = await upsertPostRecord(postData);

    if (error) throw error;

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ message: err.message }), { status: 500 });
  }
}
