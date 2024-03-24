import React from "react";
import "styles/App.module.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "components/Header";
import Nav from "components/Nav";
import Board from "components/Board";
import Applications from "components/Applications";
import Recruitments from "components/Recruitments";
import Recruit from "components/Recruit";
import RecruitDetail from "components/RecruitDetail";
import Request from "components/join_request";
import Check from "components/join_check";
import Login from "components/login";
import SignUp from "components/SignUp";
import Mail from "components/mail";

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
          <Route path="/request" element={<Request />} />
          <Route path="/check" element={<Check />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign" element={<SignUp />} />
          <Route path="/mail" element={<Mail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
