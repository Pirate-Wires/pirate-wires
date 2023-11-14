import { checkEmail } from '@/utils/kickbox';

export async function POST(req: Request) {
  const body = await req.json();
  const { email } = body;

  try {
    const { data, error } = await checkEmail(email);

    if (error) throw error;

    if(!data) throw new Error('Invalid Email!');

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    return new Response(`${err.message}`, { status: 500 });
  }
}
