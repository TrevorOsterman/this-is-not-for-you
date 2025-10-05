import React from "react";

const LineGroup: React.FC<{ lines: string[]; prevCmd: string }> = ({
  lines,
  prevCmd,
}) => {
  return (
    <>
      {prevCmd && <div className="previous-command">{`>> ${prevCmd}`}</div>}
      <div className="line-group">
        {lines?.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>
    </>
  );
};

export default LineGroup;
