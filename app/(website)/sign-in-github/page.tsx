import { getSession } from '@/app/(website)/supabase-server';
import AuthUI from './AuthUI';
import { getGlobalFields } from "@/lib/sanity/client";
import React from "react";
import Navigation from "@/components/navigation";
import { redirect } from 'next/navigation';
import '@/styles/supabaseAuth.scss';
export default async function SignIn() {
  const session = await getSession();
  const globalFields = await getGlobalFields();

  if (session) {
    return redirect('/account');
  }

  return <div className="colorWrapper reducedHeaderPage" style={{
    "--color": "#060606",
    "--bgColor": "#E3E3E3",
    "--accentLight": "rgba(43, 43, 43, 0.45)",
  } as React.CSSProperties}>
    <AuthUI />
  </div>
}
