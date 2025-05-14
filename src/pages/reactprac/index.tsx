import styles from "./styles/index.module.scss";
import UseStatePrac from "./components/UseStatePrac";
import UseEffectPrac from "./components/UseEffectPrac";
import UseRefPrac from "./components/UseRefPrac";
import UseMemoPrac from "./components/UseMemoPrac";
import UseMemoPrac2 from "./components/UseMemoPrac2";
import UseCallbackPrac from "./components/UseCallbackPrac";
import UseReducerPrac from "./components/UseReducerPrac";
import UseReducerPrac2 from "./components/UseReducerPrac2";

function App() {
  return (
    <div className={styles.page}>
      <div className={styles.page__contents}>
        <p className={styles.page__contents__title}>useReducer 예시1</p>

        <UseReducerPrac2 />

        <p className={styles.page__contents__title}>useReducer 예시</p>

        <UseReducerPrac />

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
