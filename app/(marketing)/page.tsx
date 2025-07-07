"use client";

import { useState } from "react";
import { InfoCard } from "@vivekkv178/library";
import Link from "next/link";

const mockPosts = [
  {
    image: `${process.env.NEXT_PUBLIC_CDN_PATH}/blog/react-state-management-upskilling-with-ai.png`,
    link: "/post/react--f--react-state-management-upskilling-with-ai.md",
    content_link:"https://raw.githubusercontent.com/vivekkv178/my-blog-content/main/react/react-state-management-upskilling-with-ai.md",
    github:
      "https://github.com/vivekkv178/my-blog-content/blob/main/react/react-state-management-upskilling-with-ai.md",
    category: "Tech",
    name: "Designing State Management in React: A Practical Guide",
    description:
      "A hands-on guide to building scalable, maintainable state architecture in React using Context, Custom Hooks, and Redux Toolkit.",
  },
];

export default function Home() {
  const [search, setSearch] = useState("");

  const filteredPosts = mockPosts.filter((post) =>
    post.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="tw-p-4">
      <input
        type="text"
        placeholder="Search blog posts..."
        className="tw-mb-6 tw-p-2 tw-border tw-border-primary tw-rounded-md tw-w-full tw-sticky"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-4">
        {filteredPosts.map((post, index) => (
          <Link href={post.link} key={index} target="_blank">
            <InfoCard
              key={index}
              NavigationComponent={Link}
              image={post.image}
              link={post.link}
              github={post.github}
              category={post.category}
              name={post.name}
              description={post.description}
              newTab={true}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
