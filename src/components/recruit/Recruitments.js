import requestChangeApplicationStateApi from 'hook/requestChangeApplicationStateApi';
import requestDeletePostApi from 'hook/requestDeletePostApi';
import requestFindPostListApi from 'hook/requestFindPostListApi';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "styles/Recruitments.module.css";

const ApplicationRow = ({postId, applicationData, changeAppState}) => {
  const navigate = useNavigate();
  const [isRequest, setIsRequest] = useState(false);

  // 신청 상태변경 요청 메서드
  const requestChangeAppState = (state) => {
    console.log("Recruitments: 신청 상태변경 요청 시작")
    setIsRequest(true)
    requestChangeApplicationStateApi(applicationData.applicationId, state)
    .then(res => {
      setIsRequest(false)
      console.log("Recruitments: 신청 상태변경 요청 성공")
      changeAppState(postId, applicationData.applicationId, state);
    })
    .catch(err => {
      setIsRequest(false)
      console.log("Recruitments: 신청 상태변경 요청 실패") 
      console.log(err)
      if (err.response.data.code === 'UNAUTHORIZED') {
        alert("로그인 유효기간이 만료되었거나 로그인을 하지않았습니다. 로그인을 먼저 진행해주세요!");
        navigate("/");
      } else {
        alert("잠시후 다시 실행해주세요");
      }
    })
  }

  // 신청 row 클릭 메서드
  const onClickApplicationRow = () => {
    navigate(`/review/${applicationData.applicationId}`)
  }

  // 수락/거부 클릭 메서드
  const onClickStateBtn = (e, state) => {
    requestChangeAppState(state);
  }
  
  // 수락/거부 버튼 구성
  const makeApplicationStateBtn = (applicationState) => {
    if (applicationState === "ACCEPT") {
      return (<button className={styles.acceptSavedButton}>수락</button>)
    }
    else if (applicationState === "REJECT") {
      return (<button className={styles.rejectSavedButton}>거부</button>)
    }
    else  {
      return (
        <>
          <button className={styles.acceptButton} onClick={(e)=>onClickStateBtn(e, "ACCEPT")}>수락</button>
          <button className={styles.rejectButton} onClick={(e)=>onClickStateBtn(e, "REJECT")}>거부</button>
        </>
      )
    }
  }

  if(!applicationData) return;

  return (
    <div className={styles.applicationRow}>
    <div className={styles.applicationRowBar}></div>
    <div className={styles.applicationRowTitle} onClick={onClickApplicationRow}>{`${applicationData.applicantNickName}님의 신청`}</div>
      <div className={styles.applicationRowBtnBox}>
        {
          isRequest?
            <div className={styles.requestBtn}>요청중입니다.</div>:
            makeApplicationStateBtn(applicationData.applicationIsPassed)
        }
      </div>
  </div>
  )
}

const SubMenu = ({closeSubMenu, onClickDeleteInSubMenu}) => {
  return (
    <div className={styles.tooltip} onMouseLeave={closeSubMenu}>
      <div className={styles.tooltipItem} onClick={onClickDeleteInSubMenu}>삭제</div>
    </div>
  )
}

const PostTableRow = ({postData, deletePost, changeAppState}) => {
  const navigate = useNavigate();
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  // 모집글 삭제 요청
  const requestDeletePost = async (postId) => {
    try {
      console.log("Recruitments: 모집글 삭제 요청 시작");
      await requestDeletePostApi(postId);
      console.log("Recruitments: 모집글 삭제 요청 성공");
      deletePost(postId);
    } catch (err) {
      console.log(err);
      console.log("Recruitments: 모집글 삭제 요청 실패");
      if (err.response.data.code === 'UNAUTHORIZED') {
        alert("로그인 유효기간이 만료되었거나 로그인을 하지않았습니다. 로그인을 먼저 진행해주세요!");
        navigate("/");
      } else {
        alert("잠시후 다시 실행해주세요");
      }
    }
  }

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
  

  // 모집글 row 클릭 메서드
  const onClickPostRow = () => {
    navigate(`/recruitdetail/${postData.postId}`);
  }

  // 서브메뉴 열기 메서드
  const openSubMenu = () => {
    setIsSubMenuOpen(true);
  }

  // 서브메뉴 닫기 메서드
  const closeSubMenu = () => {
    setIsSubMenuOpen(false);
  }

  // 서브메뉴 내부 삭제하기 버튼 클릭 메서드
  const onClickDeleteInSubMenu = (e, postId) => {
    requestDeletePost(postId);
  }

  if(!postData) return;
  
  return (
    <>
      <div className={styles.postRow}>
        <div className={styles.postRowTitle} onClick={onClickPostRow}>{postData.postTitle}</div>
        <div className={styles.postRowTime} onClick={onClickPostRow}>{convertDate(postData.postCreateTime)}</div>
        <div className={styles.postRowEllipsis} onClick={openSubMenu}>
          <i className="fas fa-ellipsis-v"></i>
          {isSubMenuOpen?<SubMenu closeSubMenu={closeSubMenu} onClickDeleteInSubMenu={(e) => onClickDeleteInSubMenu(e, postData.postId)}/>:''}
        </div>
      </div>
      {postData.applicationOverViewList.map((applicationData, ix) =>
       <ApplicationRow postId={postData.postId} applicationData={applicationData} changeAppState={changeAppState} key={ix}/>)}
    </>
  )
}

