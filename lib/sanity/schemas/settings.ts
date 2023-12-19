import { CogIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "settings",
  type: "document",
  title: "Site Settings",
  icon: CogIcon,
  fieldsets: [
    {
      title: "SEO & metadata",
      name: "metadata",
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
    {
      title: "Social Media",
      name: "social",
    },
    {
      title: "Website Logo",
      name: "logos",
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
  ],
  fields: [
    defineField({
      title: "URL",
      name: "url",
      type: "url",
      description: "The main site url. Used to create canonical url",
    }),
    defineField({
      name: "meta_title",
      type: "string",
      fieldset: "metadata",
      title: "Meta title",
    }),
    defineField({
      title: "Meta Description",
      name: "meta_description",
      fieldset: "metadata",
      type: "text",
      rows: 5,
      validation: Rule => Rule.min(20).max(200),
      description: "Enter SEO Meta Description",
    }),

    defineField({
      name: "openGraphImage",
      type: "image",
      title: "Open Graph Image",
      description: "Image for sharing previews on Facebook, Twitter etc.",
      fieldset: "metadata",
    }),
  ],
});
