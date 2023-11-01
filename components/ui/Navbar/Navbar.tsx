import Link from 'next/link';
import { createServerSupabaseClient } from '@/app/(website)/supabase-server';
import SignOutButton from './SignOutButton';

export default async function Navbar() {
  const supabase = createServerSupabaseClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  // console.log('user', user);

  return (
    <nav>
      {/* <div>
        <p>user: {user?.email}</p>
        <p>user: {user?.id}</p>
        {user?.user_metadata.email}
        <pre>{user?.role}</pre>
        <img src={user?.user_metadata.avatar_url} />
      </div> */}

      <div className="flex justify-end flex-1 space-x-8">
        {user ? (
          <SignOutButton />
        ) : (
          <Link href="/sign-in" className={s.link}>
            Sign in
          </Link>
        )}
      </div>
    </nav>
  );
}
