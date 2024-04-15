import requestFindBoardSubApi from 'hook/requestFindBoardSubApi';
import requestSavePostApi from 'hook/requestSavePostApi';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from "styles/Recruit.module.css";
import convertFindBoardSubApiResult from 'util/convertFindBoardSubApiResult';

function MenuComponentInSelect({mainMenuData}) {
  return (
    <>
      <option className={styles.mainMenuInSelect} value="" disabled>{mainMenuData.mainMenu}</option>
      {mainMenuData.data.map((subMenuData, subMenuIx) => 
        {return (<option key={subMenuIx} className={styles.subMenuInSelect} value={subMenuData.id}>{`${mainMenuData.mainMenu} - ${subMenuData.subMenu}`}</option>);}
      )}
    </>
  );
}

function Recruit() {
  // 네비게이터
  const navigate = useNavigate();

  // ULR에서 가져온 boardId를 적용하는 코드
   let {boardId} = useParams();
   if(!boardId) {boardId=sessionStorage.getItem("defaultBoardID")}

  // 폼데이터 입력값 상태
  const [selectedBoardId, setSelectedBoardId] = useState(boardId);
  const [postTitle, setPostTitle] = useState('');
  const [activityDetail, setActivityDetail] = useState('');
  const [passionSize, setPassionSize] = useState('');
  const [additionalWriting, setAdditionalWriting] = useState('');
  const [openChatUrl, setOpenChatUrl] = useState('');
  const [requirements, setRequirements] = useState([{ id: 1, title: '', resultType: '' }]);

  // 검증에 따른 에러메세지
  const [boardIdErrMsg, setBoardIdErrMsg] = useState("");
  const [postTitleErrMsg, setPostTitleErrMsg] = useState("");
  const [activityDetailErrMsg, setActivityDetailErrMsg] = useState("");
  const [passionSizeErrMsg, setPassionSizeErrMsg] = useState("");
  const [additionalWritingErrMsg, setAdditionalWritingErrMsg] = useState("");
  const [openChatUrlErrMsg, setOpenChatUrlErrMsg] = useState("");
  const [requirementsDescErrMsg, setRequirementsDescErrMsg] = useState([""]);
  const [requirementsTypeErrMsg, setrequirementsTypeErrMsg] = useState([""]);

  // 모집글을 작성할 수 있는 게시판 리스트
  const [boardList, setBoardList] = useState([]);

  // 모집글 등록버튼 활성화여부
  const [saveBtnActive, setSaveBtnActive] = useState(true);

  // 텍스트 입력폼의 입력처리 메서드
  const handleInputChange = (event, setState, maxLength) => {
    const { value } = event.target;
    if (value.length <= maxLength) {
      setState(value);
    }
  };

  // 게시판 입력폼 처리 메서드
  const handleBoardChange = (event) => {
    setSelectedBoardId(event.target.value);
    setBoardIdErrMsg("");
  };

  // 추가요건 추가/제거 메서드
  const addRequirement = () => {
    const newRequirement = { id: requirements.length + 1, title: '', resultType: '' };
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

    // 게시판 ID 검증
    let boardIdError;
    if(!selectedBoardId || selectedBoardId.trim() === "") {
      boardIdError="게시판을 선택해주세요";
    } else {
      boardIdError="";
    }

    // 제목검증
    let postTitleError;
    if(!postTitle || postTitle.trim() === "") {
      postTitleError="모집글 제목을 입력해주세요";
    } else {
      postTitleError="";
    }

    // 활동내용 검증
    let activityDetailError;
    if(!activityDetail || activityDetail.trim() === "") {
      activityDetailError="활동내용을 입력해주세요";
    } else {
      activityDetailError="";
    }

    // 팀성향 검증
    let passionSizeError
    if(!passionSize || passionSize.trim() === "") {
      passionSizeError="팀성향을 선택해주세요";
    } else {
      passionSizeError="";
    }

    // 오픈채팅방 주소 검증
    let openChatUrlError
    if(!openChatUrl || openChatUrl.trim() === "") {
      openChatUrlError="오픈채팅방 주소를 입력해주세요";
    } else {
      openChatUrlError="";
    }

    // 참여요건 검증
    let requirementsDescError = [... new Array(requirements.length)]
    let requirementsTypeError = [... new Array(requirements.length)]
    requirements.map((item, ix) => {
      if(!item.title || item.title.trim() === "")
        requirementsDescError[ix] = "참여요건을 입력해주세요";
      if(!item.resultType || item.resultType.trim() === "")
        requirementsTypeError[ix] = "참여요건에 대한 제출물 타입을 입력해주세요";
    })

    // 검증 결과처리
    return {
      isValid : (boardIdError==="" && postTitleError==="" && activityDetailError==="" && passionSizeError==="" && openChatUrlError==""),
      boardIdError : boardIdError,
      postTitleError : postTitleError,
      activityDetailError : activityDetailError,
      passionSizeError : passionSizeError,
      openChatUrlError : openChatUrlError,
      requirementsDescError : requirementsDescError,
      requirementsTypeError : requirementsTypeError
    }
  }

  // 게시판 선택 버튼의 서브메뉴를 위한 게시판 조회 요청
  useEffect(() => {
    const campusId = localStorage.getItem("campusId");
    console.log("Recurit : 게시판 조회 시작");
    requestFindBoardSubApi(campusId)
    .then((res) => {
      console.log("Recurit : 게시판 조회 성공");
      setBoardList(convertFindBoardSubApiResult(res.data.content));
    })
    .catch((err) => {
      console.log("Recurit : 게시판 조회 실패");
      console.log(err);
      alert("잠시후에 다시 시도해주세요")
      navigate(`/${selectedBoardId}`);
    })
  }, []);

  // 모집글 저장 요청
  const savePost = () => {
    console.log("모집글 저장 요청 시작")
    setSaveBtnActive(false);
    requestSavePostApi({
      boardId : selectedBoardId,
      writerId : localStorage.getItem("memberId"),
      title : postTitle,
      activityDetail : activityDetail,
      passionSize : passionSize,
      additionalWriting : additionalWriting,
      openChatUrl : openChatUrl,
      requirementList : requirements.map(item=>({ title: item.title, resultType: item.resultType })),
    })
    .then(res => {
      console.log("모집글 저장 요청 성공")
      console.log("Recurit : 게시판 조회 성공");
      navigate(`/${selectedBoardId}`);
    })
    .catch(err => {
      console.log("모집글 저장 요청 실패")
      console.log(err);
      alert("잠시후에 다시 시도해주세요")
    })
    .finally(() => {
      setSaveBtnActive(true);
    })
  }
  

  // 회원가입 버튼클릭 메서드
  const handlePostButtonClick = () => {
    let validateResult = validateInput()
    if(validateResult.isValid) {
      savePost();
    } 
    setBoardIdErrMsg(validateResult.boardIdError);
    setPostTitleErrMsg(validateResult.postTitleError);
    setActivityDetailErrMsg(validateResult.activityDetailError);
    setPassionSizeErrMsg(validateResult.passionSizeError);
    setOpenChatUrlErrMsg(validateResult.requirementsDescError);
    setRequirementsDescErrMsg(validateResult.requirementsDescError);
    setrequirementsTypeErrMsg(validateResult.requirementsTypeError);
  }
  
  return (
    <div className={styles.scrollcontainer}>
      <div className={styles.recruitcontent}>
        <div className={styles.wrap1}>
          <div className={styles.boardname}>
            모집글 작성
          </div>
          <select className={`${styles.selectbutton} ${boardIdErrMsg ? styles.errorSelectbutton : ''}`} value={selectedBoardId} onChange={handleBoardChange}>
            {boardList.map((mainMenuData, mainMenuIx) => (<MenuComponentInSelect key={mainMenuIx} mainMenuData={mainMenuData}/>))}
          </select>
        </div>
        <div className={styles.rcontentsbox}>
          {/*모집글 제목 입력칸*/}
          <div className={styles.text1}>제목 :</div>
          <input type="text" name="input" value={postTitle} onChange={(e) => handleInputChange(e, setPostTitle, 30)} />
          <div className={styles.error}>{postTitleErrMsg}</div>
          {/*활동내용 입력칸*/}
          <div className={styles.text1}>활동내용 :</div>
          <textarea name="activity" value={activityDetail} onChange={(e) => handleInputChange(e, setActivityDetail, 100)} />
          <div className={styles.error}>{activityDetailErrMsg}</div>
          {/*팀성향 입력칸 radio*/}
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
          <div className={styles.error}>{passionSizeErrMsg}</div>
          {/*오픈채팅방 주소 입력값*/}
          <div className={styles.text1}>오픈채팅방 주소 :</div>
          <input type="text" name="input" value={openChatUrl} onChange={(e) => handleInputChange(e, setOpenChatUrl, 100)} />
          <div className={styles.error}>{openChatUrlErrMsg}</div>
          {/*추가로 하고싶은말 입력값*/}
          <div className={styles.text1}>하고싶은 말 :</div>
          <textarea name="additionalComments" value={additionalWriting} onChange={(e) => handleInputChange(e, setAdditionalWriting, 100)} />
          <div className={styles.error}>{additionalWritingErrMsg}</div>
          {/*참여요건 입력 박스*/}
          <div className={styles.text1}>참여요건</div>
          {requirements.map((requirement, index) => (
            <div key={requirement.id} className={styles.requirementcontainer}>
              {/*참여요건 설명 입력*/}
              <div className={styles.requirement}>
                <div className={styles.text2}>참여요건 :</div>
                <input type="text" name="input" value={requirement.title} onChange={(e) => handleInputChange(
                  e, (value) => {
                    const updatedRequirements = [...requirements];
                    updatedRequirements[index].title = value;
                    setRequirements(updatedRequirements);
                  }, 100)} />
                {index > 0 && <button className={styles.deletebutton} onClick={() => deleteRequirement(requirement.id)}>X</button>}
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
        <button className={styles.postbutton} onClick={handlePostButtonClick} disabled={!saveBtnActive}>등록하기</button>
      </div>
    </div>
  );
}

export default Recruit;