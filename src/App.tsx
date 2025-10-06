import React from "react";

import Terminal from "./ui/Terminal/Terminal";
import Banner from "./ui/Banner/Banner";
import Divider from "./ui/Divider";

import "./App.css";

function App() {
  return (
    <div className="App w-screen h-screen bg-black text-green-400 font-mono text-lg p-4 outline-none">
      <div className="banner-top">
        <Banner />
      </div>
      <div className="hol-body">
        <div className="center">
          <Divider />
          <Terminal />
          <Divider />
        </div>
      </div>
      <div className="banner-bottom">
        <Banner mirror />
      </div>
    </div>
  );
}

export default App;
