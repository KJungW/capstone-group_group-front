import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "styles/Board.module.css";

const Board = () => {
  const navigate = useNavigate();

  const handleWriteButtonClick = () => {
    navigate('/recruit');
  };

  return (
    <div className={styles.scrollcontainer}>
      <div className={styles.boardmap}>
        <div className={styles.boardcontent}>
          <div className={styles.wrap1}>
            <div className={styles.boardname}>
              게시판
            </div>
            <button className={styles.writebutton} onClick={handleWriteButtonClick}>글쓰기</button>
          </div>
          <div className={styles.contentsbox}>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Board;
