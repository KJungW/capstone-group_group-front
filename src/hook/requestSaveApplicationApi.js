import axios from "axios"

async function requestSaveApplicationApi(
    postId,         // 모집글 ID
    applicantId,    // 신청자 ID
    requirementResultList,   // {requirementId, type, content} / {참여요건ID, 참여요건type, 참여요건content}
    fileList        // 입력파일 리스트
) {
    // json데이터 준비
    const applicationData = {
        postId : postId,    
        applicantId : applicantId,
        requirementResultList : requirementResultList,
    }
    const applicationDataJson = JSON.stringify(applicationData)

    // 폼데이터 구성 (json데이터 + 파일들)
    const formData = new FormData();
    formData.append("applicationData", new Blob([applicationDataJson], { type: 'application/json' })); 
    fileList.map(file => formData.append("filesInApplication", file));

    // API 요청
    return axios.post(
        `${process.env.REACT_APP_BACKEND_ADDRESS}/application`,
        formData,
        {headers: {'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`}}
    );
}

export default requestSaveApplicationApi;