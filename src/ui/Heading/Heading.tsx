import React from "react";

import { heading } from "../ascii";

import "./Heading.styles.css";

const Heading = () => {
  return <pre className="heading">{heading}</pre>;
};

export default Heading;
