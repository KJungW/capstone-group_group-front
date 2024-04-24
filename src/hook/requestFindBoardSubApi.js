import axios from "axios"

async function requestFindBoardSubApi(campusId) {
    if(campusId === null || campusId === undefined) {
        return axios.get(`http://localhost:8080/campus/boards`)
    }
    else {
        return axios.get(`http://localhost:8080/campus/boards?campusId=${campusId}`)
    }
}

export default requestFindBoardSubApi;