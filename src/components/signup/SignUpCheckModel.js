import reqeustSignUpApi from "hook/requestSignUpApi";
import { useState } from "react";
import styles from "styles/SignUpCheckModel.module.css";
import handleApiReqeustError from "util/handleApiReqeustError";

const SignUpCheckModel = ({ formData }) => {
  const [isSendingEmail, setIsSendingEmail] = useState(false)

  const onClickSendBtn = () =>{
    console.log("회원가입 요청 재전송");
    reqeustSignUpApi(formData.email, formData.nickName, formData.pw)
    .then(res => {
      console.log("회원가입 요청 재전송 성공");
    })
    .catch(err => {
      console.log("회원가입 요청 재전송 실패");
      handleApiReqeustError({err:err})
    })
    .finally(() => {
      setIsSendingEmail(false);
    })
    setIsSendingEmail(true);
  }

  return (
    <div  className={styles.signupModalWrapper}>
      <div className={styles.header}>
        <div>회원가입</div>
      </div>
      <div className={styles.body}>
          <div className={styles.guideText}>
            인증메일이 전송되었습니다.<br/>
            메일에 포함된 링크에 접속해 인증을 완료해주세요!
          </div>
          <div  className={styles.guideText}>
              이메일을 전송하는데 1~2분가량 걸릴 수 있습니다.<br/>
              이메일이 오지않는다면 재전송 버튼을 눌러주세요.
          </div>
        <button className={styles.sendBtn} onClick={onClickSendBtn} disabled={isSendingEmail}>
            {isSendingEmail ? "진행중" : "재전송"}
        </button>
      </div>
    </div>
  )
};

export default SignUpCheckModel;
