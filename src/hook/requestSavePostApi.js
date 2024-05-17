import axios from "axios"

async function requestSavePostApi({
    boardId, title, activityDetail, passionSize, additionalWriting, openChatUrl, requirementList
}) {
    // API 요청을 위한 JSON 데이터 생성
    const postData = {
        boardId : boardId,
        title : title,
        activityDetail : activityDetail,
        passionSize : passionSize,
        additionalWriting : additionalWriting,
        openChatUrl : openChatUrl,
        requirementList : requirementList,
    }
    const postDataJson = JSON.stringify(postData)

    // API 요청
    return axios.post(
        `${process.env.REACT_APP_BACKEND_ADDRESS}/post`,
        postDataJson,
        {headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`
        }}
    )
}

export default requestSavePostApi;