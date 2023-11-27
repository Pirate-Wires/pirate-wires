import {IConfig as ISitemapConfig} from "next-sitemap";

const sitemapConfig: ISitemapConfig = {
  siteUrl: process.env.SITE_URL || "https://example.com",
  generateRobotsTxt: true,
};

export default sitemapConfig;
