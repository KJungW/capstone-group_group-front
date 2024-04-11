import React from 'react';
import styles from "styles/SubMenu.module.css";

const SubMenu = ({ subMenuData, handleSubMenuClick }) => {
  return (
    <div className={styles.subMenu}>
      {subMenuData.map((item, index) => (
        <div key={index} className={styles.subMenuItem}>
          <div className={styles.subMenuTitle}>{item.mainMenu}</div>
          <div className={styles.subSubMenu}>
            {item.subMenus.map((subItem, subIndex) => (
              <div key={subIndex} className={styles.subSubMenuTitle} onClick={() => handleSubMenuClick(subItem)}>
                {subItem}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SubMenu;