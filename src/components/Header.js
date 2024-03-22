import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "styles/Header.module.css";

const Header = () => {
  const navigate = useNavigate();

  const handleLoginButtonClick = () => {
    navigate('/login');
  };
  
  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <div className={styles.headercontainer}>
      <div className={styles.headercontents}>
        <div className={styles.headerimage}>
          <img src='/assets/groupgroup_logo.png' alt="groupgroup" className={styles.logo} onClick={handleHomeClick} />
        </div>
        <div className={styles.user}>
          <button className={styles.loginbutton} onClick={handleLoginButtonClick}>로그인</button>
          <button className={styles.signinbutton} onClick={handleLoginButtonClick}>회원가입</button>
        </div>
      </div>
    </div>
  )
}

export default Header;
