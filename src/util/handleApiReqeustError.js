const { COMMON_UNAUTHORIZED_ERROR_MSG,
        COMMON_BAD_INPUT_ERROR_MSG,
        COMMON_SERVER_ERROR_MSG,
        COMMON_ERR_NETWORK_MSG } = require("constData/ErrorMessage");



const handleApiReqeustError = ({err, handleUnAuthRized, handleBadInput, handleElse}) => {
    console.log(err);

    // API 요청이 전달되지 않았을 경우 에러처리
    if(!err.response) {
        if(err.code === "ERR_NETWORK") {
            alert(COMMON_ERR_NETWORK_MSG);
            return;
        }
    }

    // API 요청에 의해 서버에서 전달한 에러처리
    if (err.response.data.code === 'UNAUTHORIZED') {
        if(!handleUnAuthRized) 
            alert(COMMON_UNAUTHORIZED_ERROR_MSG);
        else
            handleUnAuthRized();
        localStorage.clear();
        window.location.href = `${process.env.REACT_APP_FRONT_ADDRESS}/`
    }
    else if (err.response.data.code === 'BAD_INPUT') {
        if(!handleBadInput) 
            alert(COMMON_BAD_INPUT_ERROR_MSG);
        else
            handleBadInput();
    }
    else {
        if(!handleElse) 
            alert(COMMON_SERVER_ERROR_MSG);
        else
            handleElse();
    }
}

export default handleApiReqeustError;

/* handleApiReqeustError 활용
handleApiReqeustError({
        err:err,
        handleUnAuthRized: () => {
          alert(COMMON_UNAUTHORIZED_ERROR_MSG);
          // 추가작업
        },
        handleBadInput: () => {
          alert(COMMON_BAD_INPUT_ERROR_MSG);
          // 추가작업
        },
        handleElse: () => {
          alert(COMMON_SERVER_ERROR_MSG);
          // 추가작업
        }
      });

*/