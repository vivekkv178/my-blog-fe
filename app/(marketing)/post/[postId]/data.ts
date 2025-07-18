import { cache } from "react";

// getPost will be used twice, but execute only once
export const getPost = cache(async (id: string) => {
  const postData = await fetch(
    `${process?.env?.NEXT_PUBLIC_MY_BLOG_FE_URL}/getBlogData?documentId=${id}`,
    {
      cache: "no-store", // 👈 always fresh
    },
  )
    .then((res) => res.json())
    .catch(() => {});
  return postData;
});
