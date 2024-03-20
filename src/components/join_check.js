import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "styles/join_check.css";
import Item_check from "./Item_check";

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

  const handleMenuClick = (menu) => {
    // 사용자가 확인을 눌렀을 때만 메뉴를 변경합니다.
    const userConfirmation = window.confirm("현재 페이지를 벗어나시겠습니까?");
    if (userConfirmation) {
      setSelectedMenu(menu);
      setBoardName(getMenuName(menu));
      setShowWriteButton(menu === "board");
    }
  };

  const getMenuName = (menu) => {
    let confirmationMessage = "";

    switch (menu) {
      case "board":
        confirmationMessage = "게시판";
        break;
      case "applications":
        confirmationMessage = "작성글 목록";
        break;
      case "recruitments":
        confirmationMessage = "신청 목록";
        break;
      default:
        return "";
    }
  };

  return (
    <div className="scroll-container">
      <div className="board-map">
        <div className="menu-bar">
          <button
            onClick={() => handleMenuClick("board")}
            className={selectedMenu === "board" ? "active" : ""}
          >
            게시판
          </button>
          <button
            onClick={() => handleMenuClick("applications")}
            className={selectedMenu === "applications" ? "active" : ""}
          >
            작성글 목록
          </button>
          <button
            onClick={() => handleMenuClick("recruitments")}
            className={selectedMenu === "recruitments" ? "active" : ""}
          >
            신청 목록
          </button>
        </div>
        <div className="board-content">
          <div className="wrap1">
            <div className="board-name">신청 내용</div>
          </div>
          <div className="contents-box">
            {mockData.map((dataItem) => (
              <Item_check key={dataItem.id} data={dataItem} />
            ))}
          </div>
          <button className="approval">수락하기</button>
          <button className="back">뒤로가기</button>
        </div>
      </div>
    </div>
  );
};

export default Check;
