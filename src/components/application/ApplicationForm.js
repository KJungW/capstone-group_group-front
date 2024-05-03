import reqeustFindPostDetail from "hook/requestFindPostDetailApi";
import requestSaveApplicationApi from "hook/requestSaveApplicationApi";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styles from "styles/ApplicationForm.module.css";

// 텍스트 타입의 참여요건폼 
const TextRequireForm = ({ix, title, setInput, error}) => {
  const [textInput, setTextInput] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // 신청요청 전에 검증과정에서 발생한 에러메세지 출력
  useEffect(() => {
    setErrorMsg(error);
  }, [error])

  return (
    <div className={styles.requirementBox}>
      <div className={styles.requirementTitle}>{title}</div>
      <div className={styles.requirementTextBox}>
        <input 
          type="text" maxLength={100}
          onChange={(e) => setTextInput(e.target.value)}
          onBlur={(e) => setInput(ix, textInput)}
        ></input>
      </div>
      <div className={styles.error}>{errorMsg}</div>
    </div>
  )
}

// 파일 타입의 참여요건폼 
const FileRequireForm = ({ix, title, setInput, error}) => {
  const [inputFileName, setinputFileName] = useState("");
  const [errorMsg, setErrorMsg] = useState(error);

  // 파일업로드 처리 메서드
  const handleFileChange = (e) => {   
    // 선택된 파일이 없을 경우 처리
    if(e.target.files.length <= 0) return;

    // 확장자가 맞지않을 경우 처리
    const inputFile = e.target.files[0];
    if(!inputFile.type.includes("jpg") && !inputFile.type.includes("jpeg") &&
       !inputFile.type.includes("png") && !inputFile.type.includes("pdf")) {
        setErrorMsg("파일의 확장자는 (png, jpg, jpeg, pdf)이어야 합니다.")
        return;
    }

    // 파일 사이즈가 3MB이상일 경우 처리
    if(inputFile.size > 3 * 1024 * 1024) {
      setErrorMsg("파일의 크기가 3MB이하이어야 합니다.")
      return;
    }

    // 파일업로드 수행
    setErrorMsg("");
    setinputFileName(inputFile.name);
    setInput(ix, inputFile);
  };

  // 신청요청 전에 검증과정에서 발생한 에러메세지 출력
  useEffect(() => {
    setErrorMsg(error);
  }, [error])

  return (
    <div className={styles.requirementBox}>
      <div className={styles.requirementTitle}>{title}</div>
      <div className={styles.requirementFileBox}>
        <input className={styles.fileUploadInput} id={`upload_${ix}`} type="file" onChange={handleFileChange}></input>
        <label htmlFor={`upload_${ix}`}>
          <div className={styles.fileUploadBtn}>파일 업로드</div>
        </label>
        <div className={styles.fileUpdateDesc}>{inputFileName}</div>
      </div>
      <div className={styles.error}>{errorMsg}</div>
    </div>
  )
}

