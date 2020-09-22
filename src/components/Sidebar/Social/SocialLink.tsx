import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaGlobe,
  FaNotEqual,
} from "react-icons/fa";

export type SocialMediaNames =
  | "facebook"
  | "twitter"
  | "linkedin"
  | "github"
  | "instagram"
  | "website";

export interface SocialLinksProps {
  type: SocialMediaNames;
  link: string;
}

const SocialLink = ({ type, link }: SocialLinksProps) => (
  <a
    href={link}
    className="social-link"
    target="_blank"
    rel="noreferrer noopener"
  >
    {GetIcon(type)}
  </a>
);

const GetIcon = (type: SocialMediaNames) => {
  switch (type) {
    case "facebook":
      return <FaFacebook className="social-icon" />;
    case "github":
      return <FaGithub className="social-icon" />;
    case "instagram":
      return <FaInstagram className="social-icon" />;
    case "linkedin":
      return <FaLinkedin className="social-icon" />;
    case "twitter":
      return <FaTwitter className="social-icon" />;
    case "website":
      return <FaGlobe className="social-icon" />;
    default:
      return <FaNotEqual className="social-icon" />;
  }
};

export default SocialLink;
