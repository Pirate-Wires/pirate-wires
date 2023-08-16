// app/(website)/authorsauthors.tsx
"use client"
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/container";
import { urlForImage } from "@/lib/sanity/image";
import { notFound } from "next/navigation";
import AuthorCard from "@/components/blog/authorCard";

// get all authors from sanity 

export default function Authors({ authors }) {
  return (
    <Container>
      <h1>Authors</h1>
      <div className="grid grid-cols-2 gap-4">
        {authors.map((author) => (
          <AuthorCard key={author.slug} author={author} />
        ))}
      </div>
    </Container>
  );
}
