import styles from "./styles/index.module.scss";
// import { useNavigate } from "react-router-dom";
import GlobalHeader from "@/components/common/header/GlobalHeader";

function index() {
  // const navigate = useNavigate();
  // const inputRef = useRef<HTMLInputElement>(null);
  // const passwordInputRef = useRef<HTMLInputElement>(null);

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
              // ref={inputRef}
              className={styles.page_signup_inputBox}
              type="text"
              placeholder="회원명 입력"
            />
          </div>
          <div className={styles.page_signup_item}>
            <div className={styles.name}>아이디: </div>
            <input
              // ref={inputRef}
              className={styles.page_signup_inputBox}
              type="text"
              placeholder="아이디를 입력해주세요"
            />
          </div>
          <div className={styles.page_signup_item}>
            <div className={styles.name}>비밀번호: </div>
            <input
              // ref={passwordInputRef}
              className={styles.page_signup_inputBox}
              type="password"
              placeholder="비밀번호를 입력해주세요"
            />
          </div>
          <div className={styles.page_signup_item}>
            <div className={styles.name}>비밀번호 확인: </div>
            <input
              // ref={passwordInputRef}
              className={styles.page_signup_inputBox}
              type="password"
              placeholder="비밀번호를 다시 입력해주세요"
            />
          </div>
          <div className={styles.page_signup_item}>
            <div className={styles.name}>회원가입 코드: </div>
            <input
              // ref={passwordInputRef}
              className={styles.page_signup_inputBox}
              type="text"
              placeholder="발급받은 코드 입력"
            />
          </div>

          <button className={styles.page_signup_btn}>회원가입</button>
        </div>
        <div className={styles.page_padding} />
      </div>
    </>
  );
}

export default index;
