import React from "react";
import Image, { FluidObject } from "gatsby-image";
import { graphql, useStaticQuery } from "gatsby";
import { ProfilePicQuery } from "../../../../graphql-types";

const ProfilePic = () => {
  const data: ProfilePicQuery = useStaticQuery(graphql`
    query ProfilePic {
      placeholderImage: file(relativePath: { eq: "profile.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);

  return (
    <Image
      style={{
        height: "80px",
        width: "80px",
        border: "0 solid var(--text-color)",
        borderRadius: "50%",
      }}
      fluid={data.placeholderImage?.childImageSharp?.fluid as FluidObject}
    />
  );
};

export default ProfilePic;
