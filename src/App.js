import React from 'react';
import styles from "styles/index.module.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from 'components/Login';
import Header from 'components/Header';
import Board from 'components/Board';
import Recruit from 'components/Recruit';
import RecruitDetail from 'components/RecruitDetail';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Board />} />
          <Route path="/header" element={<Header />} />
          <Route path="/login" element={<Login />} />
          <Route path="/recruit" element={<Recruit />} />
          <Route path="/recruitdetail" element={<RecruitDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
