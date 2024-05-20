import { useNavigate } from "react-router-dom";
import styles from "styles/Header.module.css";
import { useDispatch, useSelector } from "react-redux";
import { openLoginModal, openSignupModal } from "store/aboutStore";
import reqeustLogoutApi from "hook/reqeustLogoutApi";
import handleApiReqeustError from "util/handleApiReqeustError";
import { useState } from "react";
import requestDeleteMemberApi from "hook/requestDeleteMemberApi";

const SubMenu = ({closeSubMenu, logoutClickInSubMenu, removeMemberClickInSubMenu}) => {
  return (
    <div className={styles.tooltip} onMouseLeave={closeSubMenu}>
      <div className={styles.tooltipItem} onClick={removeMemberClickInSubMenu}>회원탈퇴</div>
      <div className={styles.tooltipItem} onClick={logoutClickInSubMenu}>로그아웃</div>
    </div>
  )
}

// 헤더 컴포넌트
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 서브메뉴가 열려있는지 여부
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  // 로그인 데이터
  const loginData = useSelector(state => state.loginData);

  // 로그인 클릭 처리
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

  // 회원탈퇴 API 요청
  const requestDeleteMember = async () => {
    console.log("Header : 회원탈퇴 요청 시작")
    try {
      await requestDeleteMemberApi();
      console.log("Header : 회원탈퇴 요청 성공");
      localStorage.clear();
      window.location.href = `${process.env.REACT_APP_FRONT_ADDRESS}/`
    } catch (err) {
      console.log("Header : 회원탈퇴 요청 실패");
      handleApiReqeustError({err:err});
    }
  }

  // 서브메뉴 열기 버튼 처리 메서드
  const openSubMenu = () => {
    setIsSubMenuOpen(true);
  }

  // 서브메뉴 닫기 버튼 처리 메서드
  const closeSubMenu = () => {
    setIsSubMenuOpen(false);
  }

  // 로그아웃 클릭 메서드
  const logoutClickInSubMenu = () => {
    requestLogout();
  }

  // 회원탈퇴 메서드
  const removeMemberClickInSubMenu = () => {
    if (!window.confirm("계정을 삭제하면 되돌릴 수 없습니다. 정말 계정을 삭제하시겠습니까?")) return;
    requestDeleteMember();
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
            <div className={styles.subMenuBtn} onClick={openSubMenu}>
              ⁝{isSubMenuOpen && <SubMenu closeSubMenu={closeSubMenu}
                                          logoutClickInSubMenu={logoutClickInSubMenu}
                                          removeMemberClickInSubMenu={removeMemberClickInSubMenu}
               />}
            </div> 
          }
        </div>
      </div>
    </div>
  );
};

export default Header;
