import axios from "axios";

async function requestDeleteMemberApi() {
    // API 요청
    return axios.delete(
        `${process.env.REACT_APP_BACKEND_ADDRESS}/member`,
        {headers: {'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`}}
    )
}

export default requestDeleteMemberApi;