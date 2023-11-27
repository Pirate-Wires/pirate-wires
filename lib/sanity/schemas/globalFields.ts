import {BlockElementIcon} from "@sanity/icons";
import {defineArrayMember, defineField, defineType} from "sanity";

export default defineType({
  name: "globalFields",
  type: "document",
  title: "Global Fields",
  icon: BlockElementIcon,
  fields: [
    defineField({
      name: "white_pill_bgcolor",
      type: "string",
      title: "White Pill BG Color",
      description: "#HEX, RGB or RGBA",
    }),
    defineField({
      name: "industry_bgcolor",
      type: "string",
      title: "Industry BG Color",
      description: "#HEX, RGB or RGBA",
    }),
    defineField({
      name: "dolores_park_bgcolor",
      type: "string",
      title: "Dolores Park BG Color",
      description: "#HEX, RGB or RGBA",
    }),
  ],
});
