import { useEffect, useRef, useState } from "react";
import styles from "./UseRefPrac.module.scss";

function UseRefPrac() {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  let countVar = 0; //let이랑 var랑 먼차이얌

  const renderRef = useRef(0);
  useEffect(() => {
    renderRef.current = renderRef.current + 1;
  });

  const increaseCountState = () => {
    setCount(count + 1);
  };

  const increaseCountRef = () => {
    countRef.current = countRef.current + 1;
  };

  const increaseVarRef = () => {
    countVar = countVar + 1;
  };

  const printResults = () => {
    console.log(`rendering 횟수: ${renderRef.current}`);
    console.log(`state: ${count}, ref: ${countRef.current}, var: ${countVar}`);
  };

  return (
    <div className={styles.page}>
      <p>State: {count}</p>
      <p>Ref: {countRef.current}</p>
      <p>var: {countVar}</p>
      <button onClick={increaseCountState}>increase State</button>
      <button onClick={increaseCountRef}>increase Ref</button>
      <button onClick={increaseVarRef}>increase var</button>
      <button onClick={printResults}>현재결과 확인</button>
    </div>
  );
}

export default UseRefPrac;
