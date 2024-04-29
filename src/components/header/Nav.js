import React, { useState } from 'react';
import styles from "styles/Nav.module.css";
import { useNavigate } from 'react-router-dom';
import SubMenu from 'components/header/SubMenu';
import { useSelector } from "react-redux";

// Navigator 요소중 어떤 것이 선택되었는지 나타내는 상태타입(enum 대용으로 사용)
const navStateEnum = {
  NONE : "NONE",
  BOARD: "BOARD",
  RECURITMENTS: "RECURITMENTS",
  APPLICATIONS: "APPLICATIONS"
}

const Nav = () => {
  const subMenuData = useSelector(state => state.boardListData)
  const [isSubMenuVisible, setIsSubMenuVisible] = useState(false);
  const [navState, setNavState] = useState(navStateEnum.BOARD)

  // Nav 항목별 라우팅 설정
  const navigate = useNavigate();
  const handleMenuClick = (menu) => {
    switch (menu) {
      case navStateEnum.BOARD:
        setNavState(navStateEnum.BOARD);
        navigate('/');
        break;
      case navStateEnum.RECURITMENTS:
        setNavState(navStateEnum.RECURITMENTS);
        navigate('/recruitments');
        break;
      case navStateEnum.APPLICATIONS:
        setNavState(navStateEnum.APPLICATIONS);
        navigate('/applications');
        break;
      default:
    }
  };

  // // 메뉴의 경로와 현재 경로가 일치하는지 확인하는 함수
  // const location = useLocation();
  // const isActive = (path) => location.pathname === path;

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
    </div>
  );
};

export default Nav;
