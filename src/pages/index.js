import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Img from "gatsby-image"
import SEO from "../components/seo"

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `wordpress`, `mrinal`]} />
    <ul style={{ listStyle: "none" }}>
      {data.allWordpressPost.edges.map(post => (
        <li>
          <Link
            to={`/post/${post.node.slug}`}
            style={{ display: "flex", color: "black", textDecoration: "none" }}
          >
            {post.node.acf.post_thumbnail && (
              <Img
                sizes={
                  post.node.acf.post_thumbnail.localFile.childImageSharp.sizes
                }
                alt={post.node.title}
                style={{ width: "25%", marginRight: 20 }}
              />
            )}

            <div style={{ width: "75%" }}>
              <h3 dangerouslySetInnerHTML={{ __html: post.node.title }} />
              <div dangerouslySetInnerHTML={{ __html: post.node.excerpt }} />
            </div>
          </Link>
        </li>
      ))}
    </ul>
  </Layout>
)

export default IndexPage

export const query = graphql`
  query {
    allWordpressPost {
      edges {
        node {
          title
          excerpt
          slug
          date(formatString: "MMMM DD, YYYY")
          acf {
            post_thumbnail {
              localFile {
                childImageSharp {
                  sizes(maxWidth: 600) {
                    ...GatsbyImageSharpSizes
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
