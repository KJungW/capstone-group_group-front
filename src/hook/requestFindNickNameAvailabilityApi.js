import axios from "axios"

async function requestFindNickNameAvailabilityApi(nickName) {
    return axios.get(
        `${process.env.REACT_APP_BACKEND_ADDRESS}/member/signup/nickname?nickName=${nickName}`
    );
}

export default requestFindNickNameAvailabilityApi;