import requestFindApplicationDetailApi from "hook/requestFindApplicationDetailApi";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "styles/ApplicationReview.module.css";
import axios from "axios";
import handleApiReqeustError from "util/handleApiReqeustError";
import { COMMON_BAD_INPUT_ERROR_MSG } from "constData/ErrorMessage";

const TextRequirement = ({title, content}) => {
  const textContentRef = useRef(null);

  useEffect(()=> {
    textContentRef.current.style.height = "36px";
    textContentRef.current.style.height = textContentRef.current.scrollHeight + "px";
  })

  return (
    <div className={styles.requirementBox}>
      <div className={styles.requirementTitle}>{title}</div>
      <div className={styles.requirementTextBox}>
        <textarea ref={textContentRef} value={content} disabled={true}></textarea>
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
      console.log(res.data);
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
      handleApiReqeustError({
        err:err,
        handleBadInput: () => {
          alert(COMMON_BAD_INPUT_ERROR_MSG);
          navigate(-1);
        },
      });
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
        <button className={styles.applicationBtn} onClick={onClickBackPage}>목록보기</button>
      </div>
    </div>
  );
};

export default ApplicationReview;
