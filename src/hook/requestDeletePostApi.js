import axios from "axios"
//requestDeletePostApi
async function requestDeletePostApi(postId) {
    // API 요청
    return axios.delete(
        `${process.env.REACT_APP_BACKEND_ADDRESS}/post?postId=${postId}`,
        {headers: {
            'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`
        }}
    )
}

export default requestDeletePostApi;