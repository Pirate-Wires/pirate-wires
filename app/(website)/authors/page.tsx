// app/(website)/authors/page.tsx
import { getAllAuthors } from "@/lib/sanity/client";
import Authors from "./authors";

export default async function AuthorsPage() {
  const authors = await getAllAuthors(); // Fetch all authors from Sanity

  return <Authors authors={authors} />; // Pass authors to Authors component

}

// export const revalidate = 60;
