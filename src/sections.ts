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
  intro: {
    text: [],
    choices: {
      start: () => updateSection("start"),
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
