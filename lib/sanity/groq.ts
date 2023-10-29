import { groq } from 'next-sanity';

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

// Get Global Fields (color defs, section defaults)
export const globalFieldsQuery = groq`
*[_type == "globalFields"][1] {
  ...,
}
`;

// Single Documents
export const homeQuery = groq`
*[slug.current == 'home'] {
  ...,
  "podcastCalloutVid": podcastCalloutVid.asset->{url},
  latest_writers[]->{name, title, slug, image},
  featured_posts[]->{title, slug, author->{name}, mainImage, publishedAt, excerpt},
  featured_posts_white_pill[]->{title, slug, author->{name}, mainImage, publishedAt, excerpt},
  featured_posts_industry[]->{title, slug, author->{name}, mainImage, publishedAt, excerpt}
}
`;

export const podcastQuery = groq`
*[slug.current == 'podcast'][0] {
  ...,
  title,
  podcast_list[]->{title, excerpt, author_list, youtube_link, apple_link, spotify_link}
}
`;

export const careersQuery = groq`
*[slug.current == 'careers'][0] {
  ...,
  career_list[]->{title, date, link}
}
`;

export const authorsQuery = groq`
*[slug.current == 'authors'][0] {
  ...,
  author_list[]->{..., slug, image}
}
`;

export const newsletterQuery = groq`
*[slug.current == 'newsletters'] {
  ...,
}
`;

export const careerQuery = groq`
*[slug.current == 'careers'] {
  ...,
}
`;

// Parent publication documents
export const publicationDocQuery = groq`
*[slug.current == $slug] {
  ...
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


// Get posts by section (The White Pill, The Industry, etc).
// Excludes any post that has the newsletter toggle set to true
export const postBySectionQuery = groq`
*[_type == "post" && $section match section && (!defined(newsletter) || !newsletter)] {
  title, 
  slug, 
  newsletter,
  author->{name}, 
  mainImage {
    asset->{url},
    "blurDataURL":asset->metadata.lqip
  },
  publishedAt, 
  excerpt
}
`;

// Get posts by author
// Excludes any post that has the newsletter toggle set to true
export const postByAuthorQuery = groq`
*[_type == "post" && $authorName match author->name] {
  title, 
  slug, 
  newsletter,
  author->{name}, 
  mainImage, 
  publishedAt, 
  excerpt
}
`;

// Get newsletter posts by section (The White Pill, The Industry, etc)
export const newslettersBySectionQuery = groq`
*[_type == "post" && $section match section && newsletter] {
  title, 
  slug, 
  newsletter,
  mainImage {
    asset->{url},
    "blurDataURL":asset->metadata.lqip
  },
  excerpt
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
 image
}
`;

// get everything from sanity
// to test connection
export const getAll = groq`*[]`;
