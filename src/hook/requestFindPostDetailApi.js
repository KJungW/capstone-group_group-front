import axios from "axios"

async function reqeustFindPostDetail(postId) {
    // API 요청
    return axios.get(`http://localhost:8080/post?postId=${postId}`)
}

export default reqeustFindPostDetail;