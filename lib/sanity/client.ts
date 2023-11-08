// lib/sanity/client.ts
import { apiVersion, dataset, projectId, useCdn } from './config';
import {
  postquery,
  limitquery,
  paginatedquery,
  configQuery,
  globalFieldsQuery,
  singlePostQuery,
  homeQuery,
  podcastQuery,
  pathquery,
  postsbyauthorquery,
  searchquery,
  publicationDocQuery,
  newsletterQuery,
  careersQuery,
  authorsQuery,
  postBySectionQuery,
  allauthorsquery,
  authorSlugsQuery, newslettersBySectionQuery, authorQuery, utilityPageQuery, utilityPageSlugsQuery
} from './groq';
import { createClient } from 'next-sanity';

if (!projectId) {
  console.error(
    'The Sanity Project ID is not set. Check your environment variables.'
  );
}

/**
 * Checks if it's safe to create a client instance, as `@sanity/client` will throw an error if `projectId` is false
 */
const client = projectId
  ? createClient({ projectId, dataset, apiVersion, useCdn })
  : null;

export const fetcher = async ([query, params]) => {
  return client ? client.fetch(query, params) : [];
};

export async function getAllPosts() {
  if (client) {
    return (await client.fetch(postquery)) || [];
  }
  return [];
}

export async function getSettings() {
  if (client) {
    return (await client.fetch(configQuery)) || [];
  }
  return [];
}

export async function getGlobalFields() {
  if (client) {
    return (await client.fetch(globalFieldsQuery)) || [];
  }
  return [];
}

export async function getPostBySlug(slug) {
  if (client) {
    return (await client.fetch(singlePostQuery, { slug })) || {};
  }
  return {};
}

export async function getHomeData(slug) {
  if (client) {
    return (await client.fetch(homeQuery, { slug })) || {};
  }
  return {};
}

export async function getPodcastData() {
  if (client) {
    return (await client.fetch(podcastQuery)) || {};
  }
  return {};
}

export async function getNewsletterData() {
  if (client) {
    return (await client.fetch(newsletterQuery)) || {};
  }
  return {};
}

export async function getCareersData() {
  if (client) {
    return (await client.fetch(careersQuery)) || {};
  }
  return {};
}

export async function getAuthorsData() {
  if (client) {
    return (await client.fetch(authorsQuery)) || {};
  }
  return {};
}

export async function getAuthorData(slug) {
  if (client) {
    return (await client.fetch(authorQuery, { slug })) || {};
  }
  return {};
}

export async function getUtilityPageData(slug) {
  if (client) {
    return (await client.fetch(utilityPageQuery, { slug })) || {};
  }
  return {};
}

export async function getPublicationData(slug) {
  if (client) {
    return (await client.fetch(publicationDocQuery, { slug })) || {};
  }
  return {};
}

export async function getPublicationPosts(section) {
  if (client) {
    return (await client.fetch(postBySectionQuery, { section })) || {};
  }
  return {};
}

export async function getPublicationNewsletters(section) {
  if (client) {
    return (await client.fetch(newslettersBySectionQuery, { section })) || {};
  }
  return {};
}

export async function getAllPostsSlugs() {
  if (client) {
    const slugs = (await client.fetch(pathquery)) || [];
    return slugs.map((slug) => ({ slug }));
  }
  return [];
}

export async function getAuthorPosts(slug) {
  if (client) {
    return (await client.fetch(postsbyauthorquery, { slug })) || {};
  }
  return {};
}

export async function getAllAuthorsSlugs() {
  if (client) {
    return (await client.fetch(authorSlugsQuery)) || [];
  }
  return [];
}

export async function getAllUtilityPageSlugs() {
  if (client) {
    return (await client.fetch(utilityPageSlugsQuery)) || [];
  }
  return [];
}

export async function getAllAuthors() {
  if (client) {
    return (await client.fetch(allauthorsquery)) || [];
  }
  return [];
}

export async function getPaginatedPosts(limit) {
  if (client) {
    return (
      (await client.fetch(paginatedquery, {
        pageIndex: 0,
        limit: limit
      })) || {}
    );
  }
  return {};
}
