import axios from "axios"

async function requestVarifyApplicationApi(postId) {
    return axios.get(
        `${process.env.REACT_APP_BACKEND_ADDRESS}/application/verification?postId=${postId}`,
        {headers: {'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`}}
    );
}

export default requestVarifyApplicationApi;