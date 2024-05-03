import React from "react";
import "styles/App.module.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "components/header/Header";
import Nav from "components/header/Nav";
import Board from "components/board/Board";
import Applications from "components/application/Applications";
import Recruitments from "components/recruit/Recruitments";
import Recruit from "components/recruit/Recruit";
import RecruitDetail from "components/recruit/RecruitDetail";
import ApplicationForm from "components/application/ApplicationForm";
import ApplicationReview from "components/application/ApplicationReview";
import { legacy_createStore as createStore } from "redux";
import { Provider } from "react-redux";
import mainReducerInStore from "store/aboutStore";
import InitEarlyData from "components/header/InitEarlyData";
import LoginModalPage from "components/login/LoginModalPage";
import SignUpModalPage from "components/signup/SignUpModalPage";

// 전역상태 저장소 생성
const store = createStore(mainReducerInStore);

function App() {
  return (
    <Router>
      <Provider store={store}>
        <InitEarlyData/>
        <Header />
        <Nav />
        <Routes>
          <Route path="/" element={<Board />} />
          <Route path="/:boardId" element={<Board />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/recruitments" element={<Recruitments />} />
          <Route path="/recruit/:boardId" element={<Recruit />} />
          <Route path="/recruitdetail/:postId" element={<RecruitDetail />} />
          <Route path="/apply/:postId" element={<ApplicationForm />} />
          <Route path="/review/:applicationId" element={<ApplicationReview />} />
        </Routes>
        <LoginModalPage/>
        <SignUpModalPage/> 
      </Provider>
    </Router>
  );
}

export default App;
