import requestPostsInBoard from 'hook/requestPostsInBoardApi';
import LoginModalPage from 'page/LoginModalPage';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from "styles/Board.module.css";

const Board = () => {
   // ULR에서 가져온 boardId를 적용하는 코드
   let {boardId} = useParams();
   if(!boardId) {boardId=sessionStorage.getItem("defaultBoardID")}

  // 페이지 요청에 필요한 상태값들
  const [boardIdValue, setBoardIdValue] = useState(boardId);
  const [currentPageNumber, setCurrentPageNumber] = useState(0);
  const [postCountInPage, setPostCountInPage] = useState(10);

  // 페이지 요청 결과 상태값들
  const [boardTitle, setBoardTitle] = useState("게시판");
  const [totalPageSize, setTotalPageSize] = useState(0);
  const [postListInPage, setPostListInPage] = useState([]);
  const [isFirstPage, setIsFirstPage] = useState(true);
  const [isLastPage, setIsLastPage] = useState(true);

   // 로그인모달창 관련
   const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
   const handleLoginModalOpen = (isOpen) => {
     setIsLoginModalOpen(isOpen);
   }

  // 페이지 요청 결과를 적용하는 메서드
  const applyApiResult = (apiResult) => {
    console.log(apiResult);
    setBoardTitle(apiResult.boardTitle.split("$")[0].trim());
    setTotalPageSize(apiResult.totalPages);
    setIsFirstPage(apiResult.firstPage);
    setIsLastPage(apiResult.lastPage);
    setPostListInPage(
      apiResult.contents.map(content => {
        content.createDate = convertDate(content.createDate);
        return content;
      })
    );
  }

  // 페이지 요청 API
  useEffect(() => {
    console.log("게시판 목록요청")
    requestPostsInBoard(boardIdValue, currentPageNumber, postCountInPage)
    .then(res => {
      console.log("게시판 목록요청 성공");
      applyApiResult(res.data)
    })
    .catch(err=>{
      console.log("게시판 목록요청 실패");
      console.log(err);
    })
  }, [boardIdValue, currentPageNumber, postCountInPage]);

  // 페이지번호 버튼 클릭 메서드
  const onclickPageBtn = (i) => {
    setCurrentPageNumber(i);
  } 

  // 이전 페이지 버튼 클릭 메서드
  const onClickBackPageBtn = () => {
    if(!isFirstPage) {
      setCurrentPageNumber(currentPageNumber-1);
    }
  }

  // 다음 페이지 버튼 클릭 메서드
  const onClickNextPageBtn = () => {
    if(!isLastPage) {
      setCurrentPageNumber(currentPageNumber+1);
    }
  }

  //글쓰기 버튼 클릭 메서드
  const navigate = useNavigate();
  const handleWriteButtonClick = () => {
    if(localStorage.getItem("jwtToken"))
      navigate(`/recruit/${boardId}`);
    else 
      handleLoginModalOpen(true);
  };

  // 작성일자 데이터를 적절히 변형하는 메서드
  const convertDate = (date) => {
    const currentDate = new Date();
    const targetDate = new Date(date);
    const isToday = targetDate.getDate() === currentDate.getDate() &&
                    targetDate.getMonth() === currentDate.getMonth() &&
                    targetDate.getFullYear() === currentDate.getFullYear();
    return isToday
    ? `${targetDate.getHours()}:${targetDate.getMinutes()}` 
    : `${targetDate.getFullYear()}-${targetDate.getMonth()+1}-${targetDate.getDate()}`;
  }

  return (
      <div className={styles.scrollcontainer}>
        <div className={styles.boardmap}>
          <div className={styles.boardcontent}>
            <div className={styles.wrap1}>
              <div className={styles.boardname}>
                {boardTitle}
              </div>
              <button className={styles.writebutton} onClick={handleWriteButtonClick}>글쓰기</button>
            </div>
            <div className={styles.contentsbox}>
              <table className={styles.postsTable}>
                <tbody>
                {postListInPage.map((post) => (
                    <tr className={styles.postsTableRow} key={post.id}>
                      <td>{post.title}</td>
                      <td className={styles.narrowDateColumn}>{post.createDate}</td>
                    </tr>
                ))}
                </tbody>
              </table>
            </div>
            <div className={styles.navigation}>
              <div className={styles.narrow}>
                <a onClick={onClickBackPageBtn}>&lt;</a>
              </div>
              <div className={styles.page}>
                {[... new Array(totalPageSize)].map((_, i) => <a key={i} onClick={() => onclickPageBtn(i)}>{i+1}</a>)}
              </div>
              <div onClick={onClickNextPageBtn} className={styles.narrow}>
                <a>&gt;</a>
              </div>
            </div>
          </div>
        </div>
        <LoginModalPage isOpen={isLoginModalOpen} handleLoginModalOpen={handleLoginModalOpen}/>
      </div>
  );
};

export default Board;