const ApplicationForm = () => {
  const {postId} = useParams();
  const navigate = useNavigate();

  const loginData = useSelector(state => state.loginData);
  const [postIdValue, setPostIdValue] = useState(postId);
  const [requirementList, setRequirementList] = useState();
  const [inputList, setInputList] = useState([]);
  const [errorList, setErrorList] = useState([]);

  const [appBtnIsActive, setAppBtnIsActive] = useState([]);

  // 참여요건 리스트 조회 API 메서드
  const requestRequirementList = async () => {
    try {
      console.log("ApplicationForm : 모집글 세부내용 조회 시작")
      const postDetail = (await reqeustFindPostDetail(postIdValue)).data
      if(postDetail.writerId === loginData.memberId) {
        alert("자신이 작성한 모집글에는 신청할 수 없습니다.");
        navigate(-1);
      }
      console.log("ApplicationForm : 모집글 세부내용 조회 성공")
      setRequirementList(postDetail.requirementList)
      setInputList(new Array(postDetail.requirementList.length))
      setErrorList((new Array(postDetail.requirementList.length)).map(()=>""))
    } 
    catch (err) {
      console.log("ApplicationForm : 모집글 세부내용 조회 실패")
      console.log(err)
      alert("접속이 원할하지 않습니다. 잠시후 다시 시작해주세요")
    }
  }

  // 신청하기 API 메서드
  const requestSaveApplication =  () => {

    // API 요청에 필요한 데이터 준비
    const requirementResults = requirementList.map((requirement, ix) => ({
      requirementId : requirement.id,
      type : requirement.resultType,
      content : (requirement.resultType==="TEXT")?inputList[ix]:inputList[ix].name
    }))
    let inputfiles = []
    requirementList.map((requirement, ix) => {
      if(requirement.resultType === "FILE")
        inputfiles.push(inputList[ix]);
    })

    // Api요청 보내기
    setAppBtnIsActive(false);
    console.log("ApplicationForm : 신청 요청 시작");
    requestSaveApplicationApi(postIdValue, loginData.memberId, requirementResults, inputfiles)
    .then(res => {
      console.log("ApplicationForm : 신청 요청 성공");
      navigate("/applications");
      setAppBtnIsActive(true);
    })
    .catch(err => {
      console.log("ApplicationForm : 신청 요청 실패");
      console.log(err);
      if (err.response && err.response.data.code === 'UNAUTHORIZED') {
        alert("로그인 유효기간이 만료되었거나 로그인을 하지않았습니다. 로그인을 먼저 진행해주세요!");
        navigate(-1);
        setAppBtnIsActive(true);
      }
      else if (err.response && err.response.data.code === 'BAD_INPUT') {
        alert("잘못된 신청입니다.");
        navigate(-1);
        setAppBtnIsActive(true);
      }
      else {
        alert("접속이 원할하지 않습니다. 잠시후 다시 접속해주세요");
        setAppBtnIsActive(true);
      }
    })

  }

  // 입력값을 inputList상태에 등록하는 메서드
  const setInput = (ix, content) => {
    let newInputList = [...inputList];
    newInputList[ix] = content;
    setInputList(newInputList);
  }

  // inputList를 검증하는 메서드
  const validateInputList = () => {
    let newErrorList = [...errorList]

    requirementList.map((requirement, ix) => {
      // 텍스트 제출물을 요구하는 참여요건일 경우 검증
      if(requirement.resultType === "TEXT") {
        // 입력값이 비어있는지 체크
        if(!inputList[ix] || inputList[ix].trim() === "")
          newErrorList[ix] = "신청요건에 대한 답을 작성해주세요";
        else 
        newErrorList[ix] = "";
      } 
      // 파일 제출물을 요구하는 참여요건일 경우 검증
      else {
        // 입력값이 비어있는지 체크
        if(!inputList[ix])
          newErrorList[ix] = "신청요건에 대한 답을 작성해주세요";
        else 
          newErrorList[ix] = "";
      }
    })
    setErrorList(newErrorList);
    return (newErrorList.filter(err => (err !== "")).length === 0)
  }

  // 신청하기 버튼 클릭 메서드
  const onClickApplicationBtn = () => {
    if(validateInputList())
      requestSaveApplication();
  }

  // 참여요건 리스트 조회 API 수행
  useEffect(() => {
    requestRequirementList();
  }, [])


  // 로딩중일 경우
  if(!requirementList) {
    return <></>;
  }

  return (
    <div className={styles.scrollcontainer}>
      <div className={styles.recruitcontent}>
        <div className={styles.wrap1}>
          <div className={styles.boardname}>신청하기</div>
        </div>
        <div className={styles.rcontentsbox}>
          {
            requirementList.map((requirement, ix) => {
              if(requirement.resultType === "TEXT")
                return <TextRequireForm ix={ix} title={requirement.title} setInput={setInput} error={errorList[ix]} key={ix} />
              else {
                return <FileRequireForm ix={ix} title={requirement.title} setInput={setInput} error={errorList[ix]} key={ix} />
              }
            })
          }
        </div>
        <button className={styles.applicationBtn} onClick={onClickApplicationBtn} disabled={!appBtnIsActive}>신청하기</button>
      </div>
    </div>
  );
};

export default ApplicationForm;
