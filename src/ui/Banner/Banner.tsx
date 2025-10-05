import React from "react";

import { mirrorAscii } from "../../ascii/mirrorAscii";
import leaf from "../../ascii/assets/leaf";

import "./Banner.styles.css";

const Banner = ({ mirror = false }: { mirror?: boolean }) => {
  return (
    <div className="leaf-banner-container">
      <pre className="leaf-banner">{mirror ? mirrorAscii(leaf) : leaf}</pre>
    </div>
  );
};

export default Banner;
