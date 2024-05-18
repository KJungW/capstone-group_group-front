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
import RecruitUpdate from "components/recruit/RecruitUpdate";
import MainPage from "components/main/MainPage";

// 전역상태 저장소 생성
const store = createStore(mainReducerInStore);

function App() {
  return (
    <Router>
      <Provider store={store}>
        <InitEarlyData/>
        <Routes>
          <Route path="/" element={<><MainPage /></>} />
          <Route path="/board" element={<><Header /><Nav /><Board /></>} />
          <Route path="/applications" element={<><Header /><Nav /><Applications /></>} />
          <Route path="/recruitments" element={<><Header /><Nav /><Recruitments /></>} />
          <Route path="/recruit/:boardId" element={<><Header /><Nav /><Recruit /></>} />
          <Route path="/recruitdetail/:postId" element={<><Header /><Nav /><RecruitDetail /></>} />
          <Route path="/recruitUpdate/:postId" element={<><Header /><Nav /><RecruitUpdate /></>} />
          <Route path="/apply/:postId" element={<><Header /><Nav /><ApplicationForm /></>} />
          <Route path="/review/:applicationId" element={<><Header /><Nav /><ApplicationReview /></>} />
        </Routes>
        <LoginModalPage/>
        <SignUpModalPage/> 
      </Provider>
    </Router>
  );
}

export default App;
