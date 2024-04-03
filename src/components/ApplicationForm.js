import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "styles/ApplicationForm.module.css";

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

const ApplicationForm = () => {
  const [selectedMenu, setSelectedMenu] = useState("board");
  const [boardName, setBoardName] = useState("신청하기");
  const [showWriteButton, setShowWriteButton] = useState(true);
  const [data, setData] = useState(mockData);
  const navigate = useNavigate();
  const fileInputRef = React.useRef(null);

  const handleFileChange = (file, id) => {
    if (
      file &&
      !["image/jpeg", "image/png", "application/pdf"].includes(file.type)
    ) {
      alert("jpg, jpeg, png, pdf 확장자만 허용됩니다.");
      return;
    }
    if (file && file.size > 3145728) {
      alert("파일 용량은 3MB 이하이어야 합니다.");
      return;
    }
    const newData = data.map((item) =>
      item.id === id ? { ...item, content: file ? file.name : "" } : item
    );
    setData(newData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    for (const item of data) {
      if (!item.file) {
        if (!item.content.trim()) {
          alert(`${item.condition}은(는) 필수입니다.`);
          return; // 검증 실패시 제출 중단
        }
        if (item.content.trim().length > 100) {
          alert(`${item.condition}은(는) 100자를 초과할 수 없습니다.`);
          return; // 검증 실패시 제출 중단
        }
      } else if (item.file) {
        if (!item.content.trim()) {
          alert(`${item.condition}파일은(는) 필수입니다.`);
          return; // 검증 실패시 제출 중단
        }
      }
    }

    console.log(data); // 일단 임시로 콘솔에 현재 상태 출력하여 확인
    // 여기에 데이터 처리 로직 추가 예정
    // navigate("/");  전송 완료 후 이동할 페이지
  };

  const renderInputLine = (dataItem) => {
    const handleTextChange = (e, id) => {
      const newData = data.map((item) =>
        item.id === id ? { ...item, content: e.target.value } : item
      );
      setData(newData);
    };

    if (dataItem.file) {
      return (
        <div className={styles.inputLine}>
          <ul className={styles.list}>
            <li>
              <label
                className={styles.uploadButton}
                htmlFor={`file-input-${dataItem.id}`}
              >
                파일 업로드
              </label>
              <input
                id={`file-input-${dataItem.id}`}
                type="file"
                onChange={(e) =>
                  handleFileChange(e.target.files[0], dataItem.id)
                }
                accept=".jpg, .jpeg, .png, .pdf"
                style={{ display: "none" }}
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
            maxLength="100"
            className={styles.inputContent}
            // value={dataItem.content}
            onChange={(e) => handleTextChange(e, dataItem.id)}
          />
        </div>
      );
    }
  };

  return (
    <div className={styles.scrollContainer}>
      <form onSubmit={handleSubmit} className={styles.requestcontent}>
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
          <button type="submit" className={styles.saveButton}>
            저장하기
          </button>
        </div>
      </form>{" "}
      {/* form 태그 닫기 */}
    </div>
  );
};

export default ApplicationForm;
