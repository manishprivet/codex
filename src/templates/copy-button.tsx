import React, { useState } from "react";

interface Props {
  code: string;
}

export default ({ code }: Props) => {
  const [content, setContent] = useState("Copy");

  const copy = () => {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = code;
    const parentElement = document.body;
    parentElement.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    parentElement.removeChild(textarea);
    setContent("Copied!");
    setTimeout(() => setContent("Copy"), 2500);
  };

  return (
    <button className="copy-button" onClick={copy}>
      {content}
    </button>
  );
};
