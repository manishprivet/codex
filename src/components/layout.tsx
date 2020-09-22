import React from "react";
import "./layout.scss";
import Particles, { IParticlesParams } from "react-tsparticles";

import tsParticlesConfig from "../json/tsParticles.json";
import Sidebar from "./Sidebar/Sidebar";

interface Props {
  children: React.ReactNode;
  home?: boolean;
}

const Layout = ({ children, home }: Props) => {
  return (
    <>
      <Particles
        className="particles"
        options={tsParticlesConfig as IParticlesParams}
      />
      <div className="main-container">
        <Sidebar home={home || false} />
        <main className="content">
          <div className="content-background" />
          {children}
        </main>
      </div>
    </>
  );
};

export default Layout;
