import React from "react";

import title from "../../ascii/assets/title-2";

import "./Title.styles.css";

const TitleScreen: React.FC = () => {
  return (
    <pre
      className="title font-mono text-green-400 bg-black p-4 overflow-x-auto leading-tight"
      style={{
        fontFamily: "monospace",
        lineHeight: "1",
      }}
    >
      {title}
    </pre>
  );
};

export default TitleScreen;
