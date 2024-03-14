import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'styles/Board.css';

const Board = () => {
  const [selectedMenu, setSelectedMenu] = useState('board');

  const [boardName, setBoardName] = useState('게시판');

  const [showWriteButton, setShowWriteButton] = useState(true);

  const navigate = useNavigate();

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);

    // 버튼 클릭 시 해당 메뉴의 이름으로 boardname 변경
    setBoardName(getMenuName(menu));

    // 게시판 메뉴일 경우에만 글쓰기 버튼 표시
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

  return (
    <div className="scroll-container">
      <div className="board-map">
        <div className="menu-bar">
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
        <div className="board-content">
          <div className="wrap1">
          <div className="board-name">
            {boardName}
          </div>
          {showWriteButton && (
            <button className="write-button">글쓰기</button>
          )}
          </div>
          <div className="contents-box">
          </div>
        </div>
      </div>
    </div>
  );
};

export default Board;