const Recruitments = () => {
  const navigate = useNavigate();
  const [postList, setPostList] = useState();
  const [tatolPageCount, setTotalPageCount] = useState(0);
  const [currentPageNum, setCurrentPageNum] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const [isFirstPage, setIsFirstPage] = useState(true);
  

  // 모집글 리스트 요청 메서드
  const requestPostList = () => {
    console.log("Recruitments : 작성한 모집글 리스트 조회 시작");
    requestFindPostListApi(currentPageNum, 10)
    .then(res => {
      console.log("Recruitments : 작성한 모집글 리스트 조회 성공");
      setPostList(res.data.postAndApplicationsOverviews);
      setTotalPageCount(res.data.totalPages);
      setIsLastPage(res.data.lastPage);
      setIsFirstPage(res.data.firstPage);
    })
    .catch(err => {
      console.log("Recruitments : 작성한 모집글 리스트 조회 실패");
      console.log(err);
      if (err.response && err.response.data.code === 'UNAUTHORIZED') {
        alert("로그인 유효기간이 만료되었거나 로그인을 하지않았습니다. 로그인을 먼저 진행해주세요!");
        navigate(-1);
      } else {
        alert("접속이 원할하지 않습니다. 잠시후 다시 접속해주세요");
      }
    })
  }

  // 모집글 리스트 요청
  useEffect(()=>{
    requestPostList();
  }, [currentPageNum]);

  // 페이지네이션 관련 메서드
  const onClickPageNum = (pageNum) => {
    setCurrentPageNum(pageNum);
  }
  const onClickBackPage = () => {
    if(!isFirstPage) setCurrentPageNum(currentPageNum-1);
  }
  const onClickNextPage = () => {
    if(!isLastPage)setCurrentPageNum(currentPageNum+1);
  }

  // 모집글 삭제 메서드
  const deletePost = (postId) => {
    const newPostList = postList.filter(post => post.postId != postId);
    setPostList(newPostList);
  }

  // 모집글 상태변경 메서드
  const changeAppState = (postId, applicationId, state) => {
    const newPostList = postList.map(post => {
      if(post.postId == postId) {
        post.applicationOverViewList.map(app => {
          if(app.applicationId == applicationId)
            app.applicationIsPassed = state;
        })
      }
      return post;
    })
    setPostList(newPostList);
  }

  if(!postList || postList.length == 0) {
    return (
      <div className={styles.scrollcontainer}>
        <div className={styles.boardmap}>
          <div className={styles.boardcontent}>
            <div className={styles.wrap1}>
              <div className={styles.boardname}>
                작성글 목록
              </div>
            </div>
            <div className={styles.contentsbox}>
              <div className={styles.applicationTable}>
                <div className={styles.blankTableContent}>작성글이 존재하지 않습니다.</div>
              </div>
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
              작성글 목록
            </div>
          </div>
          <div className={styles.contentsbox}>
            <div className={styles.applicationTable}>
              {postList.map((postData, ix) =>
                <PostTableRow postData={postData} deletePost={deletePost} changeAppState={changeAppState} key={ix}/>
               )}
            </div>
          </div>
        </div>
        </div>
          <div className={styles.navigation}>
            <div className={styles.narrow}onClick={onClickBackPage}>&lt;</div>
            {[... new Array(tatolPageCount)].map((_, i) => 
                  <div className={`${styles.pageNum} ${ i==currentPageNum?styles.current_page:''}`} key={i} onClick={()=>onClickPageNum(i)}>{i+1}</div>
            )}
            <div className={styles.narrow} onClick={onClickNextPage}>&gt;</div>
          </div>
      </div>
  );
};

export default Recruitments;
