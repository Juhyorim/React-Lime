import styles from "./styles/index.module.scss";
import GlobalHeader from "@/components/common/header/GlobalHeader";
import { useState } from "react";
import HookPrac from "./components/hook/HookPrac";
import ContextPrac from "./components/context/ContextPrac";

function App() {
  const [showHookPrac, setShowHookPrac] = useState(false);
  const [showContextPrac, setShowContextPrac] = useState(false);

  return (
    <div className={styles.page}>
      <GlobalHeader />

      {/* hook 연습 */}
      {showHookPrac === true ? (
        <HookPrac setShowHookPrac={setShowHookPrac} />
      ) : (
        <div>
          <button
            onClick={() => setShowHookPrac(!showHookPrac)}
            style={{
              height: "100px",
              width: "250px",
              margin: "20px",
              fontWeight: "700",
              fontSize: "large",
            }}
          >
            Hook 연습 보기
          </button>
        </div>
      )}

      {/* 상태관리 라이브러리 연습 */}
      {showContextPrac === true ? (
        <ContextPrac setShowContextPrac={setShowContextPrac} />
      ) : (
        <div>
          <button
            onClick={() => setShowContextPrac(true)}
            style={{
              height: "100px",
              width: "250px",
              margin: "20px",
              fontWeight: "700",
              fontSize: "large",
            }}
          >
            context 연습 보기
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
