import { BlockElementIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "globalFields",
  type: "document",
  title: "Global Fields",
  icon: BlockElementIcon,
  fields: [
    defineField({
      name: "pirate_wires_bgcolor",
      type: "string",
      title: "Pirate Wires Theme Color",
      description: "#HEX, RGB or RGBA",
    }),
    defineField({
      name: "pirateWiresTagline",
      type: "string",
      title: "PW tagline",
    }),
    defineField({
      name: "pirateWiresDescription",
      type: "text",
      title: "PW Description",
    }),
    defineField({
      name: "pirateWiresFrequency",
      type: "string",
      title: "PW Newsletter Frequency",
    }),

    defineField({
      name: "white_pill_bgcolor",
      type: "string",
      title: "White Pill Theme Color",
      description: "#HEX, RGB or RGBA",
    }),
    defineField({
      name: "whitePillTagline",
      type: "string",
      title: "White Pill tagline",
    }),
    defineField({
      name: "whitePillDescription",
      type: "text",
      title: "White Pill Description",
    }),
    defineField({
      name: "whitePillFrequency",
      type: "string",
      title: "White Pill Newsletter Frequency",
    }),

    defineField({
      name: "industry_bgcolor",
      type: "string",
      title: "Industry Theme Color",
      description: "#HEX, RGB or RGBA",
    }),
    defineField({
      name: "industryTagline",
      type: "string",
      title: "Industry tagline",
    }),
    defineField({
      name: "industryDescription",
      type: "text",
      title: "Industry Description",
    }),
    defineField({
      name: "industryFrequency",
      type: "string",
      title: "Industry Newsletter Frequency",
    }),

    defineField({
      name: "dolores_park_bgcolor",
      type: "string",
      title: "Dolores Park Theme Color",
      description: "#HEX, RGB or RGBA",
    }),
    defineField({
      name: "doloresParkTagline",
      type: "string",
      title: "Dolores Park tagline",
    }),
    defineField({
      name: "doloresParkDescription",
      type: "text",
      title: "Dolores Park Description",
    }),
    defineField({
      name: "doloresParkFrequency",
      type: "string",
      title: "Dolores Park Newsletter Frequency",
    }),
  ],
});
