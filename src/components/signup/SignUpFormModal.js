import requestFindNickNameAvailabilityApi from "hook/requestFindNickNameAvailabilityApi";
import reqeustSignUpApi from "hook/requestSignUpApi";
import { useState } from "react";
import styles from "styles/SignUpFormModal.module.css";
import handleApiReqeustError from "util/handleApiReqeustError";

// 검증을 위한 정규표현식
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;

const SignUpFormModal = ({moveNextModal}) => {
  // input 태그 입력값
  const [inputEmail, setInputEmail] = useState("");
  const [inputNickName, setInputNickName] = useState("");
  const [inputPw, setInputPw] = useState("");
  const [inputPwCheck, setInputPwCheck] = useState("");
  const [nickNameAvailable, setNickNameAvailable] = useState(false);

  // 입력값에 따른 검증 에러메세지
  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const [nickNameErrorMsg, setNickNameErrorMsg] = useState("");
  const [pwErrorMsg, setPwErrorMsg] = useState("");
  const [pwCheckErrorMsg, setPwCheckErrorMsg] = useState("");

  // input 태그 입력 처리메소드
  const onChangeInputEmail = (e) => {setInputEmail(e.target.value);};
  const onChangeInputNickName = (e) => {
    setInputNickName(e.target.value);
    setNickNameAvailable(false);
  };
  const onChangeInputPw = (e) => {setInputPw(e.target.value);}
  const onChangeInputPwCheck = (e) => {setInputPwCheck(e.target.value);}


  // 입력값 검증 메서드
  const validateInput = () => {
    // 이메일 검증
    let emailError;
    if(!inputEmail || inputEmail.trim() === "") {
      emailError="이메일을 입력해주세요";
    } else if (!emailRegex.test(inputEmail)) {
      emailError="유효한 이메일을 입력해주세요";
    } else {
      emailError="";
    }

    // 닉네임 검증
    let nickNameError;
    if(!nickNameAvailable) {
      nickNameError="닉네임이 사용가능한지 확인해주세요";
    }
    else if(!inputNickName || inputNickName.trim() === "") {
      nickNameError="닉네임을 입력해주세요";
    } else {
      nickNameError="";
    }

    // 비밀번호 검증
    let pwError
    if(!inputPw || inputPw.trim() === "") {
      pwError="비밀번호를 입력해주세요";
    } else if (!passwordRegex.test(inputPw)){
      pwError="비밀번호는 8자 이상 15자 이내의 영문, 숫자, 특수문자를 포함해야 합니다.";
    } else {
      pwError="";
    }

    // 비밀번호 체크 검증
    let pwCheckError
    if(!inputPwCheck || inputPwCheck.trim() === "") {
      pwCheckError="비밀번호를 한번더 입력해주세요";
    } else if (inputPwCheck!==inputPw){
      pwCheckError="비밀번호가 일치하지 않습니다.";
    } else {
      pwCheckError="";
    }

    // 검증 결과처리
    return {
      isValid : (emailError==="" && nickNameError==="" && pwError==="" && pwCheckError===""),
      emailErrorMsg : emailError,
      nickNameErrorMsg : nickNameError,
      pwErrorMsg : pwError,
      pwCheckErrorMsg : pwCheckError
    }
  }

  // 회원가입 수행
  const signUp = () => {
    console.log("회원가입 수행");
    reqeustSignUpApi(inputEmail, inputNickName, inputPw);
    moveNextModal(inputEmail, inputNickName, inputPw);
  }

  // 넥네임 확인 수행
  const checkNickNameAvailable = async () => {
    if(!inputNickName) {
      alert("닉네임을 먼저 입력해주세요");
      return;
    }

    try {
      console.log("SignUpFormModal : 닉네임 이용가능 여부 조회 시작");
      await requestFindNickNameAvailabilityApi(inputNickName);
      console.log("SignUpFormModal : 닉네임 이용가능 여부 조회 성공");
      alert("이용가능한 닉네임입니다.");
      setNickNameAvailable(true);
    } catch (err) {
      console.log("SignUpFormModal : 닉네임 이용가능 여부 조회 실패");
      handleApiReqeustError({
        err:err,
        handleBadInput: () => {
          alert("이미 사용되고 있는 닉네임입니다.")
        }
      })
    }
  }

  // 회원가입 버튼클릭 메서드
  const clickSingUpBtn = () => {
    let validateResult = validateInput()
    if(validateResult.isValid) {
      signUp();
    } 
    setEmailErrorMsg(validateResult.emailErrorMsg);
    setNickNameErrorMsg(validateResult.nickNameErrorMsg);
    setPwErrorMsg(validateResult.pwErrorMsg);
    setPwCheckErrorMsg(validateResult.pwCheckErrorMsg);
  }

  const clickNickNameCheckBtn = () => {
    checkNickNameAvailable();
  }

  return (
    <div  className={styles.signUpModalWrapper}>
      <div className={styles.header}>
        <div>회원가입</div>
      </div>
      <div className={styles.body}>
        <div className={styles.inputBox}>
          <div className={styles.labelBox}><span>이메일</span></div>
          <input type="text" className={styles.textInput} onChange={onChangeInputEmail} value={inputEmail} maxLength={40}/>
          <div className={styles.errorMsg}>{emailErrorMsg}</div>
        </div>
        <div className={styles.inputBox}>
          <div className={styles.labelBox}><span>사용할 닉네임</span></div>
          <div className={styles.nickNameInputBox}>
            <input type="text" className={styles.nickNameInput} onChange={onChangeInputNickName} value={inputNickName} maxLength={20}/>
            <button className={styles.nickNameCheckBtn} onClick={clickNickNameCheckBtn} disabled={nickNameAvailable}>닉네임 확인</button>
          </div>
          <div className={styles.errorMsg}>{nickNameErrorMsg}</div>
        </div>
        <div className={styles.inputBox}>
          <div className={styles.labelBox}><span>비밀번호</span></div>
          <input type="password" className={styles.textInput} onChange={onChangeInputPw} value={inputPw} maxLength={15}/>
          <div className={styles.errorMsg}>{pwErrorMsg}</div>
        </div>
        <div className={styles.inputBox}>
          <div className={styles.labelBox}><span>비밀번호 확인</span></div>
          <input type="password" className={styles.textInput} onChange={onChangeInputPwCheck} value={inputPwCheck} maxLength={15}/>
          <div className={styles.errorMsg}>{pwCheckErrorMsg}</div>
        </div>
        <button className={styles.signUpButton} onClick={clickSingUpBtn}>회원가입</button>
      </div>
    </div>
  );
};

export default SignUpFormModal;