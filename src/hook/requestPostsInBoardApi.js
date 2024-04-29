import axios from "axios"

async function requestPostsInBoard(boardId, pageNumber, pageSize) {
    return axios.get(`${process.env.REACT_APP_BACKEND_ADDRESS}/board/posts?boardId=${boardId}&pageNumber=${pageNumber}&pageSize=${pageSize}&`)
}

export default requestPostsInBoard;