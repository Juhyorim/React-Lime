import { Dispatch, SetStateAction, useContext, useRef, useState } from "react";
import styles from "../../styles/index.module.scss";
import { UserContext } from "../../context/UserContext";
import { ThemeContext } from "../../context/ThemeContext";

interface Props {
  setShowContextPrac: Dispatch<SetStateAction<boolean>>;
}

function ContextPrac({ setShowContextPrac }: Props) {
  const [isDark, setIsDark] = useState(false);
  const [user, setUser] = useState({ username: "알 수 없음" });

  const usernameInputRef = useRef<HTMLInputElement>(null);

  const login = () => {
    if (usernameInputRef.current) {
      setUser({
        username: usernameInputRef.current.value,
      });
    } else {
      alert("필요한 정보를 모두 입력해주세요!");
    }
  };

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
      <div style={{ width: "100%" }}>
        Context API는 새로고침 or 리랜더링 시 데이터가 날아감
      </div>
      <br />
      <UserContext.Provider value={{ user, setUser } as any}>
        <ThemeContext.Provider value={{ isDark, setIsDark }}>
          <h2>로그인 실습/ 유저이름: {user.username}</h2>
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
          <div style={{ backgroundColor: isDark ? "#1c1c1c" : "white" }}>
            <h2 style={{ color: isDark ? "white" : "black" }}>다크모드 실습</h2>
            <div style={{ color: isDark ? "white" : "black" }}>
              <i>
                첫 번째 규칙은{" "}
                <span style={{ color: "red" }}>절대로 잃지 마라</span>. 두 번째
                규칙은 첫 번째를 절대로 따라라.
              </i>
            </div>
            <div>
              주식 시장은 인내심이 없는 자로부터 인내심이 많은 자에게로 돈이
              넘어가도록 설계되어 있다.
            </div>
            <div
              style={{ display: "flex", flexDirection: "row", margin: "10px" }}
            >
              <button style={{ backgroundColor: "#ed1a1a" }}>빨강</button>
              <button style={{ backgroundColor: "#ed801a" }}>주황</button>
              <button style={{ backgroundColor: "#f2e824" }}>노랑</button>
              <button style={{ backgroundColor: "#69db12" }}>초록</button>
              <button style={{ backgroundColor: "#1d99e0" }}>파랑</button>
            </div>
          </div>
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
    </div>
  );
}

export default ContextPrac;
