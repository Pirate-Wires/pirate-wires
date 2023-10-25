import Link from "next/link";
import PostList from "@/components/postlist";
import Featured from "@/components/featured";
import styles from "../../../styles/home.module.scss"
import LatestWriters from "@/components/latestWriters";
import PodcastCallout from "@/components/podcastCallout";
import NewsletterCallout from "@/components/newsletterCallout";

export default function Industry({ pageData }) {

  return (
    <>
      <h2>{pageData.tagline}</h2>

    </>
  );
}
