import React from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Movies from "./Movies";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/movies" />} />
        <Route path="/movies" element={<Movies />} />
      </Routes>
    </Router>
  );
}

export default App;
