import requestFindBoardSubApi from "hook/requestFindBoardSubApi";
import requestFindMemberByToken from "hook/requestFindMemberByTokenApi";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBoardListData, updateCurrentBoardId, updateLoginData } from "store/aboutStore";
import convertFindBoardSubApiResult from "util/convertFindBoardSubApiResult";

const InitEarlyData = () => {
    const dispatch = useDispatch();
    const loginData = useSelector(state => state.loginData);

    // store내부 로그인 데이터 초기화
    const setEarlyLoginDataInStore = async () => {
        // 토큰 존재 여부 확인
        let token = localStorage.getItem("jwtToken");
        if(token === null) return;

        // 토큰이 있을 경우에만 서버에서 로그인 데이터를 가져와 store에 저장
        try {
            console.log("InitEarlyData : 초기 로그인 데이터 조회 시도");
            const memberData = (await requestFindMemberByToken(token)).data

            console.log("InitEarlyData : 초기 로그인 데이터 조회 성공");
            dispatch(updateLoginData({
                memberId : memberData.id,
                email : memberData.email,
                nickName : memberData.nickName,
                campusId : memberData.campusId
            }));
        } catch {
            console.log("InitEarlyData : 초기 로그인 데이터 조회 실패")
            localStorage.clear();
            dispatch(updateLoginData(undefined));
        }
    }

    // store내부 게시판 리스트 데이터 초기화
    const setEarlyBoardListDataInStore = async () => {
        try {
            console.log("InitEarlyData : 게시판 리스트 조회 시작");
            let boardListRaw;
            if(loginData!==undefined && loginData.campusId!==undefined) {
                boardListRaw = (await requestFindBoardSubApi(loginData.campusId)).data
            } else {
                boardListRaw = (await requestFindBoardSubApi()).data
            }

            console.log("InitEarlyData : 게시판 리스트 조회 성공");
            const boardList = convertFindBoardSubApiResult(boardListRaw.content);
            dispatch(updateBoardListData(boardList));
            dispatch(updateCurrentBoardId(boardList[0].data[0].id))
        } catch {
            console.log("InitEarlyData : 게시판 리스트 조회 실패");
        }
    }

    // store 내부 초기화 메서드
    const setEarlyDataInStore = async () => {
        await setEarlyLoginDataInStore();
        await setEarlyBoardListDataInStore();
    }

    useEffect(() => {
        setEarlyDataInStore();
    }, [])

    return <></>
}

export default InitEarlyData;