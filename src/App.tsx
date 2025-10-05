import React from "react";

import Terminal from "./ui/Terminal/Terminal";
import Banner from "./ui/Banner/Banner";
import Divider from "./ui/Divider";

import "./App.css";
import Heading from "./ui/Heading/Heading";

function App() {
  return (
    <div className="App w-screen h-screen bg-black text-green-400 font-mono text-lg p-4 outline-none">
      <Heading />
      <div className="hol-body">
        <Banner />
        <div className="center">
          <Divider />
          <Terminal />
          <Divider text=" [ commands: --help: list commands, --auto-help: always list commands ] " />
        </div>
        <Banner mirror />
      </div>
    </div>
  );
}

export default App;
