import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "styles/join_request.css";

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
    condition: "간단한 코드",
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
    if (dataItem.file) {
      return (
        <div className="inputline">
          <ul className="list">
            <li>
              <button className="upload-button">파일 업로드</button>
            </li>
            <li className="content-list">
              <input type="text" className="input-content" />
            </li>
          </ul>
        </div>
      );
    } else {
      return (
        <div className="inputline">
          <input type="text" className="input-content" />
        </div>
      );
    }
  };

  return (
    <div className="scroll-container">
      <div className="board-map">
        <div className="board-content">
          <div className="wrap1">
            <div className="board-name">신청하기</div>
          </div>
          <div className="contents-box">
            {mockData.map((dataItem) => (
              <div key={dataItem.id} className="Item">
                <div className="requirement">
                  <div>
                    참여요건{dataItem.id}:{dataItem.condition}
                  </div>
                </div>
                {renderInputLine(dataItem)}
              </div>
            ))}
          </div>
          <button className="save-button">저장하기</button>
        </div>
      </div>
    </div>
  );
};

export default Request;
