import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const HomeComponent = () => {
    const navigate = useNavigate();
    const boardListData = useSelector(state => state.boardListData)

    useEffect(()=> {
        if(boardListData) {
            navigate(`/${boardListData[0].data[0].id}`)
        }
      }, [boardListData])
    
}

export default HomeComponent;