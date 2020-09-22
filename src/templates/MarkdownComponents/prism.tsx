import React from "react";
import Highlight, { defaultProps, Language } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/dracula";
import { Scrollbars } from "react-custom-scrollbars";

interface Props {
  children: {
    props: {
      className: string;
      children: React.ReactNode;
    };
  };
}

export default (props: Props) => {
  // classname of Component
  const className = props.children.props.className || "";
  // Language Matches in class
  const matches = className.match(/language-(?<lang>.*)/);
  // Get language from classname
  const language = (matches && matches.groups && matches.groups.lang
    ? matches.groups.lang
    : "") as Language;
  // Actual Code
  const code = props.children.props.children?.toString() || "";

  return (
    <Highlight {...defaultProps} theme={theme} code={code} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => {
        // Number of Lines in code
        const lines = tokens.length;
        // Height of Codeblock according to Lines
        const height = `calc(2em + (${lines} * var(--token-line-height)) - 5px)`;

        return (
          <Scrollbars
            style={{ height, borderRadius: "0.3em" }}
            renderView={props => (
              <pre
                className={className}
                {...props}
                style={{
                  ...style,
                  position: "absolute",
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  overflow: "scroll",
                  marginRight: "-16px",
                  marginBottom: "-16px",
                  transition: "none",
                  padding: "1em",
                  borderRadius: "0.3em",
                }}
              />
            )}
            renderTrackVertical={() => <div style={{ display: "none" }} />}
            renderThumbHorizontal={props => (
              <div
                {...props}
                style={{
                  ...props.style,
                  borderRadius: "3px",
                  background: "rgba(255,255,255,0.5)",
                }}
              />
            )}
            autoHide
            autoHideTimeout={1000}
            autoHideDuration={200}
            universal
          >
            {tokens.map((line, i) => (
              <div {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </Scrollbars>
        );
      }}
    </Highlight>
  );
};
