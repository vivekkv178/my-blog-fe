import { ImageResponse } from "next/og";

// Route Segment Config
export const runtime = "edge"; // required for OG image generation
export const alt = "Blog Post Preview Image";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: { postId: string };
}) {
  const fileName = params.postId; // e.g., "react--f--react-state-management-upskilling-with-ai.md"
  const image = fileName.replace(/^.*--f--/, "").replace(/\.md$/, ".png");

  return new ImageResponse(
    (
      <img
        src={`${process.env.NEXT_PUBLIC_CDN_PATH}${image}`}
        width={1200}
        height={630}
        alt="OG Image"
      />
    ),
    {
      ...size,
    },
  );
}
