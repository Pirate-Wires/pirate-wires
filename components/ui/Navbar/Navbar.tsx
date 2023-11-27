import Link from "next/link";
import {createServerSupabaseClient} from "@/app/(website)/supabase-server";
import SignOutButton from "./SignOutButton";
import React from "react";

export default async function Navbar() {
  const supabase = createServerSupabaseClient();
  const {
    data: {user},
  } = await supabase.auth.getUser();

  // function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  //   event.preventDefault();
  //   console.log('submit');
  // }

  // const [firstName, setFirstName] = React.useState('');
  // const [lastName, setLastName] = React.useState('');

  // function handleFirstNameChange(event: React.FormEvent<HTMLInputElement>): void {
  //   throw new Error('Function not implemented.');
  // }

  // function handleLastNameChange(event: React.FormEvent<HTMLInputElement>): void {
  //   throw new Error('Function not implemented.');
  // }

  return (
    <div>
      <div>
        {user ? <SignOutButton /> : <Link href="/sign-in">Sign in</Link>}
      </div>

      <hr />
      <ul>
        <li>
          <p>user email: {user?.email}</p>
        </li>
        <li>
          <p>user id: {user?.id}</p>
        </li>
        <li>{user?.user_metadata.email}</li>
        <li>
          <pre>{user?.role}</pre>
        </li>
        <li>
          <img
            src={user?.user_metadata.avatar_url}
            style={{width: "75px"}}
            alt={user?.email}
          />
        </li>
      </ul>

      {/* <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={firstName}
          onChange={handleFirstNameChange}
          required
        />
        <br />
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={lastName}
          onChange={handleLastNameChange}
          required
        />
        <br />
        <button type="submit">Save</button>
      </form> */}
    </div>
  );
}
