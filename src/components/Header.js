import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'styles/Header.css';

const Header = () => {
  const navigate = useNavigate();

  const handleLoginButtonClick = () => {
    navigate('/login');
  };
  
  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <div id="header-container">
      <div className="header-contents">
        <div className="header-image">
          <img src='/assets/groupgroup_logo.png' alt="groupgroup" className="logo" onClick={handleHomeClick} />
        </div>
        <div className="user">
          <button className="login-button" onClick={handleLoginButtonClick}>로그인</button>
          <button className="signin-button" onClick={handleLoginButtonClick}>회원가입</button>
        </div>
      </div>
    </div>
  )
}

export default Header;
