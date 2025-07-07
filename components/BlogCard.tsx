import React from "react";
import { Github, Link2Icon } from "lucide-react";
// import { Badge } from "../Badge/Badge";
import { Card } from "@vivekkv178/library";

export type BlogCardProps = {
  NavigationComponent: React.ElementType;
  image: string;
  link: string;
  github: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  newTab?: boolean;
};

const BlogCard = ({
  NavigationComponent,
  image,
  link,
  github,
  category,
  title,
  excerpt,
  date,
  author,
  newTab,
}: BlogCardProps) => {
  return (
    <Card className="tw-overflow-hidden tw-rounded-3xl tw-shadow-lg tw-border tw-border-gray-200 dark:tw-border-gray-800 tw-transition-transform tw-duration-300 hover:tw--translate-y-1 hover:tw-shadow-2xl">
      <div className="tw-relative tw-h-56 tw-w-full">
        <img
          src={image}
          alt={title}
          className="tw-absolute tw-inset-0 tw-h-full tw-w-full tw-object-cover"
        />
        <div className="tw-absolute tw-top-4 tw-left-4">
          {/* <Badge className="tw-bg-black/80 tw-text-white tw-text-xs tw-px-3 tw-py-1 tw-rounded-full tw-shadow">
            {category}
          </Badge> */}
        </div>
      </div>

      <div className="tw-p-6 tw-flex tw-flex-col tw-justify-between tw-h-full tw-space-y-4">
        <NavigationComponent
          href={link}
          target={newTab ? "_blank" : ""}
          rel={newTab ? "noopener noreferrer" : ""}
        >
          <h2 className="tw-text-2xl tw-font-semibold tw-leading-snug tw-text-gray-900 dark:tw-text-white hover:tw-underline">
            {title}
          </h2>
        </NavigationComponent>

        <p className="tw-text-gray-600 dark:tw-text-gray-400 tw-text-sm tw-line-clamp-3">{excerpt}</p>

        <div className="tw-flex tw-justify-between tw-items-end tw-pt-4 tw-border-t tw-border-gray-200 dark:tw-border-gray-700">
          <div className="tw-pt-4">
            <p className="tw-text-sm tw-text-gray-900 dark:tw-text-white tw-font-medium">{author}</p>
            <p className="tw-text-xs tw-text-gray-500 dark:tw-text-gray-400">{date}</p>
          </div>
          <div className="tw-flex tw-gap-3 tw-items-center tw-pt-4">
            <NavigationComponent
              href={link}
              target={newTab ? "_blank" : ""}
              rel={newTab ? "noopener noreferrer" : ""}
              className="hover:tw-text-primary"
            >
              <Link2Icon className="tw-w-4 tw-h-4" />
            </NavigationComponent>
            <NavigationComponent
              href={github}
              target={newTab ? "_blank" : ""}
              rel={newTab ? "noopener noreferrer" : ""}
              className="hover:tw-text-primary"
            >
              <Github className="tw-w-4 tw-h-4" />
            </NavigationComponent>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default BlogCard;
