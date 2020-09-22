import React from "react";

const Link = require("../../assets/link.svg") as React.FunctionComponent<
  React.SVGAttributes<SVGElement>
>;

interface Props {
  children: React.ReactNode;
}

const LinkButton = ({ id, scale }: { id: string; scale?: number }) => (
  <a className="heading-link-button" href={`#${id}`}>
    <Link
      style={{ height: "100%", transform: `scale(${scale || 1})` }}
      fill="var(--paragraph-color)"
    />
  </a>
);

const h1 = ({ children, ...props }: Props) => {
  const id = children?.toString().replace(" ", "-") || "";
  return (
    <h1 id={id} {...props}>
      <LinkButton id={id} />
      {children}
    </h1>
  );
};

const h2 = ({ children, ...props }: Props) => {
  const id = children?.toString().replace(" ", "-") || "";
  return (
    <h2 id={id} {...props}>
      <LinkButton scale={0.95} id={id} />
      {children}
    </h2>
  );
};
const h3 = ({ children, ...props }: Props) => {
  const id = children?.toString().replace(" ", "-") || "";
  return (
    <h3 id={id} {...props}>
      <LinkButton scale={0.8} id={id} />
      {children}
    </h3>
  );
};
const h4 = ({ children, ...props }: Props) => {
  const id = children?.toString().replace(" ", "-") || "";
  return (
    <h4 id={id} {...props}>
      <LinkButton scale={0.75} id={id} />
      {children}
    </h4>
  );
};
const h5 = ({ children, ...props }: Props) => {
  const id = children?.toString().replace(" ", "-") || "";
  return (
    <h5 id={id} {...props}>
      <LinkButton scale={0.7} id={id} />
      {children}
    </h5>
  );
};
const h6 = ({ children, ...props }: Props) => {
  const id = children?.toString().replace(" ", "-") || "";
  return (
    <h6 id={id} {...props}>
      <LinkButton scale={0.6} id={id} />
      {children}
    </h6>
  );
};

export default { h1, h2, h3, h4, h5, h6 };
