import axios from "axios"

async function requestFindDisabledAppListApi({pageNumber, pageSize}) {
    return axios.get(
        `${process.env.REACT_APP_BACKEND_ADDRESS}/member/disabled-application?pageNumber=${pageNumber}&pageSize=${pageSize}`,
        {headers: {'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`}}
    );
}

export default requestFindDisabledAppListApi;