import { pageStructure, singletonPlugin } from "./lib/sanity/plugins/settings";
import { schemaTypes } from "./lib/sanity/schemas";
import settings from "./lib/sanity/schemas/settings";
import { codeInput } from "@sanity/code-input";
import { table } from "@sanity/table";
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { unsplashImageAsset } from "sanity-plugin-asset-source-unsplash";
import { vercelDeployTool } from "sanity-plugin-vercel-deploy";
import { deskTool } from "sanity/desk";
import globalFields from "@/lib/sanity/schemas/globalFields";
import homeData from "@/lib/sanity/schemas/home";
import industryData from "@/lib/sanity/schemas/industry";
import doloresParkData from "@/lib/sanity/schemas/doloresPark";
import wiresData from "@/lib/sanity/schemas/pirateWires";
import whitePillData from "@/lib/sanity/schemas/whitePill";
import singlePodcastData from "@/lib/sanity/schemas/podcasts";
import singleCareersData from "@/lib/sanity/schemas/careers";
import singleNewslettersData from "@/lib/sanity/schemas/newsletters";
import singleAuthorsData from "@/lib/sanity/schemas/authors";

export const PREVIEWABLE_DOCUMENT_TYPES: string[] = ["post"];

export default defineConfig({
  name: "default",
  title: "Pirate Wires",
  basePath: "/studio",
  projectId: "cjtc1tnd",
  dataset: "production",

  plugins: [
    deskTool({
      structure: pageStructure([
        settings,
        globalFields,
        homeData,
        wiresData,
        whitePillData,
        industryData,
        doloresParkData,
        singlePodcastData,
        singleCareersData,
        singleAuthorsData,
        singleNewslettersData,
      ]),
    }),
    singletonPlugin([
      "settings",
      "globalFields",
      "singleHome",
      "pirateWires",
      "theWhitePill",
      "theIndustry",
      "doloresPark",
      "singlePodcast",
      "singleCareers",
      "singleAuthors",
      "singleNewsletters",
    ]),
    visionTool(),
    unsplashImageAsset(),
    table(),
    codeInput(),
    vercelDeployTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
