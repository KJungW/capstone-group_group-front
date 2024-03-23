import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "styles/join_check.module.css";

const mockData = [
  // 일단 임시로 데이터 넣었음
  {
    id: 1,
    condition: "github 주소",
    file: false,
    content: "https://github.com/KJungW/capstone-group_group-front/",
  },
  {
    id: 2,
    condition: "학점 인증사진",
    file: true,
    content: "image.png",
  },
  {
    id: 3,
    condition: "자신있는 언어",
    file: false,
    content: "java,python",
  },
];

const Check = () => {
  const [selectedMenu, setSelectedMenu] = useState("recruitments");
  const [boardName, setBoardName] = useState("신청하기");
  const [showWriteButton, setShowWriteButton] = useState(true);
  const navigate = useNavigate();

  const renderInputLine = (dataItem) => {
    if (dataItem.file) {
      return (
        <div className={styles.inputLine}>
          <ul className={styles.list}>
            <li>
              <button className={styles.downloadButton}>파일 다운로드</button>
            </li>
            <li className={styles.contentList}>
              <input
                type="text"
                className={styles.inputContent}
                readOnly
                value={dataItem.content}
              />
            </li>
          </ul>
        </div>
      );
    } else {
      return (
        <div className={styles.inputLine}>
          <input
            type="text"
            className={styles.inputContent}
            readOnly
            value={dataItem.content}
          />
        </div>
      );
    }
  };

  return (
    <div className={styles.scrollContainer}>
      <div className={styles.boardMap}>
        <div className={styles.boardContent}>
          <div className={styles.wrap1}>
            <div className={styles.boardName}>신청 내용</div>
          </div>
          <div className={styles.contentsBox}>
            {mockData.map((dataItem) => (
              <div key={dataItem.id} className={styles.item}>
                <div className={styles.requirement}>
                  <div>
                    참여요건{dataItem.id}:{dataItem.condition}
                  </div>
                </div>
                {renderInputLine(dataItem)}
              </div>
            ))}
          </div>
          <button className={styles.back}>뒤로가기</button>
        </div>
      </div>
    </div>
  );
};

export default Check;
