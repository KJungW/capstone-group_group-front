import axios from "axios"

async function reqeustFindPostDetail(postId, memberId) {
    if(memberId) {
        return axios.get(
            `${process.env.REACT_APP_BACKEND_ADDRESS}/member/post?postId=${postId}`,
            {headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`
            }}
        );
    }
    else {
        return axios.get(`${process.env.REACT_APP_BACKEND_ADDRESS}/post?postId=${postId}`)
    }
}

export default reqeustFindPostDetail;