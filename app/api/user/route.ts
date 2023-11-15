import {
  getUserByEmail,
  createAuthUser,
  upsertUserRecord,
  createOrRetrieveCustomer
} from '@/utils/supabase-admin';

export async function POST(req: Request) {
  const body = await req.json();
  const { email, fullName } = body;

  try {
    const data = await getUserByEmail(email);
    let userId = data?.id!;

    if (!data) {
      const { data: user, error: createError } = await createAuthUser(email);

      if (createError) {
        return new Response(`${createError.message}`, { status: 500 });
      }

      userId = user?.id!;
      if (fullName) {
        const { error } = await upsertUserRecord(userId, email, fullName);

        if (error) {
          return new Response(`${error.message}`, { status: 500 });
        }
      }
    }

    const customerId = await createOrRetrieveCustomer({
      email,
      name: fullName,
      uuid: userId!
    });

    return new Response(
      JSON.stringify({ success: true, payload: { customerId } }),
      {
        status: 200
      }
    );
  } catch (err) {
    return new Response(`${err.message}`, { status: 500 });
  }
}
