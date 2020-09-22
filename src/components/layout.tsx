import React, { useRef } from "react";
import "../styles/layout.scss";
import Particles, { IParticlesParams } from "react-tsparticles";

import tsParticlesConfig from "../json/tsParticles.json";
import Sidebar from "./Sidebar/Sidebar";
import { Container } from "tsparticles/dist/Core/Container";

interface Props {
  children: React.ReactNode;
  home?: boolean;
}

const Layout = ({ children, home }: Props) => {
  const ref = useRef<Container>(null);

  const changeParticleColor = (color: string) => {
    const container = ref.current;
    container?.options.particles.color.load({ value: color });
    container?.refresh();
  };

  return (
    <>
      <Particles
        container={ref}
        className="particles"
        options={tsParticlesConfig as IParticlesParams}
      />
      <div className="main-container">
        <Sidebar
          changeParticlesColor={changeParticleColor}
          home={home || false}
        />
        <main className="content">
          <div className="content-background" />
          {children}
        </main>
      </div>
    </>
  );
};

export default Layout;
