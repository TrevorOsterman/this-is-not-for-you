interface ActionOptions {
  requiredCommands?: string[];
}

export type ActionResult =
  | { type: "updateText"; lines: string[]; options?: ActionOptions }
  | { type: "updateSection"; section: string; options?: ActionOptions };

interface Section {
  text: string[];
  choices: Record<string, () => ActionResult>;
}

const updateText = (lines: string[], options?: ActionOptions): ActionResult => {
  return { type: "updateText", lines, options };
};

const updateSection = (
  section: string,
  options?: ActionOptions,
): ActionResult => {
  return { type: "updateSection", section, options };
};

const sections: Record<string, Section> = {
  title: {
    text: ["Type 'start' to begin."],
    choices: {
      start: () => updateSection("intro"),
    },
  },
  intro: {
    text: [
      "This game is a pet project loosely based on the book 'House of Leaves' by Mark Z. Danielewski, presented in the style of a classic MS-DOS(-ish) style Choose-Your-Own-Adventure.",
      "Each section will have commands that you can type to progress the story. If you get stuck, type '--help' to see a list of available commands, or type '--auto-help' to always see the list of commands after each input.",
      "Type 'continue' to start.",
    ],
    choices: {
      continue: () => updateSection("start"),
    },
  },
  start: {
    text: [
      "You stand in a house.",
      "The floorboards creak beneath your feet. It smells of dust and age. The lingering scent of the previous tenants still hangs in the air.",
      "Your brother Sam and wife Monica are poking around the room.",
    ],
    choices: {
      "look around": () =>
        updateText([
          "You're in the living room. The walls are painted a shade of white that was likely more eggshell initially, but has yellowed with age.",
          "A tattered couch sits in the middle of the room, its pale blue fabric worn and faded. The stitching on the daisy pattern is in various stages of disrepair. A small coffee table, scarred with scratches and stains, holds a few old magazines and a half-empty cup of cold coffee.",
          "On the north side of the room, alone against the wall, is a deep brown doorway, its varnish chipped and peeling. Behind it lies a sense of dread you've never felt from any other inanimate object before.",
          "On the east wall are two large, square windows. They are ajar, with their glass grimy and streaked with the residue of duct tape. Scraps of newspaper are scattered along the floor beneath them from the meticulous task of peeling them off.",
        ]),
      talk: () =>
        updateText([
          "'I still don't get it,' Sam says, running a hand through his hair. 'All of this, like, defies all logic, right? Everything we rely on to navigate the world. It just... breaks down.'",
          "Sam is knocking on the walls, testing for hollow spots. The walls, however, are made of solid brick, and his knuckles bounce off with a dull thud.",
          "'But it's not just that,' Monica adds, her brow furrowed in thought. 'It's-- I don't know. It's like the house... is alive?' she says with the upper inflection of the rhetorical question in her voice, 'swelling and contracting or something.'",
          "'Yeah. Honestly, I can't tell if I'm excited to have found this house on the market or terrified,' you chime in, half-smiling. Your gut, however, is telling you it's the latter.",
        ]),
      camera: () =>
        updateText([
          "Near the edge of the table is your Sony Handycam with its lens cap off already off. You pick it up and turn it on. The screen flickers to life, displaying a grainy view of the room through its lens.",
        ]),
      window: () => updateSection("outside", { requiredCommands: ["camera"] }),
    },
  },
  outside: {
    text: [
      "You approach the window to your right and duck through, careful to clear the empty planter on the other side. Despite your care, you bump your head on the top of the frame. You hear snickering coming from back inside. The camera is already recording, so the moment is captured for posterity.",
      "To your left, rising above a dead spot in the grass, is the corner of the house.",
    ],
    choices: {
      look: () =>
        updateText([
          "On the street, beyond a large oak tree is Sam's old beater. It's a blue 1998 Ford Taurus with a few dents and scratches, but it still runs. Directly in front of it is your Volkswagen, which rests almost in triumph in contrast.",
        ]),
      back: () => updateText(["You have more to do."]),
      corner: () =>
        updateText([
          "Leading with your camera, you approach the corner of the house.",
          "You peer around it and, where any other person -- any normal person -- would expect to see an oddly-placed stretch of hallway, you already know better what you'll find.",
          "A large swath of lawn stretches out to the west and north until they reach the neighboring houses. There is no hallway. No matter how many times you've seen it, part of you still expects to see one. You want to see one, to make sense of this fever dream you've found yourself in. But it doesn't exist.",
          "At least it's on camera now.",
        ]),
      "climb back": () => updateSection("house"),
    },
  },
  house: {
    text: [
      "You climb back through the window into the house. Sam and Monica are waiting for you.",
    ],
    choices: {
      talk: () =>
        updateText([
          "'Same thing, huh?' Monica asks almost with impatience. She already knows the answer.",
        ]),
      look: () =>
        updateText([
          "The living room is exactly as you left it. As always, your attention is drawn back to the door.",
        ]),
      "approach door": () => updateSection("hallway"),
    },
  },
  hallway: {
    text: ["The door stands before you, eager to be opened."],
    choices: {
      open: () =>
        updateText([
          "You turn the knob and pull the door open. It creaks loudly, already echoing into the darkness behind it. The camera in your hand documents every moment with sterile detachment.",
        ]),
      look: () =>
        updateText([
          "Beyond the threshold is almost a complete void.",
          "The light from the living room struggles to make it 20 yards before it quickly dissipates. That's twice as far as you've dared to go.",
        ]),
      "call out": () =>
        updateText([
          "You go to call out, but the sound is choked in your throat. You're not sure you want to hear the answer; confirmation of the depth of the impossibility that lies before you.",
        ]),
      retreat: () => updateText(["You're frozen in place."]),
      "turn around": () => updateSection("living-room"),
    },
  },
  "living-room": {
    text: [
      "You step back into the living room, closing the door behind you. Sam and Monica look at you expectantly.",
    ],
    choices: {
      talk: () =>
        updateText([
          "'Alright, did you get it?' Monica asks, obviously eager to leave.",
          "'Yeah, I got it,' you reply, your voice a little shaky from the adrenaline that always accompanies this.",
          "'Cool, let's get going then,' Sam says, already heading for the front door. It's clear he hasn't gotten used to this yet either.",
        ]),
      leave: () =>
        updateText([
          "You take one last look around the living room before following Sam and Monica out the front door. It's all on camera now, at least. For better or worse.",
        ]),
    },
  },
};

export default sections;
