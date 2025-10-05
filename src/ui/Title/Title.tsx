import React from "react";

import title from "../../ascii/assets/title";

import "./Title.styles.css";

const TitleScreen: React.FC = () => {
  return (
    <pre
      className="title font-mono text-green-400 bg-black p-4 overflow-x-auto text-xs leading-tight"
      style={{
        fontFamily: "monospace",
        fontSize: "70%",
        lineHeight: "1",
      }}
    >
      {title}
    </pre>
  );
};

export default TitleScreen;
