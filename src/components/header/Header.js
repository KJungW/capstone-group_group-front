import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginModalPage from "page/LoginModalPage";
import styles from "styles/Header.module.css";
import SignUpModalPage from "page/SignUpModalPage";
import requestFindMemberByToken from "hook/requestFindMemberByToken";

// 로그인 상태를 나타내는 객체(enum 대용으로 사용)
const LoginStateEnum = {
  NOT_CHECKED: "NOT_CHECKED",
  NOT_LOGIN: "NOT_LOGIN",
  OK_LOGIN: "OK_LOGIN"
}

// 헤더 컴포넌트
const Header = () => {
  // 로그인 여부
  const [loginState, setLoginState] = useState(LoginStateEnum.NOT_CHECKED);

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
  const navigate = useNavigate();
  const handleHomeClick = () => {navigate("/");};

  // 토큰 유효성 검증 메서드
  const validateToken = (jwtToken) => {
    console.log("Header에서 토큰유효성 검증 => 요청 시작")
    requestFindMemberByToken(jwtToken)
    .then(res => {
      localStorage.setItem("memberId", res.data.id);
      localStorage.setItem("email", res.data.email);
      localStorage.setItem("campusId", res.data.campusId);
      localStorage.setItem("nickName", res.data.nickName);
      localStorage.setItem("jwtToken", res.data.jwtToken);
      console.log("Header에서 토큰유효성 검증 => 검증 통과")
      setLoginState(LoginStateEnum.OK_LOGIN);
    })
    .catch(err => {
      localStorage.clear();
      console.log("Header에서 토큰유효성 검증 => 검증 실패")
      console.log(err);
      setLoginState(LoginStateEnum.NOT_LOGIN);
    })
  }

  // 토큰 유효성 검증여부 확인후, 필요하면 검증 수행
  useEffect(() => {
    let token = localStorage.getItem("jwtToken");
    if(token === null) {
      setLoginState(LoginStateEnum.NOT_LOGIN);
    } 
    else {
      validateToken(token);
    }
  }, []);

    // 로그아웃 클릭 메서드
  const handleLogoutButtonClick = () => {
    localStorage.clear();
    setLoginState(LoginStateEnum.NOT_LOGIN);
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
            loginState === LoginStateEnum.NOT_LOGIN &&
            <button className={styles.loginbutton} onClick={()=>handleLoginModalOpen(true)}>로그인</button>
          }
          {
            loginState === LoginStateEnum.NOT_LOGIN &&
            <button className={styles.signinbutton} onClick={()=>handleSignModalOpen(true)}>회원가입</button>
          }
          {
            loginState === LoginStateEnum.OK_LOGIN &&
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
