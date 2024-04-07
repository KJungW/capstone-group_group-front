import React, { useState, useRef, useEffect } from "react";
import styles from "styles/LoginModal.module.css";
import ErrorModal from "./ErrorModal";

const LoginModal = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const boardRef = useRef(null);
  const [errors, setErrors] = useState({ username: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");

  const showTemporaryAlert = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage("");
    }, 2000); //
  };

  const validateForm = () => {
    let isValid = true;
    let errors = {};

    // 이메일 검증
    if (!username || username.trim() === "") {
      errors.username = "이메일을 입력해주세요.";
      showTemporaryAlert("이메일을 입력해주세요.");
      isValid = false;
      return isValid;
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(username) ||
      username.length > 40
    ) {
      errors.username = "유효한 이메일 주소를 입력해주세요. (40자 이내)";
      showTemporaryAlert("유효한 이메일 주소를 입력해주세요. (40자 이내)");
      isValid = false;
      return isValid;
    }

    if (!password || password.trim() === "") {
      errors.password = "비밀번호를 입력해주세요.";
      showTemporaryAlert("비밀번호를 입력해주세요.");
      isValid = false;
      return isValid;
    } else if (
      !/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/.test(password)
    ) {
      errors.password =
        "비밀번호는 8자 이상 15자 이내의 영문, 숫자, 특수문자를 포함해야 합니다.";
      showTemporaryAlert(
        "비밀번호는 8자 이상 15자 이내의 영문, 숫자, 특수문자를 포함해야 합니다."
      );
      isValid = false;
      return isValid;
    }

    setErrors(errors);
    return isValid;
  };

  const handleLogin = () => {
    if (validateForm()) {
      console.log("로그인 시도:", username, password);
      // 여기에 로그인 로직을 추가하면 됩니다.
      onClose(); // 유효성 검사를 통과하면 모달을 닫습니다.
    } else {
      console.log("유효성 검사 실패:", errors);
    }
  };

  const handleCloseModal = (event) => {
    if (boardRef.current && !boardRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleCloseModal);
    } else {
      document.removeEventListener("mousedown", handleCloseModal);
    }

    return () => {
      document.removeEventListener("mousedown", handleCloseModal);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={`${styles.modal} ${styles.scrollable}`}>
        <div ref={boardRef} className={styles.boardContent}>
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
      </div>
      <ErrorModal message={errorMessage} onClose={() => setErrorMessage("")} />
    </div>
  );
};

export default LoginModal;
