import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { UserContext } from "../../context/UserContext";

function ContextAPIBlock() {
  const { isDark, setIsDark } = useContext(ThemeContext)!;
  const { user, setUser } = useContext(UserContext)!;

  return (
    <div style={{ backgroundColor: isDark ? "#1c1c1c" : "white" }}>
      <h2 style={{ color: isDark ? "white" : "black" }}>다크모드 실습</h2>
      <div style={{ color: isDark ? "white" : "black" }}>
        <i>
          첫 번째 규칙은 <span style={{ color: "red" }}>절대로 잃지 마라</span>.
          두 번째 규칙은 첫 번째를 절대로 따라라.
        </i>
      </div>
      <div>
        주식 시장은 인내심이 없는 자로부터 인내심이 많은 자에게로 돈이
        넘어가도록 설계되어 있다.
      </div>
      <div style={{ display: "flex", flexDirection: "row", margin: "10px" }}>
        <button style={{ backgroundColor: "#ed1a1a" }}>빨강</button>
        <button style={{ backgroundColor: "#ed801a" }}>주황</button>
        <button style={{ backgroundColor: "#f2e824" }}>{user}</button>
        <button style={{ backgroundColor: "#69db12" }}>초록</button>
        <button style={{ backgroundColor: "#1d99e0" }}>파랑</button>
      </div>
      <button
        onClick={() => {
          setIsDark(!isDark);
        }}
      >
        내부에서 다크모드 {isDark ? "해제" : "설정"}
      </button>
    </div>
  );
}

export default ContextAPIBlock;
