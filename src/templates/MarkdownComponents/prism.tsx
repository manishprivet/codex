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
  const className = props.children.props.className || "";
  const matches = className.match(/language-(?<lang>.*)/);
  return (
    <Highlight
      {...defaultProps}
      theme={theme}
      code={props.children.props.children?.toString() || ""}
      language={
        (matches && matches.groups && matches.groups.lang
          ? matches.groups.lang
          : "") as Language
      }
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => {
        const emptyLines =
          tokens.filter(token => token.length === 1 && token[0].content === "")
            .length - 1;
        const validLines = tokens.length - emptyLines;
        return (
          <Scrollbars
            style={{
              height: `calc(2em + ${validLines * 29.6}px - 10px + ${
                (emptyLines - 1) * 5
              }px)`,
              borderRadius: "0.3em",
            }}
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
                  marginRight: "-15px",
                  marginBottom: "-15px",
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
