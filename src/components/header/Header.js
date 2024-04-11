import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginModalPage from "page/LoginModalPage";
import styles from "styles/Header.module.css";
import SignUpModalPage from "page/SignUpModalPage";

const Header = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

  // 홈버튼 클릭 처리
  const navigate = useNavigate();
  const handleHomeClick = () => {navigate("/");};

  // 로그인 버튼 처리
  const handleLoginButtonClick = () => {
    setIsLoginModalOpen(true);
  };
  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  // 회원가입 버튼 처리
  const handleSignButtonClick = () => {
    setIsSignUpModalOpen(true);
  };
  const handleCloseSignUpModal = () => {
    setIsSignUpModalOpen(false); 
  };

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
          <button className={styles.loginbutton} onClick={handleLoginButtonClick}>로그인</button>
          <button className={styles.signinbutton}  onClick={handleSignButtonClick}>회원가입</button>
        </div>
        {isLoginModalOpen && <LoginModalPage handleClose={handleCloseLoginModal}/>}
        {isSignUpModalOpen && <SignUpModalPage handleClose={handleCloseSignUpModal}/>}
      </div>
    </div>
  );
};

export default Header;
