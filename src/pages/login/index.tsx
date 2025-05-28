import { useEffect, useRef } from "react";
import styles from "./styles/index.module.scss";
import { useNavigate } from "react-router-dom";
import GlobalHeader from "@/components/common/header/GlobalHeader";
import useAuthStore from "@/stores/authStore";

function index() {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  // const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);
  const { login, username } = useAuthStore();

  useEffect(() => {
    // console.log(inputRef.current);
    if (username !== null && username !== "") {
      alert("이미 로그인되어있습니다.");
      navigate("/");
      return;
    }

    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (inputRef.current?.value && passwordInputRef.current?.value) {
      const result = await login(
        inputRef.current.value,
        passwordInputRef.current.value
      );

      if (result.success) {
        alert(`환영합니다. ${username}`);
        navigate("/");
      } else {
        console.error(`로그인 실패: ${result.message}`);
      }
    } else {
      alert("아이디 또는 비밀번호를 입력해주세요");
    }
  };

  return (
    <>
      {/* 헤더 */}
      <GlobalHeader />

      <div
        className={styles.page}
        style={{
          backgroundColor: "white",
          color: "black",
        }}
      >
        <div className={styles.page_padding} />
        <div className={styles.page_login}>
          <div className={styles.page_login_desc}>안녕하세요. 환영합니다!</div>
          <input
            ref={inputRef}
            className={styles.page_login_inputBox}
            type="text"
            placeholder="username"
          />
          <input
            ref={passwordInputRef}
            className={styles.page_login_inputBox}
            type="text"
            placeholder="password"
          />
          <button className={styles.page_login_btn} onClick={handleLogin}>
            로그인
          </button>

          <div className={styles.page_login_desc}>
            아직 회원이 아니신가요?{" "}
            <span
              style={{
                textDecoration: "underline",
                cursor: "pointer",
                color: "#4d40c7",
              }}
              onClick={() => navigate("/signup")}
            >
              회원가입 하러가기
            </span>
          </div>
        </div>

        <div className={styles.page_padding} />

        {/* <FlowerBlock /> */}
      </div>
    </>
  );
}

export default index;
