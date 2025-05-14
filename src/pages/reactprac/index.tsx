import styles from "./styles/index.module.scss";
import CommonHeader from "@/components/common/header/CommonHeader";
import CommonNav from "@/components/common/navigation/CommonNav";
import UseStatePrac from "./components/UseStatePrac";
import UseEffectPrac from "./components/UseEffectPrac";
import UseRefPrac from "./components/UseRefPrac";
import UseMemoPrac from "./components/UseMemoPrac";
import UseMemoPrac2 from "./components/UseMemoPrac2";
import UseCallbackPrac from "./components/UseCallbackPrac";

function App() {
  return (
    <div className={styles.page}>
      {/* 공통 헤더 UI 부분 */}
      <CommonHeader />

      {/* 공통 네비게이션 UI 부분 */}
      <CommonNav />

      <div className={styles.page__contents}>
        <p className={styles.page__contents__title}>useCallback 예시</p>

        <UseCallbackPrac />

        <p className={styles.page__contents__title}>useEffect 예시</p>
        <UseEffectPrac />

        <p className={styles.page__contents__title}>useState 예시</p>
        <UseStatePrac />

        <p className={styles.page__contents__title}>useRef 예시</p>
        <UseRefPrac />

        <p className={styles.page__contents__title}>useMemo 예시</p>

        <UseMemoPrac />

        <p className={styles.page__contents__title}>useMemo2 실전 예시</p>

        <UseMemoPrac2 />
      </div>
    </div>
  );
}

export default App;
