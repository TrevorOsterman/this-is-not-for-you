import React, { useState, useEffect, useRef } from "react";

import sections, { ActionResult } from "../../sections";
import Title from "../Title/Title";
import Prompts from "../Prompts/Prompts";
import LineGroup from "../LineGroup/LineGroup";

import "./Wrapper.styles.css";

const Wrapper: React.FC = () => {
  const [lines, setLines] = useState<string[][]>([]);

  const [buffer, setBuffer] = useState("");
  const [state, setState] = useState("intro");
  const [prevCmd, setPrevCmd] = useState("");

  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalRef.current?.focus();
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  const handleCommand = (cmd: string) => {
    const currentSection = sections[state];
    if (!currentSection) return;

    const choiceAction = currentSection.choices[cmd];
    if (!choiceAction) return;

    const result = choiceAction();

    if (result.type === "updateText") {
      // Stay in current section, just show new text
      setLines([...lines, [`--- ${cmd} ---`, ...result.lines]]);
    } else if (result.type === "updateSection") {
      // Navigate to new section
      const nextSection = sections[result.section];
      if (nextSection) {
        setLines([...lines, [`--- ${cmd} ---`, ...nextSection.text]]);
        setState(result.section);
      }
    }

    setPrevCmd(cmd);
  };

  const handleKeyDown = (e: any) => {
    if (e.key.length === 1) {
      setBuffer((prev) => prev + e.key);
    } else if (e.key === "Backspace") {
      setBuffer((prev) => prev.slice(0, -1));
    } else if (e.key === "Enter") {
      handleCommand(buffer.trim().toLowerCase());
      setBuffer("");
    }
  };

  return (
    <div
      tabIndex={0}
      ref={terminalRef}
      onKeyDown={handleKeyDown}
      className="wrapper-container"
    >
      <Title />
      <div className="info-text">
        <p>MS-DOS Adventure v1.0</p>
        <p>Type 'start' to begin.</p>
      </div>
      <Prompts>
        {lines &&
          lines.map((lineGroup) => (
            <LineGroup lines={lineGroup} prevCmd={prevCmd} />
          ))}
      </Prompts>
      <div className="input-line">
        {`> ${buffer}`}
        <span className="animate-pulse">█</span>
      </div>
    </div>
  );
};

export default Wrapper;
