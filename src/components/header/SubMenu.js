import React from 'react';
import styles from "styles/SubMenu.module.css";
import { useNavigate } from 'react-router-dom';

const SubMenu = ({ subMenuData }) => {
  const navigate = useNavigate();

  // 서브메뉴 클릭 처리메서드
  const handleSubMenuClick = (boardId) => {
    navigate(`/${boardId}`);
  };

  return (
    <div className={styles.subMenu}>
      {subMenuData.map((item, index) => (
        <div key={index} className={styles.subMenuItem}>
          <div className={styles.subMenuTitle}>{item.mainMenu}</div>
          <div className={styles.subSubMenu}>
            {item.data.map((subItem, subIndex) => (
              <div key={subIndex} className={styles.subSubMenuTitle} onClick={() => handleSubMenuClick(subItem.id)}>
                {subItem.subMenu}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SubMenu;