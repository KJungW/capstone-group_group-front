import requestFindApplicationListApi from 'hook/requestFindApplicationListApi';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "styles/Applications.module.css";

const ApplicationTableRow = ({application}) => {
  const navigate = useNavigate();

  // 신청서 관련 Row 컴포넌트 생성 메서드
  const maekApplicationReusltComp = (state) => {
    if(state === "ACCEPT")
      return <button className={styles.acceptButton}>수락</button>
    else if (state === "REJECT")
      return <button className={styles.rejectButton}>거부</button>
    else
      return <button className={styles.yetButton}>대기</button>
  }

  // 오픈채팅방주소 관련 Row 컴포넌트 생성 메서드
  const makeOpenChatComp = (state, openChatUrl) => {
    if(state === "ACCEPT") {
      return ( 
        <td>
          <div className={`${styles.applicationContent}`}>
            {openChatUrl}
          </div>
        </td>
      )
    }
  }

  // 신청서 관련 Row 컴포넌트 클릭 메서드
  const onClickRow = (applicationId) => {
    navigate(`/review/${applicationId}`);
  }

  return (
    <>
      <tr onClick={()=>onClickRow(application.applicationId)}>
        <td>{`<${application.postTitle}> 신청서`}</td>
        <td className={styles.narrowDateColumn}>
          {maekApplicationReusltComp(application.applicationState)}
        </td>
      </tr>
      <tr className={styles.applicationRow}>
          {makeOpenChatComp(application.applicationState, application.openChatUrl)}
      </tr>
    </>
  )
}


const Applications = () => {
  const navigate = useNavigate();
  const [applicationList, setApplicationList] = useState([]);

  const [pageSize, setPageSize] = useState(10);
  const [tatolPageCount, setTotalPageCount] = useState(0);
  const [currentPageNum, setCurrentPageNum] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const [isFirstPage, setIsFirstPage] = useState(true);

  // 신청 리스트 조회
  const requestApplicationList = ({pageNum}) => {
    console.log("Applications : 신청 리스트 조회 시도");
    requestFindApplicationListApi({pageNumber: pageNum, pageSize: pageSize})
    .then(res => {
      console.log("Applications : 신청 리스트 조회 성공");
      const result = res.data;
      setApplicationList(result.applicationAndResult);
      setTotalPageCount(result.totalPages);
      setCurrentPageNum(result.currentPageNumber);
      setIsLastPage(result.lastPage);
      setIsFirstPage(result.firstPage);
    })
    .catch(err => {
      console.log("Applications : 신청 리스트 조회 실패");
      console.log(err);
      if (err.response && err.response.data.code === 'UNAUTHORIZED') {
        alert("로그인 유효기간이 만료되었거나 로그인을 하지않았습니다. 로그인을 먼저 진행해주세요!");
        navigate(-1);
      } else {
        alert("접속이 원할하지 않습니다. 잠시후 다시 접속해주세요");
      }
    })
  }

  // 초기에 신청 리스트를 받아와서 페이지에 적용
  useEffect(() => {
    requestApplicationList({pageNum:currentPageNum});
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

  if(!applicationList || applicationList.length == 0) {
    return (
      <div className={styles.scrollcontainer}>
      <div className={styles.boardmap}>
        <div className={styles.boardcontent}>
          <div className={styles.wrap1}>
            <div className={styles.boardname}>
              신청 목록
            </div>
          </div>
          <div className={styles.contentsbox}>
            <div className={styles.applicationTable}>
              <div className={styles.blankTableContent}>신청데이터가 존재하지 않습니다.</div>
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
              신청 목록
            </div>
          </div>
          <div className={styles.contentsbox}>
            <table className={styles.applicationTable}>
              <tbody>
              {applicationList.map((application, ix) => (
                  <ApplicationTableRow application={application} key={ix}/>
              ))}
              </tbody>
            </table>
          </div>
          <div className={styles.navigation}>
            <div className={styles.narrow}onClick={onClickBackPage}>&lt;</div>
            {[... new Array(tatolPageCount)].map((_, i) => 
                  <div className={`${styles.pageNum} ${ i==currentPageNum?styles.current_page:''}`} key={i} onClick={()=>onClickPageNum(i)}>{i+1}</div>
            )}
            <div className={styles.narrow} onClick={onClickNextPage}>&gt;</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Applications;
