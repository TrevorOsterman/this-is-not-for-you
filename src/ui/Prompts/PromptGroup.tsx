import React from "react";

const LineGroup: React.FC<{
  lines: string[];
  prevCmd: string;
  lineWidth?: number;
}> = ({ lines, prevCmd, lineWidth = 70 }) => {
  const padLine = (text: string) => text.padEnd(lineWidth, " ");

  return (
    <div className="prompts-group">
      <div className="prompts-group__group">
        {lines?.map((line, i) => (
          <p className="prompts-group__text" key={i}>
            {padLine(line)}
          </p>
        ))}
      </div>
      {prevCmd && <div className="previous-command">{`>> ${prevCmd}`}</div>}
    </div>
  );
};

export default LineGroup;
