import axios from "axios"

async function requestChangeApplicationStateApi(applicationId, applicationState) {
    // 폼데이터 구성
    const formData = new FormData();
    formData.append("applicationId", applicationId); 
    formData.append("applicationState", applicationState); 

    // API 요청
    return axios.post(
        `${process.env.REACT_APP_BACKEND_ADDRESS}/application/state`,
        formData,
        {headers: {
            'Content-Type': 'x-wwww-form-urlencoded',
            'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`
        }}
    )
}

export default requestChangeApplicationStateApi;