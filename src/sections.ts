export interface GameContext {
  hasLooked?: boolean;
  visitedRooms?: string[];
  [key: string]: any;
}

interface Choice {
  text: string;
  next: string;
}

interface Section {
  text: string[] | ((context: GameContext) => string[]);
  choices: Choice[];
  isEnding?: boolean;
}

const sections: Record<string, Section> = {
  intro: {
    text: [],
    choices: [{ text: "start", next: "start" }]
  },
  start: {
    text: (ctx) => ctx.hasLooked
      ? ["You're in a dark room. You sense a door to the north."]
      : ["You wake up in a dark room."],
    choices: [
      { text: "look", next: "start" },
      { text: "wait", next: "wait" },
      { text: "shout", next: "shout" }
    ]
  },
  wait: {
    text: ["Time passes. You hear breathing behind you..."],
    choices: [],
    isEnding: true
  },
  shout: {
    text: ["Your voice echoes. Something stirs..."],
    choices: [],
    isEnding: true
  }
};

export default sections;
