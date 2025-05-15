import { Dispatch, SetStateAction } from "react";
import styles from "../../styles/index.module.scss";

interface Props {
  setShowContextPrac: Dispatch<SetStateAction<boolean>>;
}

function ContextPrac({ setShowContextPrac }: Props) {
  return (
    <div className={styles.page__contents}>
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
    </div>
  );
}

export default ContextPrac;
