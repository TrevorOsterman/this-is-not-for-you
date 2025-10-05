export type ActionResult =
  | { type: "updateText"; lines: string[] }
  | { type: "updateSection"; section: string };

interface Section {
  text: string[];
  choices: Record<string, () => ActionResult>;
}

const updateText = (lines: string[]): ActionResult => {
  return { type: "updateText", lines };
};

const updateSection = (section: string): ActionResult => {
  return { type: "updateSection", section };
};

const sections: Record<string, Section> = {
  title: {
    text: ["MS-DOS Adventure v1.0", "Type 'start' to begin."],
    choices: {
      start: () => updateSection("intro"),
      quit: () => updateText(["Game over. Refresh to restart."]),
    },
  },
  intro: {
    text: [
      "This game is a pet-project loosely based on the book 'House of Leaves' by Mark Z. Danielewski, presented in the style of a classic MS-DOS style Choose-Your-Own-Adventure.",
      "Each section will have commands that you can type to progress the story. If you get stuck, type '--help' to see a list of available commands.",
      "Type 'begin' to start.",
    ],
    choices: {
      begin: () => updateSection("start"),
      quit: () => updateText(["Game over. Refresh to restart."]),
    },
  },
  start: {
    text: ["You wake up in a dark room."],
    choices: {
      look: () =>
        updateText(["It's pitch black. You feel a door to the north."]),
      wait: () => updateText(["Time passes. You hear breathing behind you..."]),
      shout: () => updateText(["Your voice echoes. Something stirs..."]),
      ["walk forward"]: () => updateSection("door"),
      quit: () => updateText(["Game over. Refresh to restart."]),
    },
  },
  door: {
    text: ["An old wooden door stands before you."],
    choices: {
      open: () => updateSection("hallway"),
      knock: () => updateText(["The door doesn't respond."]),
      back: () => updateSection("start"),
    },
  },
};

export default sections;
