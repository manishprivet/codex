import React, { useRef, useEffect, useState } from "react";
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
  const [particles, setParticles] = useState(
    tsParticlesConfig as IParticlesParams
  );

  const changeParticleColor = (color: string) => {
    const container = ref.current;
    container?.options.particles.color.load({ value: color });
    container?.refresh();
  };

  useEffect(() => {
    if (typeof window !== undefined) {
      const particlesColor = getComputedStyle(document.body);
      ref.current?.options.particles.color.load({
        value: particlesColor.getPropertyValue("--text-color"),
      });
      ref.current?.refresh();
    }
  }, []);

  return (
    <>
      <Particles container={ref} className="particles" options={particles} />
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
