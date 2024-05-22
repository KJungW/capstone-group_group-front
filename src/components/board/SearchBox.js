import styles from "styles/SearchBox.module.css";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";

const SearchBox = ({initSearchString, boardName, onClickSearchBtn}) => {
    const [searchString, setSearchString] = useState(initSearchString?initSearchString:"");

    return (
        <div className={styles.searchBoxArea}>
            <input type='text' className={styles.searchInput} placeholder={`"${boardName}"  게시판에서 모집글 검색`}
                     maxLength={100} onChange={(e) => setSearchString(e.target.value)} value={searchString}></input>
            <div className={styles.searchBtn} onClick={(e)=>onClickSearchBtn(searchString)}><FaSearch/></div>
        </div>
    )
}

export default SearchBox