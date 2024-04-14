import React, { useEffect, useState } from 'react';
import styles from "styles/Nav.module.css";
import { useNavigate, useLocation } from 'react-router-dom';
import SubMenu from 'components/header/SubMenu';
import requestFindBoardSubApi from 'hook/requestFindBoardSubApi';

// Navigator 요소중 어떤 것이 선택되었는지 나타내는 상태타입(enum 대용으로 사용)
const navStateEnum = {
  NONE : "NONE",
  BOARD: "BOARD",
  RECURITMENTS: "RECURITMENTS",
  APPLICATIONS: "APPLICATIONS"
}

const Nav = () => {
  const [subMenuData, setSubMenuData] = useState();
  const [isSubMenuVisible, setIsSubMenuVisible] = useState(false);
  const [navState, setNavState] = useState(navStateEnum.BOARD)

  // Nav 항목별 라우팅 설정
  const navigate = useNavigate();
  const handleMenuClick = (menu) => {
    switch (menu) {
      case navStateEnum.BOARD:
        setNavState(navStateEnum.BOARD);
        navigate('/'+subMenuData[0].data[0].id);
        break;
      case navStateEnum.RECURITMENTS:
        setNavState(navStateEnum.RECURITMENTS);
        navigate('/recruitments');
        break;
      case navStateEnum.APPLICATIONS:
        setNavState(navStateEnum.APPLICATIONS);
        navigate('/applications');
        break;
      default:
    }
  };

  // 게시판 데이터 조회 API요청에 대한 결과를 사용가능한 형태으로 변경하는 메서드
  const convertApiResult = (content) => {
    // API요청 결과를 {id, mainMenu, subMenu} 리스트 형태로 변경
    const fullList = content.map((board) => {
      const title = board.boardTitle.trim().split("$")
      return {id:board.boardId, mainMenu: title[0].trim(), subMenu: title[1].trim()};
    })
    // 모든 mainMenu 종류 리스트를 생성
    const mainMenuList = [...new Set(fullList.map(board => board.mainMenu))];
    // mainMunu별로 fullList를 그룹핑
    const result = mainMenuList.map(mainMenu => {
      const groupingData =
       fullList.filter(board => board.mainMenu === mainMenu)
               .map(board => ({id:board.id, subMenu:board.subMenu}));
      return {mainMenu:mainMenu, data:groupingData};
    })
    return result;
  }

  // 게시판 데이터 조회 API 요청
  useEffect(() => {
    const campusId = localStorage.getItem("campusId");
    console.log("게시판 조회 시작");
    requestFindBoardSubApi(campusId)
    .then((res) => {
      console.log("게시판 조회 성공");
      const convertData = convertApiResult(res.data.content);
      sessionStorage.setItem("defaultBoardID", convertData[0].data[0].id);
      setSubMenuData(convertData);
    })
    .catch((err) => {
      console.log("게시판 조회 실패");
      console.log(err);
    })
  }, []);

  // 메뉴의 경로와 현재 경로가 일치하는지 확인하는 함수
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div className={styles.scrollcontainer}>
      <div className={styles.boardmap}>
        <div className={styles.menubar} onMouseLeave={() => setIsSubMenuVisible(false)}>
          <button onClick={() => handleMenuClick(navStateEnum.BOARD)}
                  className={`${styles.button} ${navState===navStateEnum.BOARD ? styles.active : ''}`}
                  onMouseEnter={() => setIsSubMenuVisible(true)}>
            게시판
          </button>
          {isSubMenuVisible && <SubMenu subMenuData={subMenuData}/>}
          <button onClick={() => handleMenuClick(navStateEnum.RECURITMENTS)}
                  className={`styles.button ${navState===navStateEnum.RECURITMENTS ? styles.active : ''}`}>
            작성글 목록
          </button>
          <button onClick={() => handleMenuClick(navStateEnum.APPLICATIONS)}
                  className={`styles.button ${navState===navStateEnum.APPLICATIONS ? styles.active : ''}`}>
            신청 목록
          </button>
        </div>
      </div>
    </div>
  );
};

export default Nav;
