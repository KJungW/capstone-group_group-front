import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "styles/Board.module.css";

const Board = () => {
  const navigate = useNavigate();

  const handleWriteButtonClick = () => {
    navigate('/recruit');
  };

  // example data
  const posts = [
    { id: 1, title: '웹 개발 하실 팀원 모집합니다', timestamp: '12:34' },
    { id: 2, title: '웹 개발 하실 팀원 모집합니다', timestamp: '2024-03-05' },
    { id: 3, title: '웹 개발 하실 팀원 모집합니다', timestamp: '2024-03-05' },
    { id: 4, title: '웹 개발 하실 팀원 모집합니다', timestamp: '2024-03-05' },
    { id: 5, title: '웹 개발 하실 팀원 모집합니다', timestamp: '2024-03-05' },
    { id: 6, title: '웹 개발 하실 팀원 모집합니다', timestamp: '2024-03-05' },
  ];

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
              <table className={styles.postsTable}>
                <tbody>
                {posts.map((post) => (
                    <tr key={post.id}>
                      <td>{post.title}</td>
                      <td className={styles.narrowDateColumn}>{post.timestamp}</td>
                    </tr>
                ))}
                </tbody>
              </table>
            </div>
            <div className={styles.navigation}>
              <div className={styles.narrow}>
                <a href="#">&lt;</a>
              </div>
              <div className={styles.page}>
                <a href="#">1</a>
                <a href="#">2</a>
                <a href="#">3</a>
                <a href="#">4</a>
                <a href="#">5</a>
              </div>
              <div className={styles.narrow}>
                <a href="#">&gt;</a>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Board;
