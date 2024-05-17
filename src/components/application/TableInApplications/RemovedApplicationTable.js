import requestFindDisabledAppListApi from 'hook/requestFindDisabledAppListApi';
import React, { useEffect, useState } from 'react';
import styles from "styles/RemovedApplicationTable.module.css";
import handleApiReqeustError from 'util/handleApiReqeustError';
import BlankApplicationTable from 'components/application/TableInApplications/BlankApplicationTable';
import { useSelector } from 'react-redux';
import convertDate from 'util/convertDate';

const ApplicationTableRow = ({application}) => {
    // 신청서 관련 Row 컴포넌트 생성 메서드
    const makeApplicationReusltComp = (state) => {
      if(state === "ACCEPT")
        return <button className={styles.acceptButton}>수락</button>
      else if (state === "REJECT")
        return <button className={styles.rejectButton}>거부</button>
      else
        return <button className={styles.yetButton}>대기</button>
    }

    return (
        <div className={styles.applicationRow}>
          <div className={styles.titleInRow}>{`<${application.postTitle}> 신청서`}</div>
          <div className={styles.dateInRow}>{application.createTime}</div>
          <div className={styles.stateInRow}>
            {makeApplicationReusltComp(application.isPassed)}
          </div>
        </div>
    )
}

const RemovedApplicationTable = () => {
    const initDataComplete = useSelector(state => state.initDataComplete)
    const [applicationList, setApplicationList] = useState([]);
    const [pageSize, setPageSize] = useState(10);
    const [tatolPageCount, setTotalPageCount] = useState(0);
    const [currentPageNum, setCurrentPageNum] = useState(0);
    const [isLastPage, setIsLastPage] = useState(false);
    const [isFirstPage, setIsFirstPage] = useState(true);
  
    // 신청 리스트 조회
    const requestDisableAppList = ({pageNum}) => {
      console.log("Applications : 비활성화된 신청 리스트 조회 시도");
      requestFindDisabledAppListApi({pageNumber: pageNum, pageSize: pageSize})
      .then(res => {
        console.log("Applications : 비활성화된 신청 리스트 조회 성공");
        const result = res.data;
        setApplicationList(result.disabledAppPreviewOutputs.map(app => ({...app, createTime:convertDate(app.createTime)})));
        setTotalPageCount(result.totalPages);
        setCurrentPageNum(result.currentPageNumber);
        setIsLastPage(result.lastPage);
        setIsFirstPage(result.firstPage);
      })
      .catch(err => {
        console.log("Applications : 비활성화된 신청 리스트 조회 실패");
        handleApiReqeustError({err:err});
      })
    }
  
    // 초기에 신청 리스트를 받아와서 페이지에 적용
    useEffect(() => {
        if(!initDataComplete) return;
        requestDisableAppList({pageNum:currentPageNum});
    }, [initDataComplete, currentPageNum]);
  
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
      return <BlankApplicationTable/>;
    }
  
    return (
      <>
        <div className={styles.contentsbox}>
          <div className={styles.applicationTable}>
            {applicationList.map((application, ix) => (
                <ApplicationTableRow application={application} key={ix}/>
            ))}
          </div>
        </div>
        <div className={styles.navigation}>
          <div className={styles.narrow}onClick={onClickBackPage}>&lt;</div>
          {[... new Array(tatolPageCount)].map((_, i) => 
                <div className={`${styles.pageNum} ${ i==currentPageNum?styles.current_page:''}`} key={i} onClick={()=>onClickPageNum(i)}>{i+1}</div>
          )}
          <div className={styles.narrow} onClick={onClickNextPage}>&gt;</div>
        </div>
      </>
    );
  }

  export default RemovedApplicationTable;