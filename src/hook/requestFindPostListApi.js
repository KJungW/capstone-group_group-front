import axios from "axios"

async function requestFindPostListApi(pageNumber, pageSize) {
    return axios.get(
        `${process.env.REACT_APP_BACKEND_ADDRESS}/member/posts?pageNumber=${pageNumber}&pageSize=${pageSize}`,
        {headers: {'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`}}
    );
}

export default requestFindPostListApi;