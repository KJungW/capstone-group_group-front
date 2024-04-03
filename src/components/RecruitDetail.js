import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from "styles/RecruitDetail.module.css";

function RecruitDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const [postData, setPostData] = useState(null);

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        // API 호출
        const response = await fetch(`http://localhost:8080/post?postId=${location.search}`);
        const data = await response.json();
        setPostData(data);
      } catch (error) {
        console.error('Error fetching post detail:', error);
      }
    };

    fetchPostDetail();
  }, [location.search]);

  // const handleHomeButtonClick = () => {
  //   navigate('/');
  // };

  if (!postData) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.scrollcontainer}>
      <div className={styles.recruitcontent}>
        <div className={styles.wrap1}>
          <div className={styles.boardname}>
            {postData.boardName} 게시판
          </div>
        </div>
        <div className={styles.rcontentsbox}>
          <div className={styles.text1}>제목 :</div>
          <div className={styles.text3}>{postData.title}</div>
          <div className={styles.text1}>활동내용 :</div>
          <div className={styles.text3}>{postData.activityDetail}</div>
          <div className={styles.text1}>팀성향 :</div>
          <div className={styles.text3}>
            {postData.passionSize === 'BIG' && '1등이 목표입니다!'}
            {postData.passionSize === 'MIDDLE' && '적당히 평범하게 할거에요!'}
            {postData.passionSize === 'SMALL' && '제출만 하면 돼요!'}
          </div>
          <div className={styles.text1}>하고싶은 말 :</div>
          <div className={styles.text3}>{postData.additionalWriting}</div>
          <div className={styles.text1}>참여요건</div>
          {postData.requirementList.map((requirement, index) => (
            <div key={index} className={styles.requirementdetailcontainer}>
              <div className={styles.requirement}>
                <div className={styles.text2}>참여요건 :</div>
                <div className={styles.text4}>{requirement.title}</div>
              </div>
              <div className={styles.filetype}>
                <div className={styles.text2}>제출물 타입 :</div>
                <div className={styles.text4}>{requirement.resultType === 'TEXT' ? '텍스트' : '파일'}</div>
              </div>
            </div>
          ))}
        </div>
        <button className={styles.postbutton} /* onClick={handleHomeButtonClick} */>신청하기</button>
      </div>
    </div>
  );
}

export default RecruitDetail;