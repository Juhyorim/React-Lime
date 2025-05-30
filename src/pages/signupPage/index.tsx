import styles from "./styles/index.module.scss";
import { useNavigate } from "react-router-dom";
import GlobalHeader from "@/components/common/header/GlobalHeader";
import { useRef } from "react";
import { ErrorType } from "@/stores/error/ErrorType";
import ticoAxios from "@/api/ticoAxios";

function index() {
  const navigate = useNavigate();
  const nameRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const passwordReRef = useRef<HTMLInputElement>(null);
  const signupKeyRef = useRef<HTMLInputElement>(null);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nameRef.current?.value && !(nameRef.current?.value === "")) {
      alert("이름을 입력해주세요!");
      return;
    }

    if (!usernameRef.current?.value && !(usernameRef.current?.value === "")) {
      alert("아이디를 입력해주세요!");
      return;
    }

    if (
      !passwordInputRef.current?.value &&
      !(passwordInputRef.current?.value === "")
    ) {
      alert("비밀번호를 입력해주세요!");
      return;
    }

    if (
      !passwordReRef.current?.value &&
      !(passwordReRef.current?.value === "")
    ) {
      alert("비밀번호 확인란을 입력해주세요!");
      return;
    }

    if (!signupKeyRef.current?.value && !(signupKeyRef.current?.value === "")) {
      alert("회원가입 키를 입력해주세요!");
      return;
    }

    if (passwordInputRef.current?.value !== passwordReRef.current?.value) {
      alert("비밀번호 확인란이 일치하지 않습니다");
      return;
    }

    const result = await signup(
      nameRef.current.value,
      usernameRef.current.value,
      passwordInputRef.current.value,
      signupKeyRef.current.value
    );

    if (result.success) {
      alert(`회원가입 성공.`);
      navigate("/");
    } else {
      console.error(`로그인 실패: ${result.message}`);
    }
  };

  const signup = async (
    nickname1: string,
    username1: string,
    password1: string,
    signupKey: string
  ) => {
    try {
      await ticoAxios.post(`/join`, {
        username: username1,
        nickname: nickname1,
        password: password1,
        email: username1,
        signupKey: signupKey,
      });
      return { success: true };
    } catch (error: any) {
      let errorMessage = "회원가입 중 오류가 발생했습니다.";

      // if (error?.response?.status === 401) {
      //   errorMessage = "아이디 또는 비밀번호가 올바르지 않습니다.";
      // } else if (error?.response?.status === 429) {
      //   errorMessage =
      //     "로그인 시도가 너무 많습니다. 잠시 후 다시 시도해주세요.";
      // } else if (error?.response?.status >= 500) {
      //   errorMessage = "서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.";
      // } else if (!error?.response) {
      //   errorMessage = "네트워크 연결을 확인해주세요.";
      // }

      return {
        success: false,
        error: ErrorType.LOGIN_FAILED,
        message: errorMessage,
      };
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
        <div className={styles.page_signup}>
          <div className={styles.page_signup_desc}>환영합니다!</div>
          <div className={styles.page_signup_item}>
            <div className={styles.name}>회원이름: </div>
            <input
              ref={nameRef}
              className={styles.page_signup_inputBox}
              type="text"
              placeholder="회원명 입력"
            />
          </div>
          <div className={styles.page_signup_item}>
            <div className={styles.name}>아이디: </div>
            <input
              ref={usernameRef}
              className={styles.page_signup_inputBox}
              type="text"
              placeholder="아이디를 입력해주세요"
            />
          </div>
          <div className={styles.page_signup_item}>
            <div className={styles.name}>비밀번호: </div>
            <input
              ref={passwordInputRef}
              className={styles.page_signup_inputBox}
              type="password"
              placeholder="비밀번호를 입력해주세요"
            />
          </div>
          <div className={styles.page_signup_item}>
            <div className={styles.name}>비밀번호 확인: </div>
            <input
              ref={passwordReRef}
              className={styles.page_signup_inputBox}
              type="password"
              placeholder="비밀번호를 다시 입력해주세요"
            />
          </div>
          <div className={styles.page_signup_item}>
            <div className={styles.name}>회원가입 코드: </div>
            <input
              ref={signupKeyRef}
              className={styles.page_signup_inputBox}
              type="text"
              placeholder="발급받은 코드 입력"
            />
          </div>

          <button className={styles.page_signup_btn} onClick={handleSignup}>
            회원가입
          </button>
        </div>
        <div className={styles.page_padding} />
      </div>
    </>
  );
}

export default index;
