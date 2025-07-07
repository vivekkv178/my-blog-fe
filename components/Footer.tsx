"use client";
import React from "react";
import Link from "next/link";
import {
  BuiltWith,
  Footer as FooterComponent,
  Icons,
} from "@vivekkv178/library";

const Footer = () => {
  return (
    <>
      <FooterComponent
        copyrightText=""
        NavigationComponent={Link}
        socials={{
          github: "https://github.com/vivekkv178/my-blog-fe",
        }}
      />
      <BuiltWith
        techStack={[
          { icon: Icons.ts, name: "Typescript" },
          { icon: Icons.tailwind, name: "Tailwind CSS" },
          { icon: Icons.next, name: "Next.js" },
          { icon: "logos:firebase", name: "Firebase Firestore" },
          { icon: "logos:github-icon", name: "Github" },
        ]}
      />
    </>
  );
};

export default Footer;
