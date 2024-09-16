import React from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Movies from "./Movies";
import Actors from "./Actors";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/movies" />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/actors" element={<Actors />} />
      </Routes>
    </Router>
  );
}

export default App;
