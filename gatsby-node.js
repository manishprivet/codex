const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `Mdx`) {
    const slug = createFilePath({ node, getNode });

    createNodeField({ node, name: `slug`, value: slug });
  }
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  return graphql(`
    {
      allMdx {
        edges {
          node {
            fields {
              slug
            }
          }
        }
        totalCount
      }
    }
  `).then(result =>
    result.data.allMdx.edges.map(({ node }) => {
      createPage({
        path: node.fields.slug,
        component: path.resolve(`./src/templates/blog-post.tsx`),
        context: {
          slug: node.fields.slug,
        },
      });
    })
  );
};

exports.default = {
  plugins: [
    {
      resolve: `gatsby-plugin-graphql-codegen`,
      options: {
        fileName: `./gatsby-graphql.ts`,
        documentPaths: [
          "./src/**/*.{ts,tsx}",
          "./node_modules/gatsby-*/**/*.js",
          "./gatsby-node.ts",
        ],
      },
    },
  ],
};
