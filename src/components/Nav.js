import React from 'react';
import styles from "styles/Nav.module.css";
import { useNavigate } from 'react-router-dom';

const Nav = () => {
  const navigate = useNavigate();

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

  return (
    <div className={styles.scrollcontainer}>
      <div className={styles.boardmap}>
        <div className={styles.menubar}>
          <button onClick={() => handleMenuClick('board')} className={styles.button}>
            게시판
          </button>
          <button onClick={() => handleMenuClick('recruitments')} className={styles.button}>
            작성글 목록
          </button>
          <button onClick={() => handleMenuClick('applications')} className={styles.button}>
            신청 목록
          </button>
        </div>
      </div>
    </div>
  );
};

export default Nav;
