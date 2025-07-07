// app/post/[slug]/opengraph-image.tsx

import { ImageResponse } from "next/og";

export const runtime = "edge";
export const contentType = "image/png";
export const size = { width: 1200, height: 630 };

export default async function Image({
  params,
}: {
  params: { postId: string };
}) {
  const cleanSlug = params.postId.replace(/^.*--f--/, "").replace(/\.md$/, "");
  //   const imageUrl = `${process.env.NEXT_PUBLIC_CDN_PATH}/${cleanSlug}.png`;
  console.log(cleanSlug);
  
  const imageUrl =
    "https://raw.githubusercontent.com/vivekkv178/cdn/main/blog/react-state-management-upskilling-with-ai.png";
  console.log(imageUrl);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#000",
        }}
      >
        <img
          src={imageUrl}
          alt="OG Image"
          width={1200}
          height={630}
          style={{ objectFit: "cover" }}
        />
      </div>
    ),
    {
      ...size,
    },
  );
}
