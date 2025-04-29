import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { UserContext } from "../context/UserContext";

function FlowerBlock() {
  // const { isDark } = useContext(ThemeContext);
  const { isDark } = useContext(ThemeContext)!; //타입단언 사용 - isDark는 null이되지 않음
  const user = useContext(UserContext);

  return (
    <div>
      <p style={{ color: isDark ? "white" : "black" }}>나는 {user}!</p>
    </div>
  );
}

export default FlowerBlock;
