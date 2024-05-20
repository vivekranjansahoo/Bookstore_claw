import { useState } from "react";

import "./App.css";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Home/Homepage";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Homepage />} />
      </Routes>
    </>
  );
}

export default App;
