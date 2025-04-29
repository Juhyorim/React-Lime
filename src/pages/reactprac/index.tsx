import React from "react";
import styles from "./styles/index.module.scss";
import { useState } from "react";
import CommonHeader from "@/components/common/header/CommonHeader";
import CommonNav from "@/components/common/navigation/CommonNav";

const heavyWork = () => {
  //랜더링 될 때만 수행하고 싶은 작업
  console.log("무거운 작업");
  return ["안구르", "주효림"];
};

function App() {
  const [count, setCount] = useState(1);
  // const [names, setName] = useState(heavyWork()); //매번 컴포넌트 랜더링마다 불러짐 - 절대 이렇게 사용 x
  const [names, setName] = useState(() => {
    return heavyWork();
  });
  const [input, setInput] = useState("");

  const handleClick = () => {
    setCount(count + 1);
  };

  const handleAddName = () => {
    setName((prevState) => {
      return [input, ...prevState];
    });
  };

  //이벤트를 받는다
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  console.log(input);

  return (
    <div className={styles.page}>
      {/* 공통 헤더 UI 부분 */}
      <CommonHeader />

      {/* 공통 네비게이션 UI 부분 */}
      <CommonNav />

      <div className={styles.page__contents}>
        <div className={styles.page__contents__clock}>
          <div className={styles.wrapper}>
            <span className={styles.wrapper__clock}>현재 시각: {count}시</span>
            <button className={styles.wrapper__btn} onClick={handleClick}>
              Increase
            </button>
          </div>
        </div>
        <div className={styles.page__contents__inputBox}>
          <div className={styles.wrapper}>
            <input
              className={styles.wrapper__input}
              type="text"
              value={input}
              onChange={handleInputChange}
            />
            <button className={styles.wrapper__btn} onClick={handleAddName}>
              Upload
            </button>
          </div>
          {names.map((name) => {
            return <p>{name}</p>;
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
