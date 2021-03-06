module.exports = {
  siteMetadata: {
    title: `hillsofcode`,
    author: {
      name: `Hill Onyechekwa`,
      summary: `Frontend engineer and acclaimed web illusionist living in Lagos, Nigeria.`,
      fullsummary: `Hill Onyechekwa is a frontend engineer, acclaimed web illusionist, technical content creator and tutor living and working in Lagos, Nigeria`,
    },
    description: `Hillsofcode is techcnical blog about cool frontend developement things like web animation, Javascript, the JAMstack and more.`,
    siteUrl: `https://hillsofcode.netlify.app/`,
    social: {
      twitter: `madeofhill`,
    },
  },
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-netlify-cms`,
    // {
    //   resolve: `gatsby-plugin-local-search`,
    //   options: {
    //     name: `posts`,
    //     engine: `flexsearch`,
    //     engineOptions: `speed`,
    //     query:`{
    //       allMarkdownRemark{
    //         nodes{
    //           id
    //           frontmatter{
    //             title
    //             tags
    //           }
    //         }
    //       }
    //     }`,
    //     ref: `id`,
    //     index: [`title`, `tags`, `description`],
    //     normalizer: ({data}) => {
    //       data.allMarkdownRemark.nodes.map((node)=>({
    //         id: node.id,
    //         title: node.frontmatter.title,
    //         tags: node.frontmatter.tags,
    //       }))
    //     }
    //   }     
    // },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    // {
    //   resolve: `gatsby-plugin-google-analytics`,
    //   options: {
    //     trackingId: `ADD YOUR TRACKING ID HERE`,
    //   },
    // },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.nodes.map(node => {
                return Object.assign({}, node.frontmatter, {
                  description: node.excerpt,
                  date: node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + node.fields.slug,
                  guid: site.siteMetadata.siteUrl + node.fields.slug,
                  custom_elements: [{ "content:encoded": node.html }],
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  nodes {
                    excerpt
                    html
                    fields {
                      slug
                    }
                    frontmatter {
                      title
                      date
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "Gatsby Starter Blog RSS Feed",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gatsby Starter Blog`,
        short_name: `GatsbyJS`,
        start_url: `/`,
        background_color: `#ffffff`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/hoc-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
          "298037574",
        ],
        gtagConfig: {
          optimize_id: "OPT-KC53LRR",
          anonymize_ip: true,
          cookie_expiers: 0,
        },
        pluginConfig: {
          head: false,
        }
      }
    },
    `gatsby-plugin-react-helmet`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
