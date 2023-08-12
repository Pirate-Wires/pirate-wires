//  post schema
export default {
  name: "post",
  title: "Post",
  type: "document",
  initialValue: () => ({
    publishedAt: new Date().toISOString()
  }),
  fields: [
    {
      name: "featured",
      title: "Mark as Featured",
      type: "boolean"
    },
    {
      name: "publishedAt",
      title: "Published at",
      type: "datetime"
    },
    {
      name: "title",
      title: "Title",
      type: "string"
    },
    {
      name: "body",
      title: "Body",
      type: "blockContent"
    },
    {
      name: "author",
      title: "Author",
      type: "reference",
      to: { type: "author" }
    },
    {
      name: "co_authors",
      title: "Co-Authors",
      type: "array",
      of: [{ type: "reference", to: { type: "author" } }]
    },
    {
      name: "mainImage",
      title: "Main image",
      type: "image",
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative text",
          description: "Important for SEO and accessiblity."
        }
      ],
      options: {
        hotspot: true
      }
    },
    {
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }]
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96
      }
    },
    {
      name: "excerpt",
      title: "Excerpt",
      description:
        "The excerpt is used in blog feeds, and also for search results",
      type: "text",
      rows: 3,
      validation: Rule => Rule.max(200)
    }
  ],

  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "mainImage"
    },
    prepare(selection) {
      const { author, co_authors } = selection;

      if (author && co_authors && co_authors.length > 0) {
        const allAuthors = [author, ...co_authors];
        const authorNames = allAuthors.map(a => a.name).join(', ');
        return Object.assign({}, selection, {
          subtitle: `by ${authorNames}`
        });
      } else if (author) {
        return Object.assign({}, selection, {
          subtitle: `by ${author.name}`
        });
      } else if (co_authors && co_authors.length > 0) {
        const authorNames = co_authors.map(a => a.name).join(', ');
        return Object.assign({}, selection, {
          subtitle: `by ${authorNames}`
        });
      }

      return selection; // If no author or co_authors are provided
    }
  }
};
