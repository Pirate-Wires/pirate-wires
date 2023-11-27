// /components/UserInformation.tsx
import React, {useEffect, useState} from "react";
import {getSession} from "@/app/(website)/supabase-server";
import {User} from "@/types";

export default function UserInformation() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function loadSession() {
      const session = await getSession();
      // if(session)   setUser(session?.user);
    }

    loadSession();
  }, []);

  return <p>{user ? "AAAA" : "Loading..."}</p>;
}
