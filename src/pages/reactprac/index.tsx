import styles from "./styles/index.module.scss";
import GlobalHeader from "@/components/common/header/GlobalHeader";
import { useState } from "react";
import HookPrac from "./components/HookPrac";

function App() {
  const [showHookPrac, setShowHookPrac] = useState(false);

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
    </div>
  );
}

export default App;
