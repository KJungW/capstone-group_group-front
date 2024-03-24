import React, { useState } from "react";
import styles from "styles/Login.module.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // 로그인 처리 로직
    console.log("로그인 시도:", username, password);
    // 로그인 로직을 여기에 추가하면 됩니다.
  };

  return (
    <div className={styles.boardContent}>
      <div className={styles.wrap1}>
        <div className={styles.boardName}>로그인</div>
      </div>
      <div className={styles.contentsBox}>
        <form>
          <div className={styles.formGroup}>
            <label htmlFor="username">사용자명:</label>
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
          <button
            type="button"
            onClick={handleLogin}
            className={styles.buttonLogin}
          >
            로그인
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
