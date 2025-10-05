import React, { useState, useEffect, useRef } from "react";

import sections from "../../content/sections";
import Title from "../Title/Title";
import Prompts from "../Prompts/Prompts";
import PromptGroup from "../Prompts/PromptGroup";

import "./Terminal.styles.css";

type Command = Record<"section" | "cmd", string>;

const Terminal: React.FC = () => {
  const [promptGroups, setLineGroups] = useState<string[][]>([]);
  const [buffer, setBuffer] = useState("");
  const [state, setState] = useState("title");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [helpShown, setHelpShown] = useState(true);

  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef && !terminalRef.current) {
      terminalRef.current!.focus();
    }
  }, [terminalRef]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [promptGroups]);

  useEffect(() => {
    if (sections[state]) {
      setLineGroups([sections[state].text]);
    }
    return () => {};
  }, []);

  const handleCommand = (cmd: string) => {
    const currentSection = sections[state];
    if (!currentSection) return;

    const availableChoices = `commands: [ ${Object.keys(
      currentSection.choices,
    ).join(" / ")} ]`;

    if (cmd === "--help") {
      setLineGroups([...promptGroups, [availableChoices]]);
      setCmdHistory([...cmdHistory, cmd]);
      return;
    }

    if (cmd === "--auto-help") {
      setHelpShown(!helpShown);

      setLineGroups([
        ...promptGroups,
        [`Auto-help ${helpShown ? "disabled" : "enabled"}.`],
      ]);

      setCmdHistory([...cmdHistory, cmd]);
      return;
    }

    const choiceAction = currentSection.choices[cmd];

    if (!choiceAction) {
      setLineGroups([
        ...promptGroups,
        [
          `'${cmd}' is not recognized as a valid command.`,
          "Type '--help' for a list of commands.",
        ],
      ]);
      setCmdHistory([...cmdHistory, cmd]);
      return;
    }

    const result = choiceAction();

    if (result.type === "updateText") {
      // Stay in current section, just show new text
      setLineGroups([...promptGroups, result.lines]);
    } else if (result.type === "updateSection") {
      // Navigate to new section
      const nextSection = sections[result.section];
      if (nextSection) {
        setLineGroups([...promptGroups, nextSection.text]);
        setState(result.section);
      }
    }

    setCmdHistory([...cmdHistory, cmd]);
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
      className="terminal-container"
    >
      <Title />
      <Prompts>
        {promptGroups &&
          promptGroups.map((promptGroup, idx) => (
            <PromptGroup lines={promptGroup} prevCmd={cmdHistory[idx]} />
          ))}
      </Prompts>
      {helpShown && (
        <div className="help-text">
          <p>{`commands: [ ${Object.keys(sections[state].choices).join(
            " / ",
          )} ]`}</p>
        </div>
      )}
      <div className="input-line">
        {`> ${buffer}`}
        <span className="animate-pulse">_</span>
      </div>
    </div>
  );
};

export default Terminal;
