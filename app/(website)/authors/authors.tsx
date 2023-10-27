import AuthorCard from "@/components/blog/authorCardAuthorsPage";
import AuthorTile from "@/components/authorTile";

export default function Authors({ authors }) {
  return (
    <section className="c-20">
      <h1 className="pageTitle">
        Authors
      </h1>
      <div className="postGrid">
        {authors.map((author: any) => (
          <AuthorTile key={author.name} authorData={author} />
        ))}
        <div className="dummyTile"></div>
        <div className="dummyTile"></div>
      </div>
    </section>
  );
}
