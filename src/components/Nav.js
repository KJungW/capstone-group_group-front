import React from 'react';
import styles from "styles/Nav.module.css";
import { useNavigate, useLocation } from 'react-router-dom';

const Nav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleMenuClick = (menu) => {
    switch (menu) {
      case 'board':
        navigate('/');
        break;
      case 'recruitments':
        navigate('/recruitments');
        break;
      case 'applications':
        navigate('/applications');
        break;
      default:
        break;
    }
  };

  // 메뉴의 경로와 현재 경로가 일치하는지 확인하는 함수
  const isActive = (path) => location.pathname === path;

  return (
    <div className={styles.scrollcontainer}>
      <div className={styles.boardmap}>
        <div className={styles.menubar}>
          <button onClick={() => handleMenuClick('board')}
                  className={`styles.button ${isActive('/') ? styles.active : ''}`}>
            게시판
          </button>
          <button onClick={() => handleMenuClick('recruitments')}
                  className={`styles.button ${isActive('/recruitments') ? styles.active : ''}`}>
            작성글 목록
          </button>
          <button onClick={() => handleMenuClick('applications')}
                  className={`styles.button ${isActive('/applications') ? styles.active : ''}`}>
            신청 목록
          </button>
        </div>
      </div>
    </div>
  );
};

export default Nav;
