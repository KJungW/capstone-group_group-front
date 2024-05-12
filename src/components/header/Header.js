import { useNavigate } from "react-router-dom";
import styles from "styles/Header.module.css";
import { useDispatch, useSelector } from "react-redux";
import { openLoginModal, openSignupModal } from "store/aboutStore";
import reqeustLogoutApi from "hook/reqeustLogoutApi";
import handleApiReqeustError from "util/handleApiReqeustError";

// 헤더 컴포넌트
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 로그인 데이터
  const loginData = useSelector(state => state.loginData);

  const onClickLoginBtn = () => {
    dispatch(openLoginModal());
  }

  // 회원가입 모달창 관련
  const onClickSiginupBtn = () => {
    dispatch(openSignupModal());
  }

  // 홈버튼 클릭 처리
  const handleHomeClick = () => {navigate("/");};

  // 로그아웃 API 요청
  const requestLogout = async () => {
    try {
      console.log("Header : 로그아웃 요청 시작");
      await reqeustLogoutApi();
      console.log("Header : 로그아웃 요청 성공");
      localStorage.clear();
      window.location.href = `${process.env.REACT_APP_FRONT_ADDRESS}/`
    }
    catch (err) {
      console.log("Header : 로그아웃 요청 실패");
      handleApiReqeustError({err:err})
    }
  }

  // 로그아웃 클릭 메서드
  const handleLogoutButtonClick = () => {
    requestLogout();
  }

  return (
    <div className={styles.headercontainer}>
      <div className={styles.headercontents}>
        <div className={styles.headerimage}>
          <img
            src="/assets/groupgroup_logo.png"
            alt="groupgroup"
            className={styles.logo}
            onClick={handleHomeClick}
          />
        </div>
        <div className={styles.user}>
          {
            loginData===undefined &&
            <button className={styles.loginbutton} onClick={onClickLoginBtn}>로그인</button>
          }
          {
            loginData===undefined &&
            <button className={styles.signinbutton} onClick={onClickSiginupBtn}>회원가입</button>
          }
          {
            loginData!==undefined && 
            <div className={styles.nickName}>{loginData.nickName} 님</div>
          }
          {
            loginData!==undefined && 
            <button className={styles.loginbutton} onClick={handleLogoutButtonClick}>로그아웃</button> 
          }
        </div>
      </div>
    </div>
  );
};

export default Header;
