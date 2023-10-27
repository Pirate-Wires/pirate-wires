import AuthorCard from "@/components/blog/authorCardAuthorsPage";
import AuthorTile from "@/components/authorTile";

export default function Authors({ authors }) {
  const writers = authors.filter((author) => author.position === 'core');
  const contributors = authors.filter((author) => author.position === 'contributor');

  console.log(writers)
  return (
    <section className="c-20">
      <h1 className="pageTitle">
        Authors
      </h1>
      <div className="postGrid">
        {writers.map((author: any) => (
          <AuthorTile key={author.name} authorData={author} />
        ))}
        <div className="dummyTile"></div>
        <div className="dummyTile"></div>
      </div>
    </section>
  );
}
