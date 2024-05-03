import requestLoginApi from "hook/requestLoginApi";
import { useState } from "react";
import styles from "styles/LoginFormModal.module.css";


// 검증을 위한 정규표현식
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;


const LoginFormModal = ({completeLogin}) => {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPw, setInputPw] = useState("");
  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const [pwErrorMsg, setPwErrorMsg] = useState("");

  // input태그 처리메서드
  const onChangeInputEmail = (e) => {setInputEmail(e.target.value);};
  const onChangeInputPw = (e) => {setInputPw(e.target.value);}

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

    // 비밀번호 검증
    let pwError
    if(!inputPw || inputPw.trim() === "") {
      pwError="비밀번호를 입력해주세요";
    } else if (!passwordRegex.test(inputPw)){
      pwError="비밀번호는 8자 이상 15자 이내의 영문, 숫자, 특수문자를 포함해야 합니다.";
    } else {
      pwError="";
    }

    // 검증 결과처리
    return {
      isValid : (emailError==="" && pwError===""),
      emailErrorMsg : emailError,
      pwErrorMsg : pwError
    }
  }

  // 로그인 수행 메서드
  const login = () => {
    console.log("로그인 요청")
    requestLoginApi(inputEmail, inputPw)
      .then(res =>  {
        console.log("로그인 성공");
        localStorage.setItem("jwtToken", res.data.jwtToken);
        completeLogin();
      })
      .catch(error => {
        console.log("로그인 실패")
        console.log(error)
        if(error.response && error.response.data.code === 'BAD_INPUT') {
          alert("이메일과 비밀번호가 맞지않습니다.");
        }
        else {
          alert("접속이 원할하지 않습니다. 잠시후 다시 접속해주세요");
        }
      });
  }

  // 로그인 버튼클릭 메서드
  const clickLoginBtn = () => {
    let validateResult = validateInput()
    if(validateResult.isValid) {
      login();
    } 
    setEmailErrorMsg(validateResult.emailErrorMsg);
    setPwErrorMsg(validateResult.pwErrorMsg);
  }

  return (
    <div  className={styles.loginModalWrapper}>
      <div className={styles.header}>
        <div>로그인</div>
      </div>
      <div className={styles.body}>
        <div className={styles.inputBox}>
          <div className={styles.labelBox}><span>이메일</span></div>
          <input type="text" className={styles.textInput} onChange={onChangeInputEmail} value={inputEmail} maxLength={40}/>
          <div className={styles.errorMsg}>{emailErrorMsg}</div>
        </div>
        <div className={styles.inputBox}>
          <div className={styles.labelBox}><span>비밀번호</span></div>
          <input type="password" className={styles.textInput} onChange={onChangeInputPw} value={inputPw} maxLength={15}/>
          <div className={styles.errorMsg}>{pwErrorMsg}</div>
        </div>
        <button className={styles.loginButton} onClick={clickLoginBtn}>로그인</button>
      </div>
    </div>
  )
};

export default LoginFormModal;
