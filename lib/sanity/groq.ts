import { groq } from "next-sanity";

// Get all posts
export const postquery = groq`
*[_type == "post"] | order(publishedAt desc, _createdAt desc) {
  _id,
  _createdAt,
  publishedAt,
  mainImage {
    asset->{url},
    "blurDataURL":asset->metadata.lqip
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
  section,
}
`;
// Get all posts with 0..limit
export const limitquery = groq`
*[_type == "post"] | order(publishedAt desc, _createdAt desc) [0..$limit] {
  ...,
  author->,
}
`;
// [(($pageIndex - 1) * 10)...$pageIndex * 10]{
// Get subsequent paginated posts
export const paginatedquery = groq`
*[_type == "post"] | order(publishedAt desc, _createdAt desc) [$pageIndex...$limit] {
  ...,
  author->,
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
*[_type == "globalFields"][0] {
  ...,
}
`;

// Single Documents
export const homeQuery = groq`
*[slug.current == 'home'] {
  ...,
  "podcastCalloutVid": podcastCalloutVid.asset->{url},
  latest_writers[]->{name, title, slug, image},
  featured_posts[]->{title, slug, author->{name, slug}, mainImage {
    asset->{url},
    "blurDataURL":asset->metadata.lqip
  }, publishedAt, excerpt},
  featured_posts_white_pill[]->{title, slug, author->{name, slug}, mainImage {
    asset->{url},
    "blurDataURL":asset->metadata.lqip
  }, publishedAt, excerpt},
  featured_posts_industry[]->{title, slug, author->{name, slug}, mainImage {
    asset->{url},
    "blurDataURL":asset->metadata.lqip
  }, publishedAt, excerpt},
  featured_posts_dolores_park[]->{title, slug, author->{name, slug}, mainImage {
    asset->{url},
    "blurDataURL":asset->metadata.lqip
  }, publishedAt, excerpt}
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

export const authorQuery = groq`
*[_type == "author" && $slug match slug.current][0] {
  ...,
  image {
    asset->{url},
    "blurDataURL":asset->metadata.lqip
  }
}
`;

export const utilityPageQuery = groq`
*[_type == "utilityPage" && $slug match slug.current][0] {
  ...,
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
  related_posts[]->{title, slug, author->{name, slug}, mainImage {
    asset->{url},
    "blurDataURL":asset->metadata.lqip
  }, publishedAt, excerpt},
  author->,
  mainImage {
    asset->,
    caption,
    "blurDataURL":asset->metadata.lqip
  },
  section,
  "estReadingTime": round(length(pt::text(body)) / 5 / 180 ),
}
`;

// Paths for generateStaticParams
export const pathquery = groq`
*[_type == "post" && defined(slug.current)][].slug.current
`;
export const authorSlugsQuery = groq`
*[_type == "author" && defined(slug.current)][].slug.current
`;
export const utilityPageSlugsQuery = groq`
*[_type == "utility" && defined(slug.current)][].slug.current
`;

// Get Posts by Authors
export const postsbyauthorquery = groq`
*[_type == "post" && $slug match author->slug.current ] {
  ...,
  author->,
  section,
  mainImage {
    asset->,
    "blurDataURL":asset->metadata.lqip
  }
}
`;

// Get posts by section (The White Pill, The Industry, etc).
// Excludes any post that has the newsletter toggle set to true
export const postBySectionQuery = groq`
*[_type == "post" && $section match section && (!defined(newsletter) || !newsletter)] {
  title, 
  slug, 
  newsletter,
  author->{name, slug}, 
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

export const searchquery = groq`*[_type == "post" && _score > 0]
| score(title match $query || excerpt match $query || pt::text(body) match $query)
| order(_score desc)
{
  _score,
  _id,
  _createdAt,
  mainImage {
    asset->{url},
    "blurDataURL":asset->metadata.lqip
  },
  excerpt,
  author->,
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
