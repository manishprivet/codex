import React from "react";
import "../../styles/sidebar.scss";
import ProfilePic from "./ProfilePicture/ProfilePicture";
import { Link } from "gatsby";
import SocialLink, { SocialLinksProps } from "./Social/SocialLink";
import { FaExternalLinkSquareAlt } from "react-icons/fa";
import ThemeSwitcher from "./ThemeSwitcher/ThemeSwitcher";

const links: SocialLinksProps[] = [
  { type: "website", link: "https://manish.codes" },
  { type: "github", link: "https://github.com/manishprivet" },
  { type: "linkedin", link: "https://linkedin.com/in/manishprivet" },
  { type: "instagram", link: "https://instagram.com/manishprivet" },
  { type: "twitter", link: "https://twitter.com/manishprivet" },
  { type: "facebook", link: "https://facebook.com/manishprivet" },
];

interface Props {
  home: boolean;
  changeParticlesColor: (v: string) => void;
}

const Sidebar = ({ home, changeParticlesColor }: Props) => {
  return (
    <header className="side-bar">
      <ProfilePic />
      <div className="bio">
        <h1>Hi!</h1>
        <h2>I am Manish</h2>
        <h3>And this is my blog</h3>
        <p>
          Here I share every exciting thing I learn, my experiences and some of
          my awesome projects as well.
        </p>
      </div>
      <nav className="nav-container">
        {!home && <Link to="/">Home</Link>}
        <a
          href="https://manish.codes"
          target="_blank"
          rel="noreferrer noopener"
        >
          Portfolio{" "}
          <FaExternalLinkSquareAlt style={{ height: "13px", width: "13px" }} />
        </a>
      </nav>
      <div className="social-container">
        <h2 className="social-title">Reach Me Out</h2>
        <div className="social">
          {links.map(link => (
            <SocialLink key={link.type} {...link} />
          ))}
        </div>
        <ThemeSwitcher changeParticlesColor={changeParticlesColor} />
      </div>
    </header>
  );
};

export default Sidebar;
