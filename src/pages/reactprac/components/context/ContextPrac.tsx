import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import styles from "../../styles/index.module.scss";
import { UserContext } from "../../context/UserContext";
import { ThemeContext } from "../../context/ThemeContext";
import ContextAPIBlock from "./ContextAPIBlock";

interface Props {
  setShowContextPrac: Dispatch<SetStateAction<boolean>>;
}

function ContextPrac({ setShowContextPrac }: Props) {
  const [isDark, setIsDark] = useState(false);
  const [user, setUser] = useState("알 수 없음");

  const usernameInputRef = useRef<HTMLInputElement>(null);

  const login = useCallback(() => {
    if (usernameInputRef.current) {
      setUser(usernameInputRef.current.value);
    } else {
      alert("필요한 정보를 모두 입력해주세요!");
    }
  }, []);

  const contextValue = useMemo(
    () => ({
      user,
      setUser,
    }),
    [user, setUser]
  );

  return (
    <div className={styles.page}>
      <button
        onClick={() => setShowContextPrac(false)}
        style={{
          height: "100px",
          width: "250px",
          margin: "20px",
          fontWeight: "700",
          fontSize: "large",
        }}
      >
        Context 연습 숨기기
      </button>

      <div style={{ width: "100%", backgroundColor: "lightgray" }}>
        context API실습
      </div>
      <br />
      <UserContext.Provider value={contextValue}>
        <ThemeContext.Provider value={{ isDark, setIsDark }}>
          <h2>로그인 실습/ 유저이름: {user}</h2>
          <div
            style={{ display: "flex", flexDirection: "row", margin: "10px" }}
          >
            <p style={{ marginRight: "10px" }}>usename: </p>
            <input ref={usernameInputRef} placeholder="이름을 입력해주세요" />
          </div>
          <button onClick={login} style={{ height: "25px", width: "50px" }}>
            로그인
          </button>

          <br />

          <ContextAPIBlock />
          <button
            className={styles.page__btn}
            onClick={() => {
              setIsDark(!isDark);
            }}
          >
            다크모드 {isDark ? "해제" : "설정"}
          </button>
        </ThemeContext.Provider>
      </UserContext.Provider>

      <br />
      <div style={{ width: "100%", backgroundColor: "lightgray" }}>
        recoil API실습
      </div>
    </div>
  );
}

export default ContextPrac;
