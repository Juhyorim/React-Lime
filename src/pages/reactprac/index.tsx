import styles from "./styles/index.module.scss";
import CommonHeader from "@/components/common/header/CommonHeader";
import CommonNav from "@/components/common/navigation/CommonNav";
import UseStatePrac from "./components/UseStatePrac";
import UseEffectPrac from "./components/UseEffectPrac";

function App() {
  return (
    <div className={styles.page}>
      {/* 공통 헤더 UI 부분 */}
      <CommonHeader />

      {/* 공통 네비게이션 UI 부분 */}
      <CommonNav />

      <div className={styles.page__contents}>
        <p>useEffect 예시</p>
        <UseEffectPrac />

        <p>useState 예시</p>
        <UseStatePrac />
      </div>
    </div>
  );
}

export default App;
