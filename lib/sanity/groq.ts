import { groq } from 'next-sanity';

// get all podcasts
export const allpodcastsquery = groq`
*[_type == "podcast"] {
  _id,
  _createdAt,
  title,
  slug,
  excerpt,
  author-> {
    _id,
    name,
    image,
    slug
  },
  mainImage {
    ...,
    "blurDataURL": asset->metadata.lqip,
    "ImageColor": asset->metadata.palette.dominant.background
  },
  categories[]->,
  publishedAt,
  featured,
  body[]{
    ...,
    markDefs[]{
      ...,
      _type == "internalLink" => {
        "slug": @.reference->slug
      }
    }
  }
}
`;

// Get all posts
export const postquery = groq`
*[_type == "post"] | order(publishedAt desc, _createdAt desc) {
  _id,
  _createdAt,
  publishedAt,
  mainImage {
    ...,
    "blurDataURL":asset->metadata.lqip,
    "ImageColor": asset->metadata.palette.dominant.background,
  },
  featured,
  excerpt,
  slug,
  title,
  author-> {
    _id,
    image,
    slug,
    name
  },
  categories[]->,
  section,
}
`;
// Get all posts with 0..limit
export const limitquery = groq`
*[_type == "post"] | order(publishedAt desc, _createdAt desc) [0..$limit] {
  ...,
  author->,
  categories[]->
}
`;
// [(($pageIndex - 1) * 10)...$pageIndex * 10]{
// Get subsequent paginated posts
export const paginatedquery = groq`
*[_type == "post"] | order(publishedAt desc, _createdAt desc) [$pageIndex...$limit] {
  ...,
  author->,
  categories[]->,
  section,
}
`;

// Get Site Config
export const configQuery = groq`
*[_type == "settings"][0] {
  ...,
}
`;

// Get Global Fields (color defs, home page fields, section defaults)
export const globalFieldsQuery = groq`
*[_type == "globalFields"][1] {
  ...,
  "podcastCalloutVid": podcastCalloutVid.asset->{url},
  featured_posts[]->{title, slug, author->{name}, mainImage, publishedAt, excerpt},
  featured_posts_white_pill[]->{title, slug, author->{name}, mainImage, publishedAt, excerpt},
  featured_posts_industry[]->{title, slug, author->{name}, mainImage, publishedAt, excerpt}
}
`;

// Single Documents
export const homeQuery = groq`
*[slug.current == 'home'] {
  ...,
  "podcastCalloutVid": podcastCalloutVid.asset->{url},
  featured_posts[]->{title, slug, author->{name}, mainImage, publishedAt, excerpt},
  featured_posts_white_pill[]->{title, slug, author->{name}, mainImage, publishedAt, excerpt},
  featured_posts_industry[]->{title, slug, author->{name}, mainImage, publishedAt, excerpt}
}
`;

// Parent publication documents
export const publicationDocQuery = groq`
*[slug.current == $slug] {
  ...,
}
`;

// Single Post
export const singlePostQuery = groq`
*[slug.current == $slug][0] {
  ...,
  body[]{
    ...,
    markDefs[]{
      ...,
      _type == "internalLink" => {
        "slug": @.reference->slug
      }
    }
  },
  author->,
  categories[]->,
  section,
  "estReadingTime": round(length(pt::text(body)) / 5 / 180 ),
  "related": *[_type == "post" && count(categories[@._ref in ^.^.categories[]._ref]) > 0 ] | order(publishedAt desc, _createdAt desc) [0...5] {
    title,
    slug,
    "date": coalesce(publishedAt,_createdAt),
    "image": mainImage
  },
}
`;

// Paths for generateStaticParams
export const pathquery = groq`
*[_type == "post" && defined(slug.current)][].slug.current
`;
export const catpathquery = groq`
*[_type == "category" && defined(slug.current)][].slug.current
`;
export const authorsquery = groq`
*[_type == "author" && defined(slug.current)][].slug.current
`;

// Get Posts by Authors
export const postsbyauthorquery = groq`
*[_type == "post" && $slug match author->slug.current ] {
  ...,
  author->,
  categories[]->,
  section,
}
`;

// Get Posts by Category
export const postsbycatquery = groq`
*[_type == "post" && $slug in categories[]->slug.current ] {
  ...,
  author->,
  categories[]->,
  section,
}
`;

// Get top 5 categories
export const catquery = groq`*[_type == "category"] {
  ...,
  "count": count(*[_type == "post" && references(^._id)])
} | order(count desc) [0...5]`;

export const searchquery = groq`*[_type == "post" && _score > 0]
| score(title match $query || excerpt match $query || pt::text(body) match $query)
| order(_score desc)
{
  _score,
  _id,
  _createdAt,
  mainImage,
  author->,
  categories[]->,
  section,
   title,
   slug
}`;

// Get all Authors
export const allauthorsquery = groq`
*[_type == "author"] {
 ...,
 'slug': slug.current,
}
`;

// get everything from sanity
// to test connection
export const getAll = groq`*[]`;
