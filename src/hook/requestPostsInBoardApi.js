import axios from "axios"

async function requestPostsInBoard(boardId, pageNumber, pageSize) {
    return axios.get(`http://localhost:8080/board/posts?boardId=${boardId}&pageNumber=${pageNumber}&pageSize=${pageSize}&`)
}

export default requestPostsInBoard;