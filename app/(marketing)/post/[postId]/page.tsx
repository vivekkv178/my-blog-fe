import { MDXRemote, MDXRemoteOptions } from "next-mdx-remote-client/rsc";
import remarkGfm from "remark-gfm";
import rehypePrism from "rehype-prism-plus";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import Link from "next/link";
import { Calendar, ChevronLeft, Share2, Tag, Timer } from "lucide-react";

const CONTENT_BASE_URL =
  "https://raw.githubusercontent.com/vivekkv178/my-blog-content/main/";

interface Props {
  params: { postId: string };
}

export default async function Home({ params }: Props) {
  const response = await fetch(
    `${CONTENT_BASE_URL}${params.postId}`.replaceAll("--f--", "/"),
  );
  const source = await response.text();

  if (!source) {
    return (
      <div className="tw-min-h-screen tw-flex tw-items-center tw-justify-center tw-bg-gradient-to-br tw-from-gray-50 tw-to-gray-100 tw-dark:from-gray-900 tw-dark:to-gray-800">
        <div className="tw-text-center">
          <div className="tw-animate-spin tw-rounded-full tw-h-12 tw-w-12 tw-border-b-2 tw-border-gray-900 tw-dark:border-white tw-mx-auto tw-mb-4"></div>
          <p className="tw-text-gray-600 tw-dark:tw-text-gray-300 tw-text-lg">
            Loading content...
          </p>
        </div>
      </div>
    );
  }

  const options: MDXRemoteOptions = {
    mdxOptions: {
      format: "mdx",
      development: process.env.NODE_ENV === "development",
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeSlug,
        rehypePrism,
        [rehypeAutolinkHeadings, { behavior: "wrap" }],
      ],
    },
    parseFrontmatter: true,
    scope: {},
  };

  return (
    <div className="tw-min-h-screen tw-bg-gradient-to-br tw-from-gray-50 tw-to-gray-100 tw-dark:from-gray-900 tw-dark:to-gray-800">
      <main className="tw-container tw-mx-auto tw-px-4 tw-py-8 tw-max-w-4xl">
        {/* Back to Blogs Button */}
        <div className="tw-mb-6">
          <Link
            href="/"
            className="tw-inline-flex tw-items-center tw-text-sm tw-font-medium tw-text-blue-600 hover:tw-text-blue-800 dark:tw-text-blue-400 dark:hover:tw-text-blue-300 tw-transition-colors"
          >
            <ChevronLeft />
            All Posts
          </Link>
          {/* AI Disclaimer */}
          <div className="tw-mt-12 tw-border-l-4 tw-border-yellow-400 tw-pl-4 tw-bg-yellow-50 tw-dark:bg-yellow-900 tw-text-yellow-800 dark:tw-text-yellow-100 tw-rounded">
            <p className="tw-text-sm">
              <strong>Disclaimer:</strong> This content was generated with the
              assistance of AI. Please conduct your own due diligence before
              applying any information presented here.
            </p>
          </div>
        </div>

        <div className="tw-bg-white tw-dark:bg-gray-800 tw-rounded-xl tw-shadow-lg tw-overflow-hidden">
          {/* Blog Post Header */}
          <div className="tw-border-b tw-border-gray-200 tw-dark:tw-border-gray-700 tw-p-6 sm:tw-p-8">
            {/* <h1 className="tw-text-4xl tw-font-bold tw-text-gray-900 tw-dark:tw-text-white tw-mb-4">
              Role-Based Access Control (RBAC) Implementation
            </h1> */}
            <div className="tw-flex tw-items-center tw-space-x-4 tw-text-sm tw-text-gray-600 tw-dark:tw-text-gray-400">
              <span className="tw-flex tw-items-center">
                <Calendar className="w-4 h-4 mr-2" />
                March 19, 2024
              </span>
              {/* <span className="tw-flex tw-items-center">
                <Timer className="w-4 h-4 mr-2" />5 min read
              </span> */}
              <span className="tw-flex tw-items-center">
                <Tag className="w-4 h-4 mr-2" />
                Web Development
              </span>
            </div>
          </div>

          {/* Blog Post Content */}
          <div className="tw-p-6 sm:tw-p-8">
            <article className="tw-prose tw-prose-slate tw-dark:tw-prose-invert tw-max-w-none">
              <MDXRemote source={source} options={options} />
            </article>
          </div>

          {/* Blog Post Footer */}
          <div className="tw-border-t tw-border-gray-200 tw-dark:tw-border-gray-700 tw-p-6 sm:tw-p-8">
            <div className="tw-flex tw-items-center tw-justify-between">
              <div className="tw-flex tw-items-center tw-space-x-4">
                <img
                  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNTYiIGhlaWdodD0iMjYwIiB2aWV3Qm94PSIwIDAgMjU2IDI2MCI+PHBhdGggZD0iTTIzOS4xODQgMTA2LjIwM2E2NC43MiA2NC43MiAwIDAgMC01LjU3Ni01My4xMDNDMjE5LjQ1MiAyOC40NTkgMTkxIDE1Ljc4NCAxNjMuMjEzIDIxLjc0QTY1LjU4NiA2NS41ODYgMCAwIDAgNTIuMDk2IDQ1LjIyYTY0LjcyIDY0LjcyIDAgMCAwLTQzLjIzIDMxLjM2Yy0xNC4zMSAyNC42MDItMTEuMDYxIDU1LjYzNCA4LjAzMyA3Ni43NGE2NC42NyA2NC42NyAwIDAgMCA1LjUyNSA1My4xMDJjMTQuMTc0IDI0LjY1IDQyLjY0NCAzNy4zMjQgNzAuNDQ2IDMxLjM2YTY0LjcyIDY0LjcyIDAgMCAwIDQ4Ljc1NCAyMS43NDRjMjguNDgxLjAyNSA1My43MTQtMTguMzYxIDYyLjQxNC00NS40ODFhNjQuNzcgNjQuNzcgMCAwIDAgNDMuMjI5LTMxLjM2YzE0LjEzNy0yNC41NTggMTAuODc1LTU1LjQyMy04LjA4My03Ni40ODNtLTk3LjU2IDEzNi4zMzhhNDguNCA0OC40IDAgMCAxLTMxLjEwNS0xMS4yNTVsMS41MzUtLjg3bDUxLjY3LTI5LjgyNWE4LjYgOC42IDAgMCAwIDQuMjQ3LTcuMzY3di03Mi44NWwyMS44NDUgMTIuNjM2Yy4yMTguMTExLjM3LjMyLjQwOS41NjN2NjAuMzY3Yy0uMDU2IDI2LjgxOC0yMS43ODMgNDguNTQ1LTQ4LjYwMSA0OC42MDFNMzcuMTU4IDE5Ny45M2E0OC4zNSA0OC4zNSAwIDAgMS01Ljc4MS0zMi41ODlsMS41MzQuOTIxbDUxLjcyMiAyOS44MjZhOC4zNCA4LjM0IDAgMCAwIDguNDQxIDBsNjMuMTgxLTM2LjQyNXYyNS4yMjFhLjg3Ljg3IDAgMCAxLS4zNTguNjY1bC01Mi4zMzUgMzAuMTg0Yy0yMy4yNTcgMTMuMzk4LTUyLjk3IDUuNDMxLTY2LjQwNC0xNy44MDNNMjMuNTQ5IDg1LjM4YTQ4LjUgNDguNSAwIDAgMSAyNS41OC0yMS4zMzN2NjEuMzlhOC4yOSA4LjI5IDAgMCAwIDQuMTk1IDcuMzE2bDYyLjg3NCAzNi4yNzJsLTIxLjg0NSAxMi42MzZhLjgyLjgyIDAgMCAxLS43NjcgMEw0MS4zNTMgMTUxLjUzYy0yMy4yMTEtMTMuNDU0LTMxLjE3MS00My4xNDQtMTcuODA0LTY2LjQwNXptMTc5LjQ2NiA0MS42OTVsLTYzLjA4LTM2LjYzTDE2MS43MyA3Ny44NmEuODIuODIgMCAwIDEgLjc2OCAwbDUyLjIzMyAzMC4xODRhNDguNiA0OC42IDAgMCAxLTcuMzE2IDg3LjYzNXYtNjEuMzkxYTguNTQgOC41NCAwIDAgMC00LjQtNy4yMTNtMjEuNzQyLTMyLjY5bC0xLjUzNS0uOTIybC01MS42MTktMzAuMDgxYTguMzkgOC4zOSAwIDAgMC04LjQ5MiAwTDk5Ljk4IDk5LjgwOFY3NC41ODdhLjcyLjcyIDAgMCAxIC4zMDctLjY2NWw1Mi4yMzMtMzAuMTMzYTQ4LjY1MiA0OC42NTIgMCAwIDEgNzIuMjM2IDUwLjM5MXpNODguMDYxIDEzOS4wOTdsLTIxLjg0NS0xMi41ODVhLjg3Ljg3IDAgMCAxLS40MS0uNjE0VjY1LjY4NWE0OC42NTIgNDguNjUyIDAgMCAxIDc5Ljc1Ny0zNy4zNDZsLTEuNTM1Ljg3bC01MS42NyAyOS44MjVhOC42IDguNiAwIDAgMC00LjI0NiA3LjM2N3ptMTEuODY4LTI1LjU4TDEyOC4wNjcgOTcuM2wyOC4xODggMTYuMjE4djMyLjQzNGwtMjguMDg2IDE2LjIxOGwtMjguMTg4LTE2LjIxOHoiLz48L3N2Zz4="
                  alt="Author"
                  className="tw-w-10 tw-h-10 tw-rounded-full"
                />
                <div>
                  <p className="tw-font-medium tw-text-gray-900 tw-dark:tw-text-white">
                    OpenAI
                  </p>
                  <p className="tw-text-sm tw-text-gray-600 tw-dark:tw-text-gray-400">
                    ChatGPT
                  </p>
                </div>
              </div>
              <div className="tw-flex tw-items-center tw-space-x-4">
                <button className="tw-text-gray-600 tw-dark:tw-text-gray-400 hover:tw-text-blue-600 tw-dark:hover:tw-text-blue-400 tw-transition-colors">
                  <Share2 />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
