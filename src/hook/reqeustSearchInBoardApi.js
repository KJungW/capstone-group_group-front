import axios from "axios"

async function requestSearchInBoardApi(pageNum, pageSize, boardId, searchString) {
    return axios.get(
        `${process.env.REACT_APP_BACKEND_ADDRESS}/board/search?pageNum=${pageNum}&postSize=${pageSize}&boardId=${boardId}&searchString=${searchString}`
    );
}

export default requestSearchInBoardApi;