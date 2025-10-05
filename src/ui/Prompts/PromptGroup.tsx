import React from "react";

const LineGroup: React.FC<{ lines: string[]; prevCmd: string }> = ({
  lines,
  prevCmd,
}) => {
  return (
    <>
      <div className="line-group">
        {lines?.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>
      {prevCmd && <div className="previous-command">{`>> ${prevCmd}`}</div>}
    </>
  );
};

export default LineGroup;
