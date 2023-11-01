// /components/UserInformation.tsx
import { getSession } from '@/app/(website)/supabase-server';

export default function UserInformation() {
  const user = getSession()?.user;

  return <p>{JSON.stringify(user)}</p>;
}
