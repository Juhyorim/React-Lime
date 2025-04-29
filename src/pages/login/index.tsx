import React, { useEffect, useRef, useState } from "react";
import styles from "./styles/index.module.scss";

function index() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // console.log(inputRef.current);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const login = () => {
    if (inputRef.current) {
      alert(`환영합니다. ${inputRef.current.value}`);
      inputRef.current.focus();
    }
  };

  return (
    <div
      className={styles.page}
      style={{
        backgroundColor: isDark ? "black" : "lightgray",
        color: isDark ? "white" : "black",
      }}
    >
      <input
        ref={inputRef}
        className={styles.page__inputBox}
        type="text"
        placeholder="username"
      />
      <input
        className={styles.page__inputBox}
        type="text"
        placeholder="password"
      />
      <button className={styles.page__btn} onClick={login}>
        로그인
      </button>
      <button
        className={styles.page__btn}
        onClick={() => {
          setIsDark(!isDark);
        }}
      >
        다크모드 {isDark ? "해제" : "설정"}
      </button>
    </div>
  );
}

export default index;
