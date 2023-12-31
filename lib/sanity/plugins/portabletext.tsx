// lib/sanity/plugins/portabletext.tsx
import Image from "next/image";
import Link from "next/link";
import {PortableText as PortableTextComponent} from "@portabletext/react";
// import HorizontalRule from "@/lib/sanity/schemas/HorizontalRule";

import {urlForImage} from "@/lib/sanity/image";
import Iframe from "react-iframe";
import articleStyles from "@/styles/pages/article.module.scss";
import getVideoId from "get-video-id";
import {cx} from "@/lib/utils/all";

import Refractor from "react-refractor";
// @ts-ignore
import js from "refractor/lang/javascript";
// @ts-ignore
import jsx from "refractor/lang/jsx";
// @ts-ignore
import html from "refractor/lang/markup";
// @ts-ignore
import css from "refractor/lang/css";
// @ts-ignore
import bash from "refractor/lang/bash";
import React from "react";

Refractor.registerLanguage(js);
Refractor.registerLanguage(jsx);
Refractor.registerLanguage(html);
Refractor.registerLanguage(css);
Refractor.registerLanguage(bash);

// Barebones lazy-loaded image component
const ImageComponent = ({value}) => {
  // const {width, height} = getImageDimensions(value)
  return (
    <>
      <Image
        src={urlForImage(value) || ""}
        alt={value.alt_text || ""}
        loading="lazy"
        className="object-cover"
        sizes="800px"
      />
      {value.caption ? (
        <span className={articleStyles.caption}>
          <PortableText value={value.caption} />
        </span>
      ) : (
        ""
      )}
    </>
  );
};

const PortableTextTable = ({value}) => {
  const [head, ...rows] = value.table.rows;

  return (
    <table>
      {head.cells.filter(Boolean).length > 0 && (
        <thead>
          <tr>
            {head.cells.map(cell => (
              <th key={cell}>{cell}</th>
            ))}
          </tr>
        </thead>
      )}
      <tbody>
        {rows.map((row, index) => (
          <tr key={index}>
            {row.cells.map((cell, index) => {
              return <td key={cell}>{cell}</td>;
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const Code = ({value}) => {
  return (
    <Refractor
      // In this example, `props` is the value of a `code` field
      language={value.language || "bash"}
      value={value.code}
      markers={value.highlightedLines}
    />
  );
};

const IframePreview = ({value}) => {
  const {url, height} = value;
  if (!url) {
    return <p>Missing Embed URL</p>;
  }
  const {id, service} = getVideoId(url);

  const isYoutubeVideo = id && service === "youtube";

  const finalURL = isYoutubeVideo
    ? `https://www.youtube-nocookie.com/embed/${id}`
    : url;

  return (
    <Iframe
      url={finalURL}
      width="100%"
      height={height || "350"}
      className={cx(!height && "aspect-video", "rounded-xs")}
      display="block"
      position="relative"
      frameBorder={0}
      allowFullScreen
      loading="lazy"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen; gyroscope; picture-in-picture"
    />
  );
};

const components = {
  types: {
    image: ImageComponent,
    code: Code,
    embed: IframePreview,
    tables: PortableTextTable,
  },
  marks: {
    center: props => <div className="text-center">{props.children}</div>,
    highlight: props => (
      <span className="font-bold text-blue-500">{props.children}</span>
    ),
    link: ({children, value}) => {
      const rel = !value.href.startsWith("/") ? "noopener" : undefined;
      const target = !value.href.startsWith("/") ? "_blank" : undefined;
      return (
        <a href={value.href} rel={rel} target={target}>
          {children}
        </a>
      );
    },
    internalLink: ({children, value}) => {
      if (!value || !value.slug || !value.slug.current) {
        // Render the children without a link if the value or slug is not available
        return <>{children}</>;
      }

      // If the value and slug are available, render the link
      return <Link href={`/p/${value.slug.current}`}>{children}</Link>;
    },
  },
};
// Set up Portable Text serialization
export const PortableText = props => (
  <PortableTextComponent components={components} {...props} />
);
