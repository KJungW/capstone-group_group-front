import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'styles/Recruit.css';
import 'styles/Board.css';

function RecruitDetail() {
  const navigate = useNavigate();

  const handleHomeButtonClick = () => {
    navigate('/');
  };

  return (

    <div className="scroll-container">
      <div className="recruit-content">
        <div className="wrap1">
          <div className="board-name">
            ~~~~ 게시판
          </div>
        </div>
        <div className="rcontents-box">
          <div className="text1">제목 :</div>
          <div className="text3">웹개발 캡스톤 팀원을 구합니다.</div>
          <div className="text1">활동내용 :</div>
          <div className="text3">2024년 1학기 컴퓨터공학과 웹개발 트랙으로 캡스톤디자인 수행</div>
          <div className="text1">팀성향 :</div>
          <div className="text3">적당히 평범하게 할거에요!</div>
          <div className="text1">하고싶은 말 :</div>
          <div className="text3">안녕하세요, 한 학기동안 열심히 해봐요!</div>
          <div className="text1">참여요건</div>
            <div className="requirement-detail-container">
              <div className="requirement">
                <div className="text2">참여요건 :</div>
                <div className="text4">github 주소</div>
              </div>
              <div className="filetype">
                <div className="text2">제출물 타입 :</div>
                <div className="text4">텍스트</div>
              </div>
            </div>
        </div>
        <button className="post-button" onClick={handleHomeButtonClick}>신청하기</button>
      </div>
    </div>
  );
}

export default RecruitDetail;