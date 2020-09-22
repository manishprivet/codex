import React from "react";
import { Helmet } from "react-helmet";
import { BlogDataQuery } from "../../graphql-types";

export default ({ data }: { data: BlogDataQuery }) => {
  const post = data.mdx;

  return (
    <Helmet
      meta={[
        {
          name: `description`,
          content: post?.frontmatter?.description || post?.excerpt || "",
        },
        {
          property: `og:title`,
          content: post?.frontmatter?.title || "",
        },
        {
          property: `og:description`,
          content: post?.frontmatter?.description || post?.excerpt || "",
        },
        {
          property: `og:image`,
          content: post?.frontmatter?.ogImage || "",
        },
        {
          property: `og:image:width`,
          content: `1200`,
        },
        {
          property: `og:image:height`,
          content: `630`,
        },
        {
          property: `og:image:secure_url`,
          content: post?.frontmatter?.ogImage || "",
        },
        {
          property: `og:type`,
          content: "article",
        },
        {
          property: `og:article:author`,
          content: `Manish Kumar`,
        },
        {
          property: `og:article:section`,
          content: `Technology`,
        },
        {
          property: `og:article:published_time`,
          content: post?.frontmatter?.date || "",
        },
        {
          name: `twitter:title`,
          content: post?.frontmatter?.title || "",
        },
        {
          name: `twitter:description`,
          content: post?.frontmatter?.description || post?.excerpt || "",
        },
      ]}
    />
  );
};
