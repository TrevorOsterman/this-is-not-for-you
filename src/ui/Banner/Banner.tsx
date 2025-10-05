import React from "react";

import { leaf, mirrorAscii } from "../ascii";

import "./Banner.styles.css";

const Banner = ({
  mirror = false,
  repeats = 5,
}: {
  mirror?: boolean;
  repeats?: number;
}) => {
  const initialIcon = mirror ? mirrorAscii(leaf) : leaf;
  const mirroredIcon = mirrorAscii(initialIcon);

  return (
    <div className="leaf-banner-container">
      <pre className="leaf-banner">{initialIcon}</pre>
      <pre className="leaf-banner">{mirroredIcon}</pre>
      <pre className="leaf-banner">{initialIcon}</pre>
      <pre className="leaf-banner">{mirroredIcon}</pre>
          <pre className="leaf-banner">{initialIcon}</pre>
                <pre className="leaf-banner">{mirroredIcon}</pre>
    </div>
  );
};

export default Banner;
