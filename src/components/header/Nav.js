import React, { useState } from 'react';
import styles from "styles/Nav.module.css";
import { useNavigate } from 'react-router-dom';
import SubMenu from 'components/header/SubMenu';
import { useSelector } from "react-redux";
import LoginModalPage from 'page/LoginModalPage';

// Navigator 요소중 어떤 것이 선택되었는지 나타내는 상태타입(enum 대용으로 사용)
const navStateEnum = {
  NONE : "NONE",
  BOARD: "BOARD",
  RECURITMENTS: "RECURITMENTS",
  APPLICATIONS: "APPLICATIONS"
}

const Nav = () => {
  const loginData = useSelector(state => state.loginData)
  const subMenuData = useSelector(state => state.boardListData)
  const [isSubMenuVisible, setIsSubMenuVisible] = useState(false);
  const [navState, setNavState] = useState(navStateEnum.BOARD)

   // 로그인모달창 관련
   const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
   const handleLoginModalOpen = (isOpen) => {
     setIsLoginModalOpen(isOpen);
   }

  // Nav 항목별 라우팅 설정
  const navigate = useNavigate();
  const handleMenuClick = (menu) => {
    switch (menu) {
      case navStateEnum.BOARD:
        setNavState(navStateEnum.BOARD);
        navigate('/');
        break;
      case navStateEnum.RECURITMENTS:
        if(loginData && loginData.memberId) {
          setNavState(navStateEnum.RECURITMENTS);
          navigate('/recruitments');
        }
        else {
          handleLoginModalOpen(true);
        }
        break;
      case navStateEnum.APPLICATIONS:
        if(loginData && loginData.memberId) {
          setNavState(navStateEnum.APPLICATIONS);
          navigate('/applications');
        }
        else {
          handleLoginModalOpen(true);
        }
        break;
      default:
    }
  };

  return (
    <div className={styles.scrollcontainer}>
      <div className={styles.boardmap}>
        <div className={styles.menubar} onMouseLeave={() => setIsSubMenuVisible(false)}>
          <button onClick={() => handleMenuClick(navStateEnum.BOARD)}
                  className={`${styles.button} ${navState===navStateEnum.BOARD ? styles.active : ''}`}
                  onMouseEnter={() => setIsSubMenuVisible(true)}>
            게시판
          </button>
          {isSubMenuVisible && <SubMenu subMenuData={subMenuData}/>}
          <button onClick={() => handleMenuClick(navStateEnum.RECURITMENTS)}
                  className={`styles.button ${navState===navStateEnum.RECURITMENTS ? styles.active : ''}`}>
            작성글 목록
          </button>
          <button onClick={() => handleMenuClick(navStateEnum.APPLICATIONS)}
                  className={`styles.button ${navState===navStateEnum.APPLICATIONS ? styles.active : ''}`}>
            신청 목록
          </button>
        </div>
      </div>
      <LoginModalPage isOpen={isLoginModalOpen} handleLoginModalOpen={handleLoginModalOpen}/>
    </div>
  );
};

export default Nav;
