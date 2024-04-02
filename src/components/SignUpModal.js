import React, { useState, useRef, useEffect } from "react";
import styles from "styles/SignUpModal.module.css";
import ErrorModal from "./ErrorModal";

const SignUpModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const modalRef = useRef(null);

  const validateForm = () => {
    if (!email || email.trim() === "" || email.length > 40) {
      setError("이메일을 입력해주세요. (40자 이내)");
      return false;
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
    ) {
      setError("유효한 이메일 주소를 입력해주세요.");
      return false;
    }

    if (!username || username.trim() === "" || username.length > 20) {
      setError("닉네임을 입력해주세요. (20자 이내)");
      return false;
    }

    if (!password || password.trim() === "") {
      setError("비밀번호를 입력해주세요.");
      return false;
    } else if (
      !/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/.test(password)
    ) {
      setError(
        "비밀번호는 8자 이상 15자 이내의 영문, 숫자, 특수문자를 포함해야 합니다."
      );
      return false;
    }

    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("회원가입 정보:", email, username, password, confirmPassword);
      onClose(); // 폼이 유효하면 모달 닫기
      setError(""); // 에러 메시지 초기화
    } else {
      // 에러 메시지는 ErrorModal을 통해 표시
      setTimeout(() => setError(""), 2000); // 3초 후 에러 메시지 사라짐
    }
  };

  const handleCloseModal = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
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
      <div ref={modalRef} className={styles.modal}>
        <div className={styles.boardContent}>
          <div className={styles.wrap1}>
            <div className={styles.boardName}>회원가입</div>
          </div>
          <div className={styles.contentsBox}>
            <form onSubmit={handleSubmit} noValidate>
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
              <button
                type="submit"
                className={styles.buttonSignUp}
                // disabled
              >
                가입하기
              </button>
            </form>
          </div>
        </div>
      </div>
      <ErrorModal message={error} onClose={() => setError("")} />
    </div>
  );
};

export default SignUpModal;
