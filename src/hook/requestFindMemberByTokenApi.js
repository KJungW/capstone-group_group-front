import axios from "axios"

async function requestFindMemberByToken(jwtToken) {
    // API 요청을 위한 JSON 데이터 생성
    const tokenData = {token : jwtToken}
    const tokenDataJson = JSON.stringify(tokenData)

    // API 요청
    return axios.post(
        `${process.env.REACT_APP_BACKEND_ADDRESS}/member/token`,
        tokenDataJson,
        {headers: {'Content-Type': 'application/json'}}
    )
}

export default requestFindMemberByToken;