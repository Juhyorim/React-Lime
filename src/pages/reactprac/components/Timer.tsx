import React, { useEffect } from "react";
import styles from "./Timer.module.scss";

function Timer() {
  useEffect(() => {
    const timer = setInterval(() => {
      console.log("타이머 돌아가는 중...");
    }, 1000);

    return () => {
      //정리작업 : setInterval을 끝내는 작업 수행
      clearInterval(timer);
      console.log("타이머가 종료되었습니다.");
    };
  }, []);

  return (
    <div className={styles.timer}>
      <span className={styles.timer__text}>
        타이머를 시작합니다. 콘솔을 보세요!
      </span>
    </div>
  );
}

export default Timer;
