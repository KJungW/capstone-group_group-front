import axios from "axios"

async function reqeustSignUpApi(email, nickName, pw) {
    // API 요청을 위한 JSON 데이터 생성
    const signUpData = {
        email : email,
        password : pw,
        nickName : nickName,
        campusId : 1
    }
    const signUpDataJson = JSON.stringify(signUpData)

    // API 요청
    return axios.post(
        `${process.env.REACT_APP_BACKEND_ADDRESS}/member/signup`,
        signUpDataJson,
        {headers: {'Content-Type': 'application/json'}}
    )
}

export default reqeustSignUpApi;