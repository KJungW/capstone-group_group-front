import axios from "axios"

async function requestFindBoardSubApi(campusId) {
    if(campusId === null || campusId === undefined) {
        return axios.get(`${process.env.REACT_APP_BACKEND_ADDRESS}/campus/boards`)
    }
    else {
        return axios.get(`${process.env.REACT_APP_BACKEND_HOST}/campus/boards?campusId=${campusId}`)
    }
}

export default requestFindBoardSubApi;