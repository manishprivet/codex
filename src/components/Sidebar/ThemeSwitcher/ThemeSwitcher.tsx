import React from "react";

interface Theme {
  background: string;
  headline: string;
  text: string;
  button: string;
  paragraph: string;
  buttonText: string;
  subHeadline?: string;
}

const THEMES: Theme[] = [
  {
    background: "#0f0e17",
    headline: "#fffffe",
    button: "#ff8906",
    buttonText: "#fffffe",
    paragraph: "#a7a9be",
    text: "#fffffe",
  },
  {
    background: "#fec7d7",
    headline: "#0e172c",
    paragraph: "#0e172c",
    button: "#0e172c",
    buttonText: "#fffffe",
    text: "#0e172c",
  },
  {
    background: "#16161a",
    headline: "#fffffe",
    paragraph: "#94a1b2",
    button: "#7f5af0",
    buttonText: "#fffffe",
    text: "#fffffe",
  },
  {
    background: "#004643",
    headline: "#fffffe",
    paragraph: "#abd1c6",
    button: "#f9bc60",
    buttonText: "#001e1d",
    text: "#fffffe",
  },
  {
    background: "#faeee7",
    headline: "#33272a",
    paragraph: "#594a4e",
    button: "#ff8ba7",
    buttonText: "#33272a",
    text: "#33272a",
  },
];

export default ({
  changeParticlesColor,
}: {
  changeParticlesColor: (s: string) => void;
}) => {
  const changeTheme = (index: number) => {
    const {
      background,
      headline,
      paragraph,
      button,
      buttonText,
      text,
    } = THEMES[index];
    if (typeof window !== undefined) {
      const html = document.querySelector("html") as HTMLElement;
      const style = html.style;

      style.setProperty("--text-color", text);
      style.setProperty("--background-color", background);
      style.setProperty("--headline-color", headline);
      style.setProperty("--paragraph-color", paragraph);
      style.setProperty("--button-color", button);
      style.setProperty("--button-text-color", buttonText);
      if (typeof changeParticlesColor === typeof (() => null))
        changeParticlesColor(text);
    }
  };

  return (
    <div className="theme-switcher-container">
      {THEMES.map((theme, index) => (
        <div
          key={theme.background}
          onClick={() => changeTheme(index)}
          style={{
            height: "25px",
            width: "25px",
            borderRadius: "50%",
            backgroundColor: theme.background,
            border: `2px solid ${theme.button}`,
            cursor: "pointer",
          }}
        />
      ))}
    </div>
  );
};
