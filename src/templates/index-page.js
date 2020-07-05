import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import showdown from 'showdown'

import Layout from '../components/Layout'

const converter = new showdown.Converter()

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
}) => {
  const imageUrl = !!image.childImageSharp ? image.childImageSharp.fluid.src : image
  return (
    <div className="is-fullheight">
      <div className="columns is-tablet is-fullheight is-gapless">
        <div className="column image" style={{backgroundImage:`url(${imageUrl})`}}></div>
        <div className="column content main-content">
          <div className="content">
            <h4 className="white-text title is-4 has-text-centered-mobile" id="name">{name}</h4>
            <h6 className="subtitle is-6 mb-0 has-text-centered-mobile is-uppercase" id="occupation">{occupation}</h6>
          </div>
          <div className="content">
            <a className="button is-primary is-fullwidth is-outlined has-text-weight-bold" href={`${email.link}`}>{email.caption}</a>
          </div>
          <div className="content" dangerouslySetInnerHTML={{__html: converter.makeHtml(description)}} />
          <div className="content">
            <h6 className="subtitle is-6 mb-1 is-uppercase">REFERENCES</h6>
            {references.map((ref) => (
              <blockquote key={ref.author.name}>
                <p>{`“${ref.quote}”`}</p>
                <footer className="blue-text">{`${ref.author.name}, `}<cite>{ref.author.description}</cite></footer>
              </blockquote>
            ))}
          </div>
          <div className="content">
            <h6 className="subtitle is-6 mb-1 is-uppercase">EDUCATION</h6>
            {education.map((el) => (
              <p key={el} className="mb-0">{el}</p>
            ))}
          </div>
          <div className="content">
            <h6 className="subtitle is-6 mb-1 is-uppercase">DEVELOPMENT SKILLS</h6>
            <p>{dev_skills}</p>
          </div>
          <div className="content">
            <h6 className="subtitle is-6 mb-1 is-uppercase">CREATIVE SKILLS</h6>
            <p>{design_skills}</p>
          </div>
          <div className="content">
            <a className="button is-primary is-fullwidth is-outlined has-text-weight-bold" href={`${linkedin.link}`}>{linkedin.caption}</a>
          </div>
        </div>
      </div>
    </div>
  )
}

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  name: PropTypes.string,
  occupation: PropTypes.string,
  email: PropTypes.object,
  description: PropTypes.string,
  references: PropTypes.array,
  education: PropTypes.array,
  dev_skills: PropTypes.string,
  design_skills: PropTypes.string,
  linkedin: PropTypes.object,
}

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark
  console.log(data)
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
            fluid(maxWidth: 1500, quality: 60) {
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
        education 
        dev_skills
        design_skills 
        linkedin {
          caption
          link
        }
      }
    }
  }
`
