import axios from "axios"

async function reqeustLogoutApi() {
    // API 요청
    return axios.post(
        `${process.env.REACT_APP_BACKEND_ADDRESS}/auth/logout`,
        {},
        {headers: {
            'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`
        }}
    )
}

export default reqeustLogoutApi;