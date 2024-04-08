import React, { useState } from 'react';
import styles from "styles/Nav.module.css";
import { useNavigate, useLocation } from 'react-router-dom';
import SubMenu from './SubMenu';

const Nav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSubMenuVisible, setIsSubMenuVisible] = useState(false);

  // const handleMenuClick = (menu) => {
  //   switch (menu) {
  //     case 'board':
  //       navigate('/');
  //       break;
  //     case 'recruitments':
  //       navigate('/recruitments');
  //       break;
  //     case 'applications':
  //       navigate('/applications');
  //       break;
  //     default:
  //       break;
  //   }
  // };

  // 메뉴의 경로와 현재 경로가 일치하는지 확인하는 함수
  const isActive = (path) => location.pathname === path;

  // 서브메뉴 데이터 예시
  const subMenuData = [
    {
      mainMenu: '조별과제/캡스톤',
      subMenus: ['IT공과', '인문예술', '사회과학', '디자인']
    },
    {
      mainMenu: '대회/공모전',
      subMenus: ['IT공과', '인문예술', '사회과학', '디자인']
    },
    {
      mainMenu: '스터디',
      subMenus: ['IT공과', '인문예술', '사회과학', '디자인']
    }
  ];

  const handleSubMenuClick = (subItem) => {
    console.log('Clicked on sub menu item:', subItem);
    // 클릭한 서브메뉴에 대한 동작 추가
  };

  return (
    <div className={styles.scrollcontainer}>
      <div className={styles.boardmap}>
        <div className={styles.menubar} onMouseLeave={() => setIsSubMenuVisible(false)}>
          <button // onClick={() => handleMenuClick('board')}
                  className={`${styles.button} ${isActive('/') ? styles.active : ''}`}
                  onMouseEnter={() => setIsSubMenuVisible(true)}>
            게시판
            {isSubMenuVisible && <SubMenu subMenuData={subMenuData} handleSubMenuClick={handleSubMenuClick} />}
          </button>
          <button // onClick={() => handleMenuClick('recruitments')}
                  className={`styles.button ${isActive('/recruitments') ? styles.active : ''}`}>
            작성글 목록
          </button>
          <button // onClick={() => handleMenuClick('applications')}
                  className={`styles.button ${isActive('/applications') ? styles.active : ''}`}>
            신청 목록
          </button>
        </div>
      </div>
    </div>
  );
};

export default Nav;
