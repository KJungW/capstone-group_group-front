import React, { useState } from 'react';
import styles from "styles/Applications.module.css";

const Applications = () => {

  // example data
  const posts = [
    {
      id: 1,
      title: '웹 개발 하실 팀원 모집합니다2',
      confirm: true,
      applications: [
        { applicantName: '오픈채팅방: ~~~~' }
      ]
    },
    {
      id: 2,
      title: '웹 개발 하실 팀원 모집합니다1',
      confirm: false,
      applications: [] // 신청서 없음
    },
  ];

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
            <table className={styles.postsTable}>
              <tbody>
              {posts.map((post) => (
                  <>
                    <tr key={post.id}>
                      <td>{post.title}</td>
                      <td className={styles.narrowDateColumn}>
                        {
                          post.confirm ?
                              <button className={styles.acceptButton}>수락</button> :
                              <button className={styles.rejectButton}>거부</button>
                        }
                      </td>
                    </tr>
                    {post.applications.map((app, index) => (
                        <tr key={app.applicationId} className={styles.applicationRow}>
                          <td colSpan="2">
                            <div className={`${styles.applicationContent} ${index === post.applications.length - 1 ? styles.lastApplication : ''}`}>
                              {app.applicantName}
                            </div>
                          </td>
                        </tr>
                    ))}
                  </>
              ))}

              </tbody>
            </table>
          </div>
          <div className={styles.navigation}>
            <div className={styles.narrow}>
              <a href="#">&lt;</a>
            </div>
            <div className={styles.page}>
              <a href="#">1</a>
            </div>
            <div className={styles.narrow}>
              <a href="#">&gt;</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Applications;
