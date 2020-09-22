import React from "react";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { MDXProvider } from "@mdx-js/react";
import Layout from "../components/layout";
import { BlogDataQuery } from "../../graphql-types";
import SEO from "../components/seo";
import BlogSEO from "./blog-seo";
import "../styles/blog-post.scss";
// import { defineCustomElements as deckDeckGoHighlightElement } from "@deckdeckgo/highlight-code/dist/loader";
import Components from "./MarkdownComponents";
import { PropOptions } from "@deckdeckgo/highlight-code/dist/types/stencil-public-runtime";
import "../styles/prism.css";

// deckDeckGoHighlightElement();

const inlineCode = (props: PropOptions) => (
  <code className="inline-code" {...props} />
);

export default ({ data }: { data: BlogDataQuery }) => {
  const post = data.mdx;

  return (
    <Layout>
      <SEO title={post?.frontmatter?.title || `Manish's Blog`} />
      <BlogSEO data={data} />
      <div className="blog-post">
        <h1 className="blog-title">{post?.frontmatter?.title}</h1>
        <div className="blog-content">
          <MDXProvider components={{ ...Components, inlineCode }}>
            <MDXRenderer>{post?.body || ""}</MDXRenderer>
          </MDXProvider>
        </div>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query BlogData($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      frontmatter {
        title
        ogImage
        date
        description
      }
      excerpt
    }
  }
`;
