import requestPostsInBoard from 'hook/requestPostsInBoardApi';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { openLoginModal } from 'store/aboutStore';
import styles from "styles/Board.module.css";
import convertDate from 'util/convertDate';
import handleApiReqeustError from 'util/handleApiReqeustError';

const Board = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 페이지 요청에 필요한 상태값들
  const boardId = useSelector(state => state.currentBoardId);
  const [currentPageNumber, setCurrentPageNumber] = useState(0);
  const [postCountInPage, setPostCountInPage] = useState(10);

  // 페이지 요청 결과 상태값들
  const [boardTitle, setBoardTitle] = useState("게시판");
  const [totalPageSize, setTotalPageSize] = useState(0);
  const [postListInPage, setPostListInPage] = useState([]);
  const [isFirstPage, setIsFirstPage] = useState(true);
  const [isLastPage, setIsLastPage] = useState(true);

  // 페이지 요청 결과를 적용하는 메서드
  const applyApiResult = (apiResult) => {
    setBoardTitle(apiResult.boardTitle.replace("$", " - "));
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
    if(!boardId) return;
    console.log("Board : 모집글 목록요청")
    requestPostsInBoard(boardId, currentPageNumber, postCountInPage)
    .then(res => {
      console.log("Board : 모집글 목록요청 성공");
      applyApiResult(res.data)
    })
    .catch(err=>{
      console.log("Board : 모집글 목록요청 실패");
      handleApiReqeustError({err:err});
    })
  }, [boardId, currentPageNumber, postCountInPage]);

  // 모집글 클릭 메서드
  const onClickRecruit = (postId) => {
    navigate(`/recruitdetail/${postId}`);
  }

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
  const handleWriteButtonClick = () => {
    if(localStorage.getItem("jwtToken"))
      navigate(`/recruit/${boardId}`);
    else 
      dispatch(openLoginModal());
  };

  if(!boardId || !postListInPage || postListInPage.length==0) {
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
                <tr><td>
                  <div className={styles.blankTableContent}>모집글이 존재하지 않습니다.</div>  
                </td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    )
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
              <div className={styles.postsTable}>
                <div>
                {postListInPage.map((post) => (
                    <div className={styles.postsTableRow} key={post.id} onClick={()=>{onClickRecruit(post.id)}}>
                      <div className={styles.titleInRow}>{post.title}</div>
                      <div className={styles.nicknameInRow}>{post.writerNickName}</div>
                      <div className={styles.dateInRow}>{post.createDate}</div>
                    </div>
                ))}
                </div>
              </div>
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
      </div>
  );
};

export default Board;
