import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'

export const IndexPageTemplate = ({
  image,
  name,
  occupation,
  email,
  description,
  references,
  education,
  dev_skills,
  design_skills,
  linkedin
}) => (
  <div>
    <p>{image}</p>
    <p>{name}</p>
    <p>{occupation}</p>
    <p>{email}</p>
    <p>{description}</p>
    <p>{references}</p>
    <p>{education}</p>
    <p>{dev_skills}</p>
    <p>{design_skills}</p>
    <p>{linkedin}</p>
  </div>
)

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  name: PropTypes.string,
  occupation: PropTypes.string,
  email: PropTypes.object,
  description: PropTypes.string,
  references: PropTypes.array,
  education: PropTypes.array,
  dev_skills: PropTypes.array,
  design_skills: PropTypes.array,
  linkedin: PropTypes.object,
}

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <IndexPageTemplate
        image={frontmatter.image}
        name={frontmatter.name}
        occupation={frontmatter.occupation}
        email={frontmatter.email}
        description={frontmatter.description}
        references={frontmatter.references}
        education={frontmatter.education}
        dev_skills={frontmatter.dev_skills}
        design_skills={frontmatter.design_skills}
        linkedin={frontmatter.linkedin}
      />
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        name
        occupation
        email {
          caption
          link
        }
        description
        references {
          quote
          author {
            name
            description
          }
        }
        education {
          school
        }
        dev_skills {
          skill
        }
        design_skills {
          skill
        }
        linkedin {
          caption
          link
        }
      }
    }
  }
`
