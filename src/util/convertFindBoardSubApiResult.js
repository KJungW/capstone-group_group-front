// requestFindBoardSubApi() 메서드의 결과를 정리하는 메서드
const convertFindBoardSubApiResult = (content) => {
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

export default convertFindBoardSubApiResult;
