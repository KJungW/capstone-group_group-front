import React from 'react';
import 'styles/App.module.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from 'components/Header';
import Nav from 'components/Nav';
import Board from 'components/Board';
import Applications from 'components/Applications';
import Recruitments from 'components/Recruitments';
import Recruit from 'components/Recruit';
import RecruitDetail from 'components/RecruitDetail';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Nav />
        <Routes>
          <Route path="/" element={<Board />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/recruitments" element={<Recruitments />} />
          <Route path="/recruit" element={<Recruit />} />
          <Route path="/recruitdetail" element={<RecruitDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
