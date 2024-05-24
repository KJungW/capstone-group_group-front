import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from "styles/RecruitUpdate.module.css";
import { useDispatch, useSelector } from "react-redux";
import makeUuidV4 from 'util/makeUuidV4';
import handleApiReqeustError from 'util/handleApiReqeustError';
import reqeustFindPostDetail from 'hook/requestFindPostDetailApi';
import reqeustUpdatePostApi from 'hook/requestUpdatePostApi';

function RecruitUpdate() {
  // 네비게이터
  const navigate = useNavigate();
  const {postId} = useParams();
   
  // 폼데이터 입력값 상태
  const [boardName, setBoardName] = useState('');
  const [postTitle, setPostTitle] = useState('');
  const [activityDetail, setActivityDetail] = useState('');
  const [passionSize, setPassionSize] = useState('');
  const [additionalWriting, setAdditionalWriting] = useState('');
  const [openChatUrl, setOpenChatUrl] = useState('');
  const [requirements, setRequirements] = useState([{ id:makeUuidV4(), title: '', resultType: '' }]);

  // 글자수 상태
  const [titleCount, setTitleCount] = useState(0);
  const [activityDetailCount, setActivityDetailCount] = useState(0);
  const [openChatUrlCount, setOpenChatUrlCount] = useState(0);
  const [additionalWritingCount, setAdditionalWritingCount] = useState(0);

  // 검증에 따른 에러메세지
  const [postTitleErrMsg, setPostTitleErrMsg] = useState("");
  const [activityDetailErrMsg, setActivityDetailErrMsg] = useState("");
  const [passionSizeErrMsg, setPassionSizeErrMsg] = useState("");
  const [additionalWritingErrMsg, setAdditionalWritingErrMsg] = useState("");
  const [openChatUrlErrMsg, setOpenChatUrlErrMsg] = useState("");
  const [requirementsDescErrMsg, setRequirementsDescErrMsg] = useState([""]);
  const [requirementsTypeErrMsg, setrequirementsTypeErrMsg] = useState([""]);

  // 전역상태 가져오기
  const dispatch = useDispatch()
  const initDataComplete = useSelector(state => state.initDataComplete);
  const loginData = useSelector(state => state.loginData);

  // textarea 참조
  const activityDetailAreaRef = useRef(null);
  const additionalWritingAreaRef = useRef(null);

  useEffect(() => {
    if(!initDataComplete) return;
    requestPostDetail();
  }, [initDataComplete])

  // textarea 관리
  useEffect(()=> {
    if(!activityDetailAreaRef || !activityDetailAreaRef.current) return;
    if(!additionalWritingAreaRef || !additionalWritingAreaRef.current) return;
    activityDetailAreaRef.current.style.height = "36px";
    activityDetailAreaRef.current.style.height = activityDetailAreaRef.current.scrollHeight + "px";
    additionalWritingAreaRef.current.style.height = "36px";
    additionalWritingAreaRef.current.style.height = additionalWritingAreaRef.current.scrollHeight + "px";
  }, [postTitle])
  
  

  const requestPostDetail = async () => {
    try{
        console.log("RecruitUPdate : 모집글 세부정보 요청 시도");
        const oldPost = (await reqeustFindPostDetail(postId, loginData?loginData.memberId:"")).data;
        console.log("RecruitUPdate : 모집글 세부정보 요청 성공");
        // 입력폼 상태 업데이트
        setBoardName(oldPost.boardName.replace("$", " - "));
        setPostTitle(oldPost.title);
        setActivityDetail(oldPost.activityDetail);
        setPassionSize(oldPost.passionSize);
        setAdditionalWriting(oldPost.additionalWriting);
        setOpenChatUrl(oldPost.openChatUrl);
        const oldRequirements = oldPost.requirementList.map(requirement => 
            ({ id:makeUuidV4(), title:requirement.title, resultType:requirement.resultType })
        )
        setRequirements(oldRequirements);
        // 입력폼 글자수 상태 업데이트
        setTitleCount(oldPost.title.length);
        setActivityDetailCount(oldPost.activityDetail.length);
        setOpenChatUrlCount(oldPost.openChatUrl.length);
        setAdditionalWritingCount(oldPost.additionalWriting.length);
    } catch (err) {
        console.log("RecruitUPdate : 모집글 세부정보 요청 실패");
        handleApiReqeustError({err:err});
    }
  }


  // 텍스트 입력폼의 입력처리 메서드
  const handleInputChange = (event, setInputState, setWordCountState, maxLength) => {
    const { value } = event.target;
    if (value.length <= maxLength) {
      setInputState(value);
      setWordCountState(value.length);
    }
  };
  const handleTextAreaChange = (event, textareaRef, setInputState, setWordCountState, maxLength) => {
    const { value } = event.target;
    if (value.length <= maxLength) {
      setInputState(value);
      setWordCountState(value.length);
      if (textareaRef && textareaRef.current) {
        textareaRef.current.style.height = "0px";
        textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
      }
    }
  };
  const handleRequirementTitleChange = (event, setInputState, maxLength) => {
    const { value } = event.target;
    if (value.length <= maxLength) {
      setInputState(value);
    }
  };

  // 추가요건 추가/제거 메서드
  const addRequirement = () => {
    const newRequirement = { id: makeUuidV4(), title: '', resultType: '' };
    setRequirements([...requirements, newRequirement]);
  };
  const deleteRequirement = (id) => {
    setRequirements(requirements.filter((requirement) => requirement.id !== id));
  };

  // 추가요건 제출물 타입변경 메서드
  const handleFileTypeChange = (requirementIndex, resultType) => {
    const updatedRequirements = [...requirements];
    updatedRequirements[requirementIndex].resultType = resultType;
    setRequirements(updatedRequirements);
  };

  // 검증 메서드
  const validateInput = () => {
    let validateResult = true;

    // 제목검증
    let postTitleError;
    if(!postTitle || postTitle.trim() === "") {
        postTitleError="모집글 제목을 입력해주세요";
        validateResult = false;
    } else {
        postTitleError="";
    }


    // 활동내용 검증
    let activityDetailError;
    if(!activityDetail || activityDetail.trim() === "") {
      activityDetailError="활동내용을 입력해주세요";
      validateResult = false;
    } else {
      activityDetailError="";
    }

    // 팀성향 검증
    let passionSizeError
    if(!passionSize || passionSize.trim() === "") {
      passionSizeError="팀성향을 선택해주세요";
      validateResult = false;
    } else {
      passionSizeError="";
    }

    // 오픈채팅방 주소 검증
    let openChatUrlError
    if(!openChatUrl || openChatUrl.trim() === "") {
      openChatUrlError="오픈채팅방 주소를 입력해주세요";
      validateResult = false;
    } else {
      openChatUrlError="";
    }

    // 참여요건 검증
    let requirementsDescError = [... new Array(requirements.length)]
    let requirementsTypeError = [... new Array(requirements.length)]
    requirements.map((item, ix) => {
      if(!item.title || item.title.trim() === "") {
        requirementsDescError[ix] = "참여요건을 입력해주세요";
        validateResult = false;
      }
      if(!item.resultType || item.resultType.trim() === "") {
        requirementsTypeError[ix] = "참여요건에 대한 제출물 타입을 입력해주세요";
        validateResult = false;
      }
    })

    // 검증 결과처리
    return {
      isValid : validateResult,
      postTitleError : postTitleError,
      activityDetailError : activityDetailError,
      passionSizeError : passionSizeError,
      openChatUrlError : openChatUrlError,
      requirementsDescError : requirementsDescError,
      requirementsTypeError : requirementsTypeError
    }
  }

  // 모집글 저장 요청
  const updatePost = async () => {
    try {
        console.log("RecruitUPdate : 모집글 업데이트 요청 시도");
        await reqeustUpdatePostApi({
            postId : postId,
            title : postTitle, 
            activityDetail : activityDetail,
            passionSize : passionSize,
            additionalWriting : additionalWriting,
            openChatUrl : openChatUrl,
            requirementList : requirements.map(requirement => (
                {title:requirement.title , resultType:requirement.resultType}
            ))
        });
        console.log("RecruitUPdate : 모집글 업데이트 요청 성공");
        navigate("/recruitments");
    } catch(err) {
        console.log("RecruitUPdate : 모집글 업데이트 요청 실패");
        handleApiReqeustError({err:err});
    }
  }
  

  // 수정하기 버튼 클릭 메서드
  const handleUpdateButtonClick = () => {
    let validateResult = validateInput()
    if(validateResult.isValid) {
        updatePost();
    } 
    setPostTitleErrMsg(validateResult.postTitleError);
    setActivityDetailErrMsg(validateResult.activityDetailError);
    setPassionSizeErrMsg(validateResult.passionSizeError);
    setOpenChatUrlErrMsg(validateResult.openChatUrlError);
    setRequirementsDescErrMsg(validateResult.requirementsDescError);
    setrequirementsTypeErrMsg(validateResult.requirementsTypeError);
  }

  return (
    <div className={styles.scrollcontainer}>
      <div className={styles.recruitcontent}>
        <div className={styles.wrap1}>
          <div className={styles.boardname}>
            모집글 수정
          </div>
          <select className={styles.selectbutton} disabled={true}>
            <option className={styles.subMenuInSelect}>{boardName}</option>
          </select>
        </div>
        <div className={styles.rcontentsbox}>
          {/*모집글 제목 입력칸*/}
          <div className={styles.header}>
            <div className={styles.text1}>제목 :</div>
            <div className={styles.wordCounter}>{`(${titleCount}/30)`}</div>
          </div>
          <input type="text" name="input" value={postTitle} spellCheck="false" onChange={(e) => handleInputChange(e, setPostTitle, setTitleCount, 30)} />
          <div className={styles.error}>{postTitleErrMsg}</div>
          {/*활동내용 입력칸*/}
          <div className={styles.header}>
            <div className={styles.text1}>활동내용 :</div>
            <div className={styles.wordCounter}>{`(${activityDetailCount}/100)`}</div>
          </div>
          <textarea name="activity" value={activityDetail} spellCheck="false" ref={activityDetailAreaRef} onChange={(e) => handleTextAreaChange(e, activityDetailAreaRef, setActivityDetail, setActivityDetailCount, 100)} />
          <div className={styles.error}>{activityDetailErrMsg}</div>
          {/*팀성향 입력칸 radio*/}
          <div className={styles.header}>
            <div className={styles.text1}>팀성향 :</div>
          </div>
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
          <div className={styles.error}>{passionSizeErrMsg}</div>
          {/*오픈채팅방 주소 입력값*/}
          <div className={styles.header}>
            <div className={styles.text1}>오픈채팅방 주소 :</div>
            <div className={styles.wordCounter}>{`(${openChatUrlCount}/100)`}</div>
          </div>
          <input type="text" name="input" value={openChatUrl} spellCheck="false" onChange={(e) => handleInputChange(e, setOpenChatUrl, setOpenChatUrlCount, 100)} />
          <div className={styles.error}>{openChatUrlErrMsg}</div>
          {/*추가로 하고싶은말 입력값*/}
          <div className={styles.header}>
            <div className={styles.text1}>하고싶은 말 :</div>
            <div className={styles.wordCounter}>{`(${additionalWritingCount}/100)`}</div>
          </div>
          <textarea name="additionalComments" spellCheck="false" value={additionalWriting} ref={additionalWritingAreaRef} onChange={(e) => handleTextAreaChange(e, additionalWritingAreaRef, setAdditionalWriting, setAdditionalWritingCount, 100)} />
          <div className={styles.error}>{additionalWritingErrMsg}</div>
          {/*참여요건 입력 박스*/}
          <div className={styles.header}>
            <div className={styles.text1}>참여요건</div>
          </div>
          {requirements.map((requirement, index) => (
            <div key={requirement.id} className={styles.requirementcontainer}>
              {/*참여요건 설명 입력*/}
              <div className={styles.requirement}>
                <div className={styles.text2}>참여요건 :</div>
                <input type="text" name="input" value={requirement.title} spellCheck="false" onChange={(e) => handleRequirementTitleChange(
                  e, (value) => {
                    const updatedRequirements = [...requirements];
                    updatedRequirements[index].title = value;
                    setRequirements(updatedRequirements);
                  }, 100)} />
                {requirements.length > 1 && <button className={styles.deletebutton} onClick={() => deleteRequirement(requirement.id)}>X</button>}
              </div>
              <div className={styles.errorInRequirement}>{requirementsDescErrMsg[index]}</div>
              {/*참여요건 제출물 타입*/}
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
              <div className={styles.errorInRequirement}>{requirementsTypeErrMsg[index]}</div>
            </div>
          ))}
          <button className={styles.addbutton} onClick={addRequirement}>+</button>
        </div>
        <button className={styles.postbutton} onClick={handleUpdateButtonClick}>수정하기</button>
      </div>
    </div>
  );
}

export default RecruitUpdate;
