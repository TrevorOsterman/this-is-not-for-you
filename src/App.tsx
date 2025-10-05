import React from "react";

import Terminal from "./ui/Terminal/Terminal";
import Banner from "./ui/Banner/Banner";
import Divider from "./ui/Divider";

import "./App.css";

function App() {
  return (
    <div className="App w-screen h-screen bg-black text-green-400 font-mono text-lg p-4 outline-none">
      <Banner />
      <div className="app-terminal">
        <Divider />
        <Terminal />
        <Divider text=" [--help: list commands] " />
      </div>
      <Banner mirror />
    </div>
  );
}

export default App;
