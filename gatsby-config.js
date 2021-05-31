module.exports = {
  siteMetadata: {
    title: `Manish's Blog`,
    description: `Hello Hello, You're Here!!! Welcome to Personal Blog! Here I share every exciting thing I learn, my experiences and some of my awesome projects as well.`,
    author: `@manishprivet`,
    siteUrl: `https://blog.manishk.dev`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdowns`,
        path: `${__dirname}/src/markdown`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [".mdx", ".md"],
        gatsbyRemarkPlugins: [
          // {
          //   resolve: `gatsby-remark-highlight-code`,
          // },
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 970,
            },
          },
        ],
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /assets/,
        },
      },
    },
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-sharp`
    },
    // {
    //   resolve: `gatsby-plugin-graphql-codegen`,
    //   options: {
    //     documentPaths: [
    //       './src/**/*.{ts,tsx}',
    //     ],
    //   }
    // },
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Manish's Blog`,
        short_name: `Codex`,
        start_url: `/`,
        background_color: `#16161a`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/profile.jpg`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
