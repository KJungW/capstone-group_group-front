import React, { useState } from 'react';
import styles from "styles/Recruitments.module.css";

const Recruitments = () => {

  return (
    <div className={styles.scrollcontainer}>
      <div className={styles.boardmap}>
        <div className={styles.boardcontent}>
          <div className={styles.wrap1}>
            <div className={styles.boardname}>
              작성글 목록
            </div>
          </div>
          <div className={styles.contentsbox}>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recruitments;
