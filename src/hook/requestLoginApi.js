import axios from "axios"

async function requestLoginApi(email, pw) {
    // API 요청을 위한 JSON 데이터 생성
    const loginData = {email : email, password : pw}
    const loginDataJson = JSON.stringify(loginData)

    // API 요청
    return axios.post(
        `${process.env.REACT_APP_BACKEND_ADDRESS}/auth/login`,
        loginDataJson,
        {headers: {'Content-Type': 'application/json'}}
    )
}

export default requestLoginApi;