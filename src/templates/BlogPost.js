import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import SEO from "../components/seo"
import Layout from "../components/layout"

const BlogPostTemplate = ({ data }) => (
  <Layout>
    <SEO
      title={data.wordpressPost.title}
      description={data.wordpressPost.excerpt}
    />
    {data.wordpressPost.acf.post_thumbnail && (
      <Img
        sizes={
          data.wordpressPost.acf.post_thumbnail.localFile.childImageSharp.sizes
        }
        alt={data.wordpressPost.title}
        style={{ maxHeight: 450 }}
      />
    )}
    <h1>{data.wordpressPost.title}</h1>
    <p>Written on {data.wordpressPost.date}</p>
    <p dangerouslySetInnerHTML={{ __html: data.wordpressPost.content }}></p>
  </Layout>
)

export default BlogPostTemplate
export const query = graphql`
  query($id: Int!) {
    wordpressPost(wordpress_id: { eq: $id }) {
      title
      content
      excerpt
      date(formatString: "MMMM DD, YYYY")
      wordpress_id
      acf {
        post_thumbnail {
          localFile {
            childImageSharp {
              sizes(maxWidth: 1200) {
                ...GatsbyImageSharpSizes
              }
            }
          }
        }
      }
    }
  }
`
