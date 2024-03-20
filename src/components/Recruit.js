import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'styles/Recruit.css';
import 'styles/Board.css';

function Recruit() {
  const [requirements, setRequirements] = useState([{ id: 1, text: '', fileType: '' }]);
  const navigate = useNavigate();
  const [boardOption, setBoardOption] = useState('');
  const [title, setTitle] = useState('');
  const [activity, setActivity] = useState('');
  const [teamPreference, setTeamPreference] = useState('');
  const [chatAddress, setChatAddress] = useState('');
  const [additionalComments, setAdditionalComments] = useState('');

  const addRequirement = () => {
    const newRequirement = { id: requirements.length + 1, text: '', fileType: '' };
    setRequirements([...requirements, newRequirement]);
  };

  const deleteRequirement = (id) => {
    setRequirements(requirements.filter((requirement) => requirement.id !== id));
  };

  const handleBoardChange = (event) => {
    setBoardOption(event.target.value);
  };

  const handleFileTypeChange = (requirementIndex, fileType) => {
    const updatedRequirements = [...requirements];
    updatedRequirements[requirementIndex].fileType = fileType;
    setRequirements(updatedRequirements);
  };

  const handlePostButtonClick = () => {
    if (!boardOption) {
      alert('게시판 유형을 선택해주세요.');
      return;
    }
    
    if (!title || !activity || !teamPreference || !chatAddress) {
      alert('필수 항목을 모두 입력해주세요.');
      return;
    }

    navigate('/');
  };

  return (
    <div className="scroll-container">
      <div className="recruit-content">
        <div className="wrap1">
          <div className="board-name">
            모집글 작성
          </div>
          <select className="select-button" value={boardOption} onChange={handleBoardChange}>
            <option value="">게시판 선택</option>
            <option value="1">조별과제/캡스톤</option>
            <option value="2">대회/공모전</option>
            <option value="3">스터디</option>
          </select>
        </div>
        <div className="rcontents-box">
          <div className="text1">제목 :</div>
          <input type="text" name="input" value={title} onChange={(e) => setTitle(e.target.value)} />
          <div className="text1">활동내용 :</div>
          <textarea name="activity" value={activity} onChange={(e) => setActivity(e.target.value)} />
          <div className="text1">팀성향 :</div>
          <div className="team-buttons">
            <label>
              <input type="radio" name="team-preference" value="1" checked={teamPreference === '1'} onChange={() => setTeamPreference('1')} />
              1등이 목표입니다!
            </label>
            <label>
              <input type="radio" name="team-preference" value="2" checked={teamPreference === '2'} onChange={() => setTeamPreference('2')} />
              적당히 평범하게 할거에요!
            </label>
            <label>
              <input type="radio" name="team-preference" value="3" checked={teamPreference === '3'} onChange={() => setTeamPreference('3')} />
              제출만 하면 돼요!
            </label>
          </div>
          <div className="text1">오픈채팅방 주소 :</div>
          <input type="text" name="input" value={chatAddress} onChange={(e) => setChatAddress(e.target.value)} />
          <div className="text1">하고싶은 말 :</div>
          <textarea name="additionalComments" value={additionalComments} onChange={(e) => setAdditionalComments(e.target.value)} />
          <div className="text1">참여요건</div>
          {requirements.map((requirement, index) => (
            <div key={requirement.id} className="requirement-container">
              <div className="requirement">
                <div className="text2">참여요건 :</div>
                <input type="text" name="input" />
                {index > 0 && <button className="delete-button" onClick={() => deleteRequirement(requirement.id)}>X</button>}
              </div>
              <div className="filetype">
                <div className="text2">제출물 타입 :</div>
                <div className="filetype-buttons">
                  <label>
                    <input type="radio" name={`filetype-preference-${requirement.id}`} value="1" checked={requirement.fileType === '1'} onChange={() => handleFileTypeChange(index, '1')} />
                    텍스트
                  </label>
                  <label>
                    <input type="radio" name={`filetype-preference-${requirement.id}`} value="2" checked={requirement.fileType === '2'} onChange={() => handleFileTypeChange(index, '2')} />
                    파일
                  </label>
                </div>
              </div>
            </div>
          ))}
          <button className="add-button" onClick={addRequirement}>+</button>
        </div>
        <button className="post-button" onClick={handlePostButtonClick}>등록하기</button>
      </div>
    </div>
  );
}

export default Recruit;
