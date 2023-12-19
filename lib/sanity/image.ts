import createImageUrlBuilder from "@sanity/image-url";

const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET as string;
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID as string;
const imageBuilder = createImageUrlBuilder({ projectId, dataset });

export const urlForImage = (source: any) => {
  if (!source || !source.asset) return;
  const dimensions = source?.asset?._ref.split("-")[2];

  const [width, height] = dimensions.split("x").map(num => parseInt(num, 10));

  const url = imageBuilder.image(source).auto("format").width(Math.min(width, 2000)).url();

  return {
    src: url,
    width: width,
    height: height,
  };
};
