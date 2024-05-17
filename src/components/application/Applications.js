import React, { useState } from 'react';
import styles from "styles/Applications.module.css";
import ApplicationTable from 'components/application/TableInApplications/ApplicationTable';
import RemovedApplicationTable from 'components/application/TableInApplications/RemovedApplicationTable';

const filterValueType = {
  DEFAULT : "DEFAULT",
  REMOVED : "REMOVED"
}

const Applications = () => {
  const [filterValue, setFilterValue] = useState(filterValueType.DEFAULT);

  const onChangeFilterValue = (e) => {
    setFilterValue(e.target.value);
  }

  const makeTable = () => {
    if (filterValue === filterValueType.DEFAULT)
      return (<ApplicationTable/>);
    else if (filterValue === filterValueType.REMOVED)
      return (<RemovedApplicationTable/>);
  }

  return (
    <div className={styles.scrollcontainer}>
      <div className={styles.boardmap}>
        <div className={styles.boardcontent}>
          <div className={styles.wrap1}>
            <div className={styles.boardname}>
              신청 목록
            </div>
            <select className={styles.filterBtn} name="filter" onChange={onChangeFilterValue}>
              <option value={filterValueType.DEFAULT}>기본</option>
              <option value={filterValueType.REMOVED}>삭제됨</option>
            </select>
          </div>
          {makeTable()}
        </div>
      </div>
    </div>
  );
};

export default Applications;
