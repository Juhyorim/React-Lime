import { Dispatch, SetStateAction } from "react";
import styles from "../../styles/index.module.scss";
import UseCallbackPrac from "./UseCallbackPrac";
import UseEffectPrac from "./UseEffectPrac";
import UseMemoPrac from "./UseMemoPrac";
import UseMemoPrac2 from "./UseMemoPrac2";
import UseReducerPrac from "./UseReducerPrac";
import UseReducerPrac2 from "./UseReducerPrac2";
import UseRefPrac from "./UseRefPrac";
import UseStatePrac from "./UseStatePrac";

interface Props {
  setShowHookPrac: Dispatch<SetStateAction<boolean>>;
}

function HookPrac({ setShowHookPrac }: Props) {
  return (
    <div className={styles.page__contents}>
      <button
        onClick={() => setShowHookPrac(false)}
        style={{
          height: "100px",
          width: "250px",
          margin: "20px",
          fontWeight: "700",
          fontSize: "large",
        }}
      >
        Hook 연습 숨기기
      </button>
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
  );
}

export default HookPrac;
