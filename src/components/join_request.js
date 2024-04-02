import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "styles/join_request.module.css";

const mockData = [
  {
    id: 1,
    condition: "github 주소",
    file: false,
    content: "",
  },
  {
    id: 2,
    condition: "학점 인증사진",
    file: true,
    content: "",
  },
  {
    id: 3,
    condition: "자신있는 언어",
    file: false,
    content: "",
  },

  {
    id: 4,
    condition: "간단한 자소서",
    file: true,
    content: "",
  },
];

const Request = () => {
  const [selectedMenu, setSelectedMenu] = useState("board");
  const [boardName, setBoardName] = useState("신청하기");
  const [showWriteButton, setShowWriteButton] = useState(true);
  const [data, setData] = useState(mockData);
  const navigate = useNavigate();

  const renderInputLine = (dataItem) => {
    const fileInputRef = React.useRef(null); // 파일 입력을 위한 ref 생성

    const handleButtonClick = () => {
      fileInputRef.current.click(); // 버튼 클릭 시 숨겨진 file input 트리거
    };

    if (dataItem.file) {
      return (
        <div className={styles.inputLine}>
          <ul className={styles.list}>
            <li>
              <button
                className={styles.uploadButton}
                onClick={handleButtonClick}
              >
                파일 업로드
              </button>
              <input
                ref={fileInputRef}
                type="file"
                onChange={(e) =>
                  handleFileChange(e.target.files[0], dataItem.id)
                }
                accept=".jpg, .jpeg, .png, .pdf"
                style={{ display: "none" }} // 파일 입력 필드 숨기기
              />
            </li>
            <li className={styles.contentList}>
              <input
                type="text"
                className={styles.inputContent}
                value={dataItem.content}
                readOnly
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
            value={dataItem.content}
            onChange={(e) => handleTextChange(e.target.value, dataItem.id)}
            maxLength="100"
            className={styles.inputContent}
          />
        </div>
      );
    }
  };

  return (
    <div className={styles.scrollContainer}>
      <div className={styles.requestcontent}>
        <div className={styles.boardContent}>
          <div className={styles.wrap1}>
            <div className={styles.boardName}>신청하기</div>
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
          <button className={styles.saveButton}>저장하기</button>
        </div>
      </div>
    </div>
  );
};

export default Request;
