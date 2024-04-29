import axios from "axios"

async function reqeustFindPostDetail(postId) {
    // API 요청
    return axios.get(`${process.env.REACT_APP_BACKEND_ADDRESS}/post?postId=${postId}`)
}

export default reqeustFindPostDetail;