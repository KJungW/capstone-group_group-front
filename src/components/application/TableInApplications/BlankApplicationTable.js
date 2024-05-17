import styles from "styles/BlankApplicationTable.module.css";
const BlankApplicationTable = () => {
    return (
        <div className={styles.contentsbox}>
          <div className={styles.applicationTable}>
            <div className={styles.blankTableContent}>신청데이터가 존재하지 않습니다.</div>
          </div>
        </div>
      )
}

export default BlankApplicationTable;