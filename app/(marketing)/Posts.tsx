"use client";

import { useEffect, useState } from "react";
import { InfoCard } from "@vivekkv178/library";
import Link from "next/link";

export type Post = {
  doc_id: string;
  image_path: string; // local or CDN image path
  link: string; // internal route to the blog post (usually /post/[slug])
  content_link: string; // raw GitHub URL to the .md file
  github: string; // GitHub repo link to the .md file
  category: string; // e.g., "Tech"
  name: string; // full blog title
  description: string; // short summary or excerpt
  created_at: string; // ISO timestamp (can be parsed with Date)
};

type BlogListProps = {
  posts: Post[];
};

export default function Posts({ posts }: BlogListProps) {
  const [search, setSearch] = useState("");
  const [displayPosts, setDisplayPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (posts) {
      const filteredPosts = posts.filter((post) =>
        post?.name?.toLowerCase()?.includes(search?.toLowerCase()),
      );
      setDisplayPosts(filteredPosts);
    }
  }, [posts, search]);

  return (
    <div className="tw-p-4">
      <input
        type="text"
        placeholder="Search blog posts..."
        className="tw-mb-6 tw-p-2 tw-border tw-border-primary tw-rounded-md tw-w-full tw-sticky"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {displayPosts?.length ? (
        <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-4">
          {displayPosts.map((post, index) => (
            <Link
              href={`${post.link}?id=${post.doc_id}`}
              key={index}
              target="_blank"
            >
              <InfoCard
                key={index}
                NavigationComponent={Link}
                image={`${process?.env?.NEXT_PUBLIC_CDN_PATH}${post.image_path}`}
                link={`${post.link}?id=${post.doc_id}`}
                github={post.github}
                category={post.category}
                name={post.name}
                description={post.description}
                newTab={true}
              />
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}
