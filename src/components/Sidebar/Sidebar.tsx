import React from "react";
import "./Sidebar.scss";
import ProfilePic from "./ProfilePicture/ProfilePicture";
import { Link } from "gatsby";

const Sidebar = ({ home }: { home: boolean }) => {
  return (
    <header className="side-bar">
      <ProfilePic />
      <div className="bio">
        <h1>Hi!</h1>
        <h2>I am Manish</h2>
        <h3>And this is my blog</h3>
      </div>
      <nav className="nav-container">{!home && <Link to="/">Home</Link>}</nav>
    </header>
  );
};

export default Sidebar;
