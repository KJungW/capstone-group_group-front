import axios from "axios"

async function requestFindApplicationListApi({pageNumber, pageSize}) {
    return axios.get(
        `${process.env.REACT_APP_BACKEND_ADDRESS}/member/applications?pageNumber=${pageNumber}&pageSize=${pageSize}`,
        {headers: {'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`}}
    );
}

export default requestFindApplicationListApi;