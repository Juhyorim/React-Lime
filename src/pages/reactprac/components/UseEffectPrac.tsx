import React, { useEffect, useMemo, useState } from "react";
import styles from "./UseEffectPrac.module.scss";
import Timer from "./Timer";
import { useRecoilValueLoadable } from "recoil";
import { locationData } from "@/recoil/selectors/locationSelector";
import Loading from "@/pages/imageSplash/components/Loading";

function UseEffectPrac() {
  const [name2, setName2] = useState("");

  const [count2, setCount2] = useState(1);

  const [showTimer, setShowTImer] = useState(false);

  const locationSelector = useRecoilValueLoadable(locationData);

  //count2가 변화될 때 호출됨
  useEffect(() => {
    console.log("랜더링!!");
  }, [count2]); //디팬던시 어레이

  const handleInput2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName2(e.target.value);
  };

  const handleCount2 = () => {
    setCount2(count2 + 1);
  };

  const dataBlock = useMemo(() => {
    if (locationSelector.state === "hasValue") {
      return <div>{locationSelector.contents}</div>;
    } else {
      //loading일 때
      return <Loading />;
    }
  }, [locationSelector]);

  return (
    <div className={styles.page}>
      <div>
        {showTimer && <Timer />}
        <button onClick={() => setShowTImer(!showTimer)}>Toggle Timer</button>
      </div>
      <div className={styles.page__clock}>
        <div className={styles.wrapper}>
          <span className={styles.wrapper__clock}>현재 시각: {count2}시</span>
          <button className={styles.wrapper__btn} onClick={handleCount2}>
            Increase
          </button>
        </div>
      </div>
      <div className={styles.page__inputBox}>
        <input type="text" value={name2} onChange={handleInput2Change} />
        <span>name = {name2}</span>
      </div>
      <div className={styles.page__inputBox}>{dataBlock}</div>
    </div>
  );
}

export default UseEffectPrac;
