import { useCallback, useEffect, useState } from "react";
import Box from "./Box";

function UseCallbackPrac() {
  const [number, setNumber] = useState(0);
  const [toggle, setToggle] = useState(true);

  const [size, setSize] = useState(100);
  const [isDark, setIsDark] = useState(false);

  //리랜더링마다 함수 재할당됨
  // const someFunction = () => {
  //   console.log(`someFunc: number: ${number}`);
  //   return;
  // };

  //리랜더링되어도 함수는 재할당되지 않음
  const someFunction = useCallback(() => {
    console.log(`someFunc: number: ${number}`);
    return;
  }, [number]);

  useEffect(() => {
    console.log("someFunc 변경");
  }, [someFunction]);

  const createBoxStyle = useCallback(() => {
    return {
      backgroundColor: "pink",
      width: `${size}px`,
      height: `${size}px`,
    };
  }, [size]);

  return (
    <div
      style={{
        margin: "20px",
        width: "100%",
        background: isDark ? "gray" : "white",
      }}
    >
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(Number(e.target.value))}
      />
      <button onClick={() => setToggle(!toggle)}>{toggle.toString()}</button>
      <br />
      <button onClick={someFunction}>Call someFunc</button>

      <hr />

      <br />
      <button onClick={() => setIsDark(!isDark)}>다크모드 토글</button>

      <br />
      <input
        type="number"
        value={size}
        onChange={(e) => setSize(Number(e.target.value))}
      />
      <Box createBoxStyle={createBoxStyle} />
    </div>
  );
}

export default UseCallbackPrac;
