import styles from "styles/mail.module.css";
import { useNavigate } from "react-router-dom";

const mail = () => {
  const retry = (e) => {
    console.log("재전송 아직 안만듬");
  };
  return (
    <div className={styles.boardContent}>
      <div className={styles.wrap1}>
        <div className={styles.boardName}>회원가입</div>
      </div>
      <div className={styles.contentsBox}>
        <div className={styles.textBox}>
          인증메일이 전송되었습니다. 메일에 포함된 링크에 접속해 인증을
          완료해주세요!
        </div>
        <div className={styles.textBox}>
          이메일을 전송하는데 1~2분가량 걸릴 수 있습니다. 1~2분이 경과했는데도
          이메일이 오지않는다면 재전송 버튼을 눌러주세요
        </div>
        <button type="button" onClick={retry} className={styles.retryButton}>
          재전송
        </button>
      </div>
    </div>
  );
};

export default mail;
