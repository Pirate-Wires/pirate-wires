import {
  postquery,
  configQuery,
  globalFieldsQuery,
  singlePostQuery,
  homeQuery,
  podcastQuery,
  pathquery,
  postsbyauthorquery,
  publicationDocQuery,
  newsletterQuery,
  careersQuery,
  authorsQuery,
  postBySectionQuery,
  authorSlugsQuery,
  newslettersBySectionQuery,
  authorQuery,
  utilityPageQuery,
  utilityPageSlugsQuery,
} from "./groq";
import {createClient} from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION;
const useCdn = process.env.NODE_ENV === "production";

if (!projectId) {
  console.error(
    "The Sanity Project ID is not set. Check your environment variables.",
  );
}

const client = projectId
  ? createClient({projectId, dataset, apiVersion, useCdn})
  : null;

export const fetcher = async ([query, params]) => {
  return client ? client.fetch(query, params) : [];
};

export async function getAllPosts() {
  if (client) {
    return (await client.fetch(postquery, {}, {next: ["post"]})) || [];
  }
  return [];
}

export async function getSettings() {
  if (client) {
    return (await client.fetch(configQuery, {}, {next: ["settings"]})) || [];
  }
  return [];
}

export async function getGlobalFields() {
  if (client) {
    return (
      (await client.fetch(
        globalFieldsQuery,
        {},
        {
          next: ["globalFields"],
        },
      )) || []
    );
  }
  return [];
}

export async function getPostBySlug(slug) {
  if (client) {
    return (
      (await client.fetch(singlePostQuery, {slug}, {next: ["post"]})) || {}
    );
  }
  return {};
}

export async function getHomeData(slug) {
  if (client) {
    return (
      (await client.fetch(
        homeQuery,
        {slug},
        {next: ["singleHome", "post", "author"]},
      )) || {}
    );
  }
  return {};
}

export async function getPodcastData() {
  if (client) {
    return (
      (await client.fetch(
        podcastQuery,
        {},
        {next: ["singlePodcast", "Podcasts"]},
      )) || {}
    );
  }
  return {};
}

export async function getNewsletterData() {
  if (client) {
    return (
      (await client.fetch(
        newsletterQuery,
        {},
        {
          next: ["singleNewsletters"],
        },
      )) || {}
    );
  }
  return {};
}

export async function getCareersData() {
  if (client) {
    return (
      (await client.fetch(
        careersQuery,
        {},
        {
          next: ["singleCareers", "Career"],
        },
      )) || {}
    );
  }
  return {};
}

export async function getAuthorsData() {
  if (client) {
    return (
      (await client.fetch(
        authorsQuery,
        {},
        {
          next: ["singleAuthors", "author"],
        },
      )) || {}
    );
  }
  return {};
}

export async function getAuthorData(slug) {
  if (client) {
    return (await client.fetch(authorQuery, {slug}, {next: ["author"]})) || {};
  }
  return {};
}

export async function getUtilityPageData(slug) {
  if (client) {
    return (
      (await client.fetch(
        utilityPageQuery,
        {slug},
        {
          next: ["utilityPage"],
        },
      )) || {}
    );
  }
  return {};
}

export async function getPublicationData(slug) {
  if (client) {
    return (
      (await client.fetch(
        publicationDocQuery,
        {slug},
        {
          next: ["theIndustry", "pirateWires", "whitePill", "post"],
        },
      )) || {}
    );
  }
  return {};
}

export async function getPublicationPosts(section) {
  if (client) {
    return (
      (await client.fetch(
        postBySectionQuery,
        {section},
        {
          next: ["post"],
        },
      )) || {}
    );
  }
  return {};
}

export async function getPublicationNewsletters(section) {
  if (client) {
    return (
      (await client.fetch(
        newslettersBySectionQuery,
        {section},
        {
          next: ["post"],
        },
      )) || {}
    );
  }
  return {};
}

export async function getAllPostsSlugs() {
  if (client) {
    const slugs = (await client.fetch(pathquery, {}, {next: ["post"]})) || [];
    return slugs.map(slug => ({slug}));
  }
  return [];
}

export async function getAuthorPosts(slug) {
  if (client) {
    return (
      (await client.fetch(
        postsbyauthorquery,
        {slug},
        {
          next: ["author", "post"],
        },
      )) || {}
    );
  }
  return {};
}

export async function getAllAuthorsSlugs() {
  if (client) {
    return (await client.fetch(authorSlugsQuery, {}, {next: ["author"]})) || [];
  }
  return [];
}

export async function getAllUtilityPageSlugs() {
  if (client) {
    return (
      (await client.fetch(
        utilityPageSlugsQuery,
        {},
        {
          next: ["utility"],
        },
      )) || []
    );
  }
  return [];
}
