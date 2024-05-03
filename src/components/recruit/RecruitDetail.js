import reqeustFindPostDetail from 'hook/requestFindPostDetailApi';
import LoginModalPage from 'components/login/LoginModalPage';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from "styles/RecruitDetail.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { openLoginModal } from 'store/aboutStore';

function RecruitDetail() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let {postId} = useParams();
  const loginData = useSelector(state => state.loginData);
  const [currentPostId, setCurrentPostId] = useState(postId);
  const [postData, setPostData] = useState(null);
  const [activeBtn, setActiveBtn] = useState(true);

  // 모집글 세부정보 요청 API
  useEffect(() => {
    console.log("RecruitDetail : 모집글 세부정보 요청 시도")
    reqeustFindPostDetail(currentPostId)
    .then(res => {
      console.log("RecruitDetail : 모집글 세부정보 요청 성공");
      setPostData(res.data)
    })
    .catch(err=>{
      console.log("RecruitDetail : 모집글 세부정보 요청 실패");
      console.log(err);
      alert("접속이 원할하지 않습니다. 잠시후 다시 접속해주세요");
    })
  }, [currentPostId]);

  useEffect(() => {
    if(loginData && postData) {
      if(loginData.memberId === postData.writerId)
        setActiveBtn(false);
    }
  }, [loginData, postData])

  // 신청하기 버튼 클릭
  const onClickRequestBtn = () => {
    if(localStorage.getItem("jwtToken"))
      navigate(`/apply/${currentPostId}`);
    else 
    dispatch(openLoginModal());
  }

  if (!postData) {
    return <></>
  }

  return (
    <div className={styles.scrollcontainer}>
      <div className={styles.recruitcontent}>
        <div className={styles.wrap1}>
          <div className={styles.boardname}>
            {postData.boardName.split("$")[0]}
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
        {activeBtn?<button className={styles.postbutton} onClick={onClickRequestBtn}>신청하기</button>:''}
      </div>
    </div>
  );
}

export default RecruitDetail;