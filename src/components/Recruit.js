import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "styles/Recruit.module.css";

function Recruit() {
  const [requirements, setRequirements] = useState([{ id: 1, title: '', resultType: '' }]);
  const navigate = useNavigate();
  const [selectedBoardId, setSelectedBoardId] = useState('');
  const [postTitle, setPostTitle] = useState('');
  const [activityDetail, setActivityDetail] = useState('');
  const [passionSize, setPassionSize] = useState('');
  const [additionalWriting, setAdditionalWriting] = useState('');
  const [openChatUrl, setOpenChatUrl] = useState('');

  const addRequirement = () => {
    const newRequirement = { id: requirements.length + 1, title: '', resultType: '' };
    setRequirements([...requirements, newRequirement]);
  };

  const deleteRequirement = (id) => {
    setRequirements(requirements.filter((requirement) => requirement.id !== id));
  };

  const handleBoardChange = (event) => {
    setSelectedBoardId(event.target.value);
  };

  const handleFileTypeChange = (requirementIndex, resultType) => {
    const updatedRequirements = [...requirements];
    updatedRequirements[requirementIndex].resultType = resultType;
    setRequirements(updatedRequirements);
  };

  const handleInputChange = (event, setState, maxLength) => {
    const { value } = event.target;
    if (value.length <= maxLength) {
      setState(value);
    }
  };

  const handlePostButtonClick = () => {
    if (!selectedBoardId || !postTitle.trim() || !activityDetail.trim() || !passionSize || !openChatUrl.trim()) {
      alert('필수 항목을 모두 입력해주세요.');
      return;
    }

    if (requirements.length > 0) {
      for (const requirement of requirements) {
        if (!requirement.title.trim() || !requirement.resultType) {
          alert('참여요건을 모두 입력해주세요.');
          return;
        }
      }
    }

    // 실제 API 호출
    alert('API 호출이 성공했습니다.');
    // navigate('/');
  };

  return (
    <div className={styles.scrollcontainer}>
      <div className={styles.recruitcontent}>
        <div className={styles.wrap1}>
          <div className={styles.boardname}>
            모집글 작성
          </div>
          <select className={styles.selectbutton} value={selectedBoardId} onChange={handleBoardChange}>
            <option value="">게시판 선택</option>
            <option value="1">조별과제/캡스톤</option>
            <option value="2">대회/공모전</option>
            <option value="3">스터디</option>
          </select>
        </div>
        <div className={styles.rcontentsbox}>
          <div className={styles.text1}>제목 :</div>
          <input type="text" name="input" value={postTitle} onChange={(e) => handleInputChange(e, setPostTitle, 30)} />
          <div className={styles.text1}>활동내용 :</div>
          <textarea name="activity" value={activityDetail} onChange={(e) => handleInputChange(e, setActivityDetail, 100)} />
          <div className={styles.text1}>팀성향 :</div>
          <div className={styles.teambuttons}>
            <label>
              <input type="radio" name="team-preference" value="BIG" checked={passionSize === 'BIG'} onChange={() => setPassionSize('BIG')} />
              1등이 목표입니다!
            </label>
            <label>
              <input type="radio" name="team-preference" value="MIDDLE" checked={passionSize === 'MIDDLE'} onChange={() => setPassionSize('MIDDLE')} />
              적당히 평범하게 할거에요!
            </label>
            <label>
              <input type="radio" name="team-preference" value="SMALL" checked={passionSize === 'SMALL'} onChange={() => setPassionSize('SMALL')} />
              제출만 하면 돼요!
            </label>
          </div>
          <div className={styles.text1}>오픈채팅방 주소 :</div>
          <input type="text" name="input" value={openChatUrl} onChange={(e) => handleInputChange(e, setOpenChatUrl, 100)} />
          <div className={styles.text1}>하고싶은 말 :</div>
          <textarea name="additionalComments" value={additionalWriting} onChange={(e) => handleInputChange(e, setAdditionalWriting, 100)} />
          <div className={styles.text1}>참여요건</div>
          {requirements.map((requirement, index) => (
            <div key={requirement.id} className={styles.requirementcontainer}>
              <div className={styles.requirement}>
                <div className={styles.text2}>참여요건 :</div>
                <input type="text" name="input" value={requirement.title} onChange={(e) => handleInputChange(e, (value) => {
                  const updatedRequirements = [...requirements];
                  updatedRequirements[index].title = value;
                  setRequirements(updatedRequirements);
                }, 100)} />
                {index > 0 && <button className={styles.deletebutton} onClick={() => deleteRequirement(requirement.id)}>X</button>}
              </div>
              <div className={styles.filetype}>
                <div className={styles.text2}>제출물 타입 :</div>
                <div className={styles.filetypebuttons}>
                  <label>
                    <input type="radio" name={`filetype-preference-${requirement.id}`} value="TEXT" checked={requirement.resultType === 'TEXT'} onChange={() => handleFileTypeChange(index, 'TEXT')} />
                    텍스트
                  </label>
                  <label>
                    <input type="radio" name={`filetype-preference-${requirement.id}`} value="FILE" checked={requirement.resultType === 'FILE'} onChange={() => handleFileTypeChange(index, 'FILE')} />
                    파일
                  </label>
                </div>
              </div>
            </div>
          ))}
          <button className={styles.addbutton} onClick={addRequirement}>+</button>
        </div>
        <button className={styles.postbutton} /* onClick={handlePostButtonClick} */>등록하기</button>
      </div>
    </div>
  );
}

export default Recruit;