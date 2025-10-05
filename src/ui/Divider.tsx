import React, { useEffect, useRef, useState } from "react";

type Props = {
  char?: string;
  fontSize?: string;
  className?: string;
  text?: string;
};

const DynamicBorderWithHelp: React.FC<Props> = ({
  char = "=",
  fontSize = "14px",
  className,
  text = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const measurerRef = useRef<HTMLSpanElement>(null);
  const [line, setLine] = useState("");

  const buildLine = () => {
    const container = containerRef.current;
    const measurer = measurerRef.current;
    if (!container || !measurer) return;

    const containerWidth = container.clientWidth;
    const charWidth = measurer.getBoundingClientRect().width || 1;

    // Total number of characters that can fit
    const totalCount = Math.floor(containerWidth / charWidth);

    // Make sure text fits
    const helpLength = text.length;
    const remaining = Math.max(totalCount - helpLength, 0);

    // Split remaining '='s evenly on both sides
    const leftCount = Math.floor(remaining / 2);
    const rightCount = remaining - leftCount;

    const newLine =
      char.repeat(leftCount) + text + char.repeat(rightCount);

    setLine(newLine);
  };

  useEffect(() => {
    buildLine();
    window.addEventListener("resize", buildLine);
    return () => window.removeEventListener("resize", buildLine);
  }, []);

  return (
    <div
      ref={containerRef}
      className={"divider"}
      style={{
        fontFamily: "monospace",
        fontSize,
        whiteSpace: "nowrap",
        overflow: "hidden",
          userSelect: "none",
        padding: "20px 0"
      }}
    >
      {/* hidden measurer */}
      <span
        ref={measurerRef}
        style={{
          position: "absolute",
          visibility: "hidden",
          height: 0,
          fontFamily: "monospace",
          fontSize,
        }}
      >
        {char}
      </span>

      {/* visible line */}
      <span aria-hidden>{line}</span>
    </div>
  );
};

export default DynamicBorderWithHelp;
