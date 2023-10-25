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
  allauthorsquery,
  authorsquery,
  postsbyauthorquery,
  postsbycatquery,
  catpathquery,
  catquery,
  searchquery,
  allpodcastsquery, publicationDocQuery
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

export async function getAllPodcasts() {
  if (client) {
    return (await client.fetch(allpodcastsquery)) || [];
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

export async function getPublicationData(slug) {
  if (client) {
    return (await client.fetch(publicationDocQuery, { slug })) || {};
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
// Author
export async function getAllAuthorsSlugs() {
  if (client) {
    const slugs = (await client.fetch(authorsquery)) || [];
    return slugs.map((slug) => ({ slug }));
  }
  return [];
}

export async function getAuthorPostsBySlug(slug) {
  if (client) {
    return (await client.fetch(postsbyauthorquery, { slug })) || {};
  }
  return {};
}

export async function getAllAuthors() {
  if (client) {
    return (await client.fetch(allauthorsquery)) || [];
  }
  return [];
}

// Category

export async function getAllCategories() {
  if (client) {
    const slugs = (await client.fetch(catpathquery)) || [];
    return slugs.map((slug) => ({ slug }));
  }
  return [];
}

export async function getPostsByCategory(slug) {
  if (client) {
    return (await client.fetch(postsbycatquery, { slug })) || {};
  }
  return {};
}

export async function getTopCategories() {
  if (client) {
    return (await client.fetch(catquery)) || [];
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
