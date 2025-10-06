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
  const [cmdHistory, setCmdHistory] = useState<Command[]>([]);
  const [helpShown, setHelpShown] = useState(true);

  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [cursorPosition, setCursorPosition] = useState(0);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleBlur = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      if (context) {
        const style = window.getComputedStyle(inputRef.current);
        context.font = `${style.fontSize} ${style.fontFamily}`;
        const metrics = context.measureText(buffer);
        setCursorPosition(metrics.width);
      }
    }
  }, [buffer]);

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

    const executedCommands = cmdHistory
      .filter((h) => h.section === state)
      .map((h) => h.cmd);

    const availableChoiceKeys = Object.keys(currentSection.choices).filter(
      (choiceKey) => {
        // Filter out already executed commands
        if (executedCommands.includes(choiceKey)) return false;

        const action = currentSection.choices[choiceKey]();
        const requiredCommands = action.options?.requiredCommands || [];
        return requiredCommands.every((req) => executedCommands.includes(req));
      },
    );

    const availableChoices = `commands: [ ${availableChoiceKeys.join(" / ")} ]`;

    if (cmd === "--help") {
      setLineGroups([...promptGroups, [availableChoices]]);
      setCmdHistory([...cmdHistory, { section: state, cmd }]);
      return;
    }

    if (cmd === "--auto-help") {
      setHelpShown(!helpShown);

      setLineGroups([
        ...promptGroups,
        [`Auto-help ${helpShown ? "disabled" : "enabled"}.`],
      ]);

      setCmdHistory([...cmdHistory, { section: state, cmd }]);
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
      setCmdHistory([...cmdHistory, { section: state, cmd }]);
      return;
    }

    const result = choiceAction();

    if (result.type === "updateText") {
      // Stay in current section, just show new text
      setLineGroups([...promptGroups, result.lines]);
      setCmdHistory([...cmdHistory, { section: state, cmd }]);
    } else if (result.type === "updateSection") {
      // Navigate to new section
      const nextSection = sections[result.section];
      if (nextSection) {
        setLineGroups([...promptGroups, nextSection.text]);
        setCmdHistory([...cmdHistory, { section: state, cmd }]);

        setState(result.section);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(buffer.trim().toLowerCase());
      setBuffer("");
    }
  };

  return (
    <div
      ref={terminalRef}
      className="terminal-container"
    >
      <Title />
      <Prompts>
        {promptGroups &&
          promptGroups.map((promptGroup, idx) => (
            <PromptGroup lines={promptGroup} prevCmd={cmdHistory[idx]?.cmd} />
          ))}
      </Prompts>

      <div className="terminal-container__input-area">
        {helpShown && (
          <div className="help-text">
            <p>{`commands: [ ${Object.keys(sections[state].choices)
              .filter((choiceKey) => {
                const executedCommands = cmdHistory
                  .filter((h) => h.section === state)
                  .map((h) => h.cmd);

                // Filter out already executed commands
                if (executedCommands.includes(choiceKey)) return false;

                const action = sections[state].choices[choiceKey]();
                const requiredCommands = action.options?.requiredCommands || [];
                return requiredCommands.every((req) =>
                  executedCommands.includes(req)
                );
              })
              .join(' / ')} ]`}</p>
          </div>
        )}
        <div className="input-line">
          <span className="input-line__prompt">&gt;&nbsp;</span>
          <input
            ref={inputRef}
            type="text"
            value={buffer}
            onChange={(e) => setBuffer(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            className="input-line__input"
            autoComplete="off"
            spellCheck={false}
            size={buffer.length || 1}
          />
          <span
            className="input-line__cursor"
            style={{ left: `calc(2ch + ${cursorPosition}px)` }}
          >_</span>
        </div>
      </div>
    </div>
  );
};

export default Terminal;
