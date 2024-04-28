import axios from "axios"

async function requestFindApplicationDetailApi(applicationId) {
    return axios.get(
        `http://localhost:8080/application?applicationId=${applicationId}`,
        {headers: {'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`}}
    );
}

export default requestFindApplicationDetailApi;