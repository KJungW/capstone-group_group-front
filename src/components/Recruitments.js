import React, { useState } from 'react';
import styles from "styles/Recruitments.module.css";

const Recruitments = () => {

  // example data
  const posts = [
    {
      id: 1,
      title: '웹 개발 하실 팀원 모집합니다',
      timestamp: '12:34',
      applications: [
        { applicantName: 'example1', applicationId: 1 },
        { applicantName: 'example2', applicationId: 2 }
      ]
    },
    {
      id: 2,
      title: '웹 개발 하실 팀원 모집합니다',
      timestamp: '2024-03-05',
      applications: [] // 신청서 없음
    },
  ];

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
            <table className={styles.postsTable}>
              <tbody>
              {posts.map((post) => (
                  <>
                    <tr key={post.id}>
                      <td>{post.title}</td>
                      <td className={styles.narrowDateColumn}>{post.timestamp}</td>
                      <td className={styles.configColumn}><i className="fas fa-ellipsis-v"></i></td>
                    </tr>
                    {post.applications.map((app, index) => (
                        <tr key={app.applicationId} className={styles.applicationRow}>
                          <td colSpan="3">
                            <div className={`${styles.applicationContent} ${index === post.applications.length - 1 ? styles.lastApplication : ''}`}>
                              {app.applicantName}님의 신청
                              <div>
                                <button className={styles.acceptButton}>수락</button>
                                <button className={styles.rejectButton}>거부</button>
                              </div>
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

export default Recruitments;
