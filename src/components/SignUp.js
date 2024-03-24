import React, { useState } from "react";
import styles from "styles/SignUp.module.css"; // CSS 모듈 import

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("회원가입 정보:", email, username, password, confirmPassword);
  };

  return (
    <div className={styles.boardContent}>
      <div className={styles.wrap1}>
        <div className={styles.boardName}>회원가입</div>
      </div>
      <div className={styles.contentsBox}>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="email">이메일:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.inputLine}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="username">닉네임:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className={styles.inputLine}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">비밀번호:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={styles.inputLine}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword">비밀번호 확인:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className={styles.inputLine}
            />
          </div>
          <button type="submit" className={styles.buttonSignUp} disabled>
            가입하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
