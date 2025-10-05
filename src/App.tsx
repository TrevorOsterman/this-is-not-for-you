import React from "react";
import Wrapper from "./ui/Terminal/Terminal";

import "./App.css";
import Banner from "./ui/Banner/Banner";

function App() {
  return (
    <div className="App w-screen h-screen bg-black text-green-400 font-mono text-lg p-4 outline-none">
      <Banner />
      <Wrapper />
      <Banner mirror />
    </div>
  );
}

export default App;
