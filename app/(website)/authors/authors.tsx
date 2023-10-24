import AuthorCard from "@/components/blog/authorCardAuthorsPage";

export default function Authors({ authors }) {
  return (
    <>
      <h1>Authors</h1>
      <div className="grid grid-cols-2 gap-4">
        {authors.map((author: any) => (
          <>
            <AuthorCard key={author.slug} author={author} />
          </>
        ))}
      </div>
    </>
  );
}
