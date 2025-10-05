import React from "react";

const PromptGroup: React.FC<{
  lines: string[];
  prevCmd: string;
}> = ({ lines, prevCmd }) => {
  return (
    <div className="prompts-group">
      <div className="prompts-group__group">
        {lines?.map((line, i) => (
          <p className="prompts-group__text" key={i}>
            {line}
          </p>
        ))}
      </div>
      {prevCmd && (
        <div className="prompts-group__previous-command">{`>> ${prevCmd}`}</div>
      )}
    </div>
  );
};

export default PromptGroup;
