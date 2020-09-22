import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import { BlogListQuery } from "../../graphql-types";
import BlogCard from "../components/BlogCard/BlogCard";

interface Props {
  data: BlogListQuery;
}

const IndexPage = ({ data }: Props) => {
  return (
    <Layout home>
      <SEO title="Home" />
      {data.allMdx.edges.map(({ node }) => (
        <BlogCard
          key={node.id}
          date={node.frontmatter?.date}
          link={node.fields?.slug}
          description={node.frontmatter?.description || node.excerpt}
          title={node.frontmatter?.title}
        />
      ))}
    </Layout>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query BlogList {
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          id
          frontmatter {
            date
            title
            description
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`;
