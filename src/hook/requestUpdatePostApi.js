import axios from "axios"

async function reqeustUpdatePostApi({
    postId, title, activityDetail, passionSize, additionalWriting, openChatUrl, requirementList
}) {
    // API 요청을 위한 JSON 데이터 생성
    const updateData = {
        postId : postId,
        title : title,
        activityDetail : activityDetail,
        passionSize : passionSize,
        additionalWriting : additionalWriting,
        openChatUrl : openChatUrl,
        requirementList : requirementList
    }
    const updateDataJson = JSON.stringify(updateData)

    // API 요청
    return axios.put(
        `${process.env.REACT_APP_BACKEND_ADDRESS}/post`,
        updateDataJson,
        {headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`
        }}
    )
}

export default reqeustUpdatePostApi;