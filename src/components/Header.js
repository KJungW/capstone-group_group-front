import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "styles/Header.module.css";
import LoginModal from "./LoginModal"; // 로그인 모달 컴포넌트 임포트
import SignUpModal from "./SignUpModal";
import MessageModal from "./MessageModal";

const Header = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);

  const handleLoginButtonClick = () => {
    setIsLoginModalOpen(true); // 로그인 버튼 클릭 시 모달을 열도록 상태 변경
  };

  const handleSignButtonClick = () => {
    setIsSignUpModalOpen(true);
  };

  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false); //  로그인 모달 닫기 버튼 클릭 시 모달을 닫도록 상태 변경
  };

  const handleCloseSignUpModal = () => {
    setIsSignUpModalOpen(false); // 회원가입 모달 닫기 버튼 클릭 시 모달을 닫도록 상태 변경
  };

  const handleSubmitSignUpModel = () => {
    setIsMessageModalOpen(true);
    setIsSignUpModalOpen(false);
  };

  const handleCloseMsgModal = () => {
    setIsMessageModalOpen(false);
  };

  const navigate = useNavigate();

  // const handleHomeClick = () => {
  //   navigate("/");
  // };

  return (
    <div className={styles.headercontainer}>
      <div className={styles.headercontents}>
        <div className={styles.headerimage}>
          <img
            src="/assets/groupgroup_logo.png"
            alt="groupgroup"
            className={styles.logo}
            // onClick={handleHomeClick}
          />
        </div>
        <div className={styles.user}>
          <button
            className={styles.loginbutton}
            onClick={handleLoginButtonClick}
          >
            로그인
          </button>
          <button
            className={styles.signinbutton}
            onClick={handleSignButtonClick}
          >
            회원가입
          </button>
        </div>
      </div>
      <LoginModal isOpen={isLoginModalOpen} onClose={handleCloseLoginModal} />
      <SignUpModal
        isOpen={isSignUpModalOpen}
        onClose={handleCloseSignUpModal}
        onSubmit={handleSubmitSignUpModel}
      />
      <MessageModal isOpen={isMessageModalOpen} onClose={handleCloseMsgModal} />
    </div>
  );
};

export default Header;
