import React, { useState } from "react";
import styles from "./UseStatePrac.module.scss";

const heavyWork = () => {
  //랜더링 될 때만 수행하고 싶은 작업
  console.log("무거운 작업");
  return ["안구르", "주효림"];
};

function UseStatePrac() {
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

  return (
    <div className={styles.page}>
      <div className={styles.page__clock}>
        <div className={styles.wrapper}>
          <span className={styles.wrapper__clock}>현재 시각: {count}시</span>
          <button className={styles.wrapper__btn} onClick={handleClick}>
            Increase
          </button>
        </div>
      </div>
      <div className={styles.page__inputBox}>
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
          return <p key={name}>{name}</p>;
        })}
      </div>
    </div>
  );
}

export default UseStatePrac;
