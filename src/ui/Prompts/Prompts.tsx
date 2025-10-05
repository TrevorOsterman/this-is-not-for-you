import React from "react";

import "./Prompts.styles.css";

const Prompts = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="prompts-container">
      {children}
    </div>
  );
}

export default Prompts;
