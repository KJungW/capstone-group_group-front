import reqeustFindPostDetail from 'hook/requestFindPostDetailApi';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from "styles/RecruitDetail.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { openLoginModal } from 'store/aboutStore';

function RecruitDetail() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let {postId} = useParams();
  const initDataComplete = useSelector(state => state.initDataComplete)
  const loginData = useSelector(state => state.loginData);
  const [currentPostId, setCurrentPostId] = useState(postId);
  const [postData, setPostData] = useState(null);
  const [activeBtn, setActiveBtn] = useState(true);

  // textarea 참조
  const activityDetailAreaRef = useRef(null);
  const additionalWritingAreaRef = useRef(null);

  // textarea 관리
  useEffect(()=> {
    if(!activityDetailAreaRef || !activityDetailAreaRef.current) return;
    if(!additionalWritingAreaRef || !additionalWritingAreaRef.current) return;
    activityDetailAreaRef.current.style.height = "36px";
    activityDetailAreaRef.current.style.height = activityDetailAreaRef.current.scrollHeight + "px";
    additionalWritingAreaRef.current.style.height = "36px";
    additionalWritingAreaRef.current.style.height = additionalWritingAreaRef.current.scrollHeight + "px";
  }, [postData])


  // 모집글 세부정보 요청 API
  useEffect(() => {
    if(!initDataComplete) return;
    console.log("RecruitDetail : 모집글 세부정보 요청 시도")
    reqeustFindPostDetail(currentPostId, loginData?loginData.memberId:"")
    .then(res => {
      console.log("RecruitDetail : 모집글 세부정보 요청 성공");
      setPostData(res.data)
    })
    .catch(err=>{
      console.log("RecruitDetail : 모집글 세부정보 요청 실패");
      console.log(err);
      alert("접속이 원할하지 않습니다. 잠시후 다시 접속해주세요");
    })
  }, [currentPostId, loginData, initDataComplete]);

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

  // 목록보기 버튼 클릭
  const onClickShowListBtn = () => {
    navigate(-1);
  }

  if (!postData) {
    return <></>
  }

  return (
    <div className={styles.scrollcontainer}>
      <div className={styles.recruitcontent}>
        <div className={styles.wrap1}>
          <div className={styles.boardname}>
            {postData.boardName.replace("$", " - ")}
          </div>
        </div>
        <div className={styles.rcontentsbox}>
          <div className={styles.text1}>작성자 :</div>
          <div className={styles.text3}>{postData.writerNickname}</div>
          <div className={styles.text1}>제목 :</div>
          <div className={styles.text3}>{postData.title}</div>
          <div className={styles.text1}>활동내용 :</div>
          <textarea ref={activityDetailAreaRef} className={styles.textArea} value={postData.activityDetail} disabled={true}></textarea>
          <div className={styles.text1}>팀성향 :</div>
          <div className={styles.text3}>
            {postData.passionSize === 'BIG' && '1등이 목표입니다!'}
            {postData.passionSize === 'MIDDLE' && '적당히 평범하게 할거에요!'}
            {postData.passionSize === 'SMALL' && '제출만 하면 돼요!'}
          </div>
          <div className={styles.text1}>하고싶은 말 :</div>
          <textarea ref={additionalWritingAreaRef} className={styles.textArea} value={postData.additionalWriting} disabled={true}></textarea>
          {
            postData.openChatUrl? <>
                                    <div className={styles.text1}>오픈채팅방 주소 :</div>
                                    <div className={styles.text3}>{postData.openChatUrl}</div>
                                  </>
                                : ""
          }
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
        {
          activeBtn?<button className={styles.postbutton} onClick={onClickRequestBtn}>신청하기</button>
                    :<button className={styles.postbutton} onClick={onClickShowListBtn}>목록보기</button>}
      </div>
    </div>
  );
}

export default RecruitDetail;