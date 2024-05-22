import requestSearchInBoardApi from "hook/reqeustSearchInBoardApi";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import convertDate from "util/convertDate";
import handleApiReqeustError from "util/handleApiReqeustError";
import SearchBox from "./SearchBox";
import styles from "styles/SearchResultBoard.module.css";


const SearchResultBoard = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // 페이지 요청에 필요한 상태값들
    const boardId = useSelector(state => state.currentBoardId);
    const postCountInPage = 10;
    const [searchString, setSearchString] = useState(location.state.searchString);
  
    // 페이지 요청 결과 상태값들
    const [boardTitle, setBoardTitle] = useState("검색결과");
    const [totalPageSize, setTotalPageSize] = useState(0);
    const [postListInPage, setPostListInPage] = useState([]);
    const [currentPageNumber, setCurrentPageNumber] = useState(0);
    const [isFirstPage, setIsFirstPage] = useState(true);
    const [isLastPage, setIsLastPage] = useState(true);

    useEffect(() => {
        if(!boardId) return;
        if(!searchString || searchString.trim() === "") return;
        requestSearch();
    }, [boardId, currentPageNumber, searchString]);

    // 검색요청 API
    const requestSearch = async () =>{
        try {
            console.log("SearchResultBoard : 검색 요청")
            const res = await requestSearchInBoardApi(currentPageNumber, postCountInPage, boardId, searchString);
            console.log("SearchResultBoard : 검색 요청 성공");
            applyApiResult(res.data);
        }
        catch(err){
            console.log("SearchResultBoard : 검색 요청 실패");
            handleApiReqeustError({err:err});
        }
    }

    // 검색 요청 결과를 적용하는 메서드
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

    const onClickSearchBtn = (inputSearchString) => {
        setSearchString(inputSearchString);
    }
  
    if(!boardId || !postListInPage || postListInPage.length==0) {
      return (
        <>
          <SearchBox initSearchString={searchString} boardName={boardTitle} onClickSearchBtn={onClickSearchBtn}/>
          <div className={styles.scrollcontainer}>
          <div className={styles.boardmap}>
            <div className={styles.boardcontent}>
              <div className={styles.wrap1}>
                <div className={styles.boardname}>검색 결과</div>
              </div>
              <div className={styles.contentsbox}>
                <table className={styles.postsTable}>
                  <tbody>
                    <tr><td>
                        <div className={styles.blankTableContent}>
                            <div className={styles.searchString}>{`"${searchString}"`}</div>
                            <div className={styles.noneSearchResultText}>검색어에 해당하는 모집글이 존재하지 않습니다.</div>
                        </div>  
                    </td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </>
      )
    }
  
    return (
      <>
        <SearchBox initSearchString={searchString} boardName={boardTitle} onClickSearchBtn={onClickSearchBtn}/>
        <div className={styles.scrollcontainer}>
          <div className={styles.boardmap}>
            <div className={styles.boardcontent}>
              <div className={styles.wrap1}>
                <div className={styles.boardname}>검색 결과</div>
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
                  {
                    [... new Array(totalPageSize)].map((_, i) => 
                    <a className={`${ i==currentPageNumber?styles.current_page:''}`} key={i} onClick={() => onclickPageBtn(i)}>{i+1}</a>
                  )}
                </div>
                <div onClick={onClickNextPageBtn} className={styles.narrow}>
                  <a>&gt;</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}

export default SearchResultBoard;