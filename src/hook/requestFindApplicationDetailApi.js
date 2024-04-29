import axios from "axios"

async function requestFindApplicationDetailApi(applicationId) {
    return axios.get(
        `${process.env.REACT_APP_BACKEND_ADDRESS}/application?applicationId=${applicationId}`,
        {headers: {'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`}}
    );
}

export default requestFindApplicationDetailApi;