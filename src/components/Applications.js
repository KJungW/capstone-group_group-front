import React, { useState } from 'react';
import styles from "styles/Applications.module.css";

const Applications = () => {

  return (
    <div className={styles.scrollcontainer}>
      <div className={styles.boardmap}>
        <div className={styles.boardcontent}>
          <div className={styles.wrap1}>
            <div className={styles.boardname}>
              신청 목록
            </div>
          </div>
          <div className={styles.contentsbox}>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Applications;
