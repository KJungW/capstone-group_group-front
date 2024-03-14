import React from 'react';
import 'styles/index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from 'components/Login';
import Header from 'components/Header';
import Board from 'components/Board';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Board />} />
          <Route path="/header" element={<Header />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
