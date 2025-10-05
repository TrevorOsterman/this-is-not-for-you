import React, { useState, useEffect, useRef } from "react";

import sections, { GameContext } from "../../sections";
import Title from "../Title/Title";
import Prompts from "../Prompts/Prompts";
import LineGroup from "../LineGroup/LineGroup";

import "./Wrapper.styles.css";

const Wrapper: React.FC = () => {
  const [lines, setLines] = useState<string[]>([]);

  const [buffer, setBuffer] = useState("");
  const [state, setState] = useState("intro");
  const [prevCmd, setPrevCmd] = useState("");
  const [context, setContext] = useState<GameContext>({});

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

    const choice = currentSection.choices.find((c) => c.text === cmd);
    if (!choice) return;

    const nextSection = sections[choice.next];
    if (!nextSection) return;

    // Update context based on command
    const newContext = { ...context };
    if (cmd === "look") {
      newContext.hasLooked = true;
    }

    // Get text (handle both static and dynamic)
    const text =
      typeof nextSection.text === "function"
        ? nextSection.text(newContext)
        : nextSection.text;

    // Add command input line, then response
    setLines((prev) => [...prev, ...text]);
    setState(choice.next);
    setContext(newContext);
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
        <LineGroup lines={lines} prevCmd={prevCmd} />
      </Prompts>
      <div className="input-line">
        {`> ${buffer}`}
        <span className="animate-pulse">█</span>
      </div>
    </div>
  );
};

export default Wrapper;
