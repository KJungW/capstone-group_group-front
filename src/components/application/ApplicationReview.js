import requestFindApplicationDetailApi from "hook/requestFindApplicationDetailApi";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "styles/ApplicationReview.module.css";
import axios from "axios";

const TextRequirement = ({title, content}) => {
  return (
    <div className={styles.requirementBox}>
      <div className={styles.requirementTitle}>{title}</div>
      <div className={styles.requirementTextBox}>
        <input type="text" value={content} disabled={true}></input>
      </div>
    </div>
  )
}

const FileRequirement = ({title, url, fileName}) => {

  const onClickDownload = () => {
    axios({
      url: url,
      method: 'GET',
      responseType: 'blob',
    })
    .then(response => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    })
    .catch(error => {
      console.error('파일 다운로드 중 오류 발생:', error);
    });
  }

  return (
    <div className={styles.requirementBox}>
      <div className={styles.requirementTitle}>{title}</div>
      <div className={styles.requirementFileBox}>
        <div className={styles.fileUploadBtn} onClick={onClickDownload}>파일 다운로드</div>
        <div className={styles.fileUpdateDesc}>{fileName}</div>
      </div>
    </div>
  )
}

const ApplicationReview = () => {
  const {applicationId} = useParams();
  const [applicationDetail, setApplicationDetail] = useState();
  const navigate = useNavigate();

  const requestApplicationDetail = () => {
    console.log("ApplicationReview : 신청 세부 데이터 조회 시작");
    requestFindApplicationDetailApi(applicationId)
    .then (res => {
      console.log("ApplicationReview : 신청 세부 데이터 조회 성공");
      const result = res.data.requirementDataList;
      result.map(item => {
        if(item.resultType === "FILE") {
          const realFileName = item.fileName.split("/").slice(-1)[0];
          item.fileName = realFileName;
        }
      })
      setApplicationDetail(res.data.requirementDataList);
    })
    .catch (err => {
      console.log("ApplicationReview : 신청 세부 데이터 조회 실패");
      console.log(err);
      if (err.response && err.response.data.code === 'UNAUTHORIZED') {
        alert("로그인 유효기간이 만료되었거나 로그인을 하지않았습니다. 로그인을 먼저 진행해주세요!");
        navigate(-1);
      } 
      else if(err.response && err.response.status === 400) {
        alert("데이터가 존재하지 않습니다.");
        navigate(-1);
      }
      else {
        alert("접속이 원할하지 않습니다. 잠시후 다시 접속해주세요");
      }
    })
  }

  const onClickBackPage = () => {
    navigate(-1);
  }

  useEffect(() => {
    requestApplicationDetail();
  }, []);
  
  if(applicationDetail === undefined) 
    return <></>;

  return (
    <div className={styles.scrollcontainer}>
      <div className={styles.recruitcontent}>
        <div className={styles.wrap1}>
          <div className={styles.boardname}>신청내용</div>
        </div>
        <div className={styles.rcontentsbox}>
          {
            applicationDetail.map((item, ix ) => {
              if(item.resultType === "TEXT")
                return <TextRequirement key={ix} title={item.requirementTitle} content={item.content}/>;
              else
                return <FileRequirement key={ix} title={item.requirementTitle} url={item.content} fileName={item.fileName}/>;
            })
          }
        </div>
        <button className={styles.applicationBtn} onClick={onClickBackPage}>이전 페이지로 되돌아가기</button>
      </div>
    </div>
  );
};

export default ApplicationReview;
