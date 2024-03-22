import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "styles/Board.module.css";

const Board = () => {
  const [selectedMenu, setSelectedMenu] = useState('board');
  const [boardName, setBoardName] = useState('게시판');
  const [showWriteButton, setShowWriteButton] = useState(true);
  const navigate = useNavigate();

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
    setBoardName(getMenuName(menu));
    setShowWriteButton(menu === 'board');
  };

  const getMenuName = (menu) => {
    switch (menu) {
      case 'board':
        return '게시판';
      case 'applications':
        return '작성글 목록';
      case 'recruitments':
        return '신청 목록';
      default:
        return '';
    }
  };

  const handleWriteButtonClick = () => {
    navigate('/recruit');
  };

  const handleDetailButtonClick = () => {
    navigate('/recruitdetail');
  };

  return (
    <div className={styles.scrollcontainer}>
      <div className={styles.boardmap}>
        <div className={styles.menubar}>
          <button onClick={() => handleMenuClick('board')} className={selectedMenu === 'board' ? 'active' : ''}>
            게시판
          </button>
          <button onClick={() => handleMenuClick('applications')} className={selectedMenu === 'applications' ? 'active' : ''}>
            작성글 목록
          </button>
          <button onClick={() => handleMenuClick('recruitments')} className={selectedMenu === 'recruitments' ? 'active' : ''}>
            신청 목록
          </button>
        </div>
        <div className={styles.boardcontent}>
          <div className={styles.wrap1}>
            <div className={styles.boardname}>
              {boardName}
            </div>
            {showWriteButton && (
              <button className={styles.writebutton} onClick={handleWriteButtonClick}>글쓰기</button>
            )}
          </div>
          <div className={styles.contentsbox}>
          </div>
          <button className={styles.detailbutton} onClick={handleDetailButtonClick}>모집글 세부페이지(임시버튼)</button>
        </div>
      </div>
    </div>
  );
};

export default Board;
