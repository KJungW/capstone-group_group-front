import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginModalPage from "components/login/LoginModalPage";
import styles from "styles/Header.module.css";
import SignUpModalPage from "components/signup/SignUpModalPage";
import { useSelector } from "react-redux";

// 헤더 컴포넌트
const Header = () => {
  const navigate = useNavigate();

  // 로그인 데이터
  const loginData = useSelector(state => state.loginData);
  
  // 로그인모달창 
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const handleLoginModalOpen = (isOpen) => {
    setIsLoginModalOpen(isOpen);
  }

  // 회원가입 모달창 관련
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const handleSignModalOpen = (isOpen) => {
    setIsSignUpModalOpen(isOpen);
  }

  // 홈버튼 클릭 처리
  const handleHomeClick = () => {navigate("/");};

  // 로그아웃 클릭 메서드
  const handleLogoutButtonClick = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  }

  return (
    <div className={styles.headercontainer}>
      <div className={styles.headercontents}>
        <div className={styles.headerimage}>
          <img
            src="/assets/groupgroup_logo.png"
            alt="groupgroup"
            className={styles.logo}
            onClick={handleHomeClick}
          />
        </div>
        <div className={styles.user}>
          {
            loginData===undefined &&
            <button className={styles.loginbutton} onClick={()=>handleLoginModalOpen(true)}>로그인</button>
          }
          {
            loginData===undefined &&
            <button className={styles.signinbutton} onClick={()=>handleSignModalOpen(true)}>회원가입</button>
          }
          {
            loginData!==undefined && 
            <button className={styles.loginbutton} onClick={handleLogoutButtonClick}>로그아웃</button> 
          }
        </div>
        <LoginModalPage isOpen={isLoginModalOpen} handleLoginModalOpen={handleLoginModalOpen}/>
        <SignUpModalPage isOpen={isSignUpModalOpen} handleSignModalOpen={handleSignModalOpen}/> 
      </div>
    </div>
  );
};

export default Header;
