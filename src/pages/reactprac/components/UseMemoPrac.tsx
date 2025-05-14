import React, { useMemo, useState } from "react";

const hardCalculate = (number: number) => {
  console.log("어려운 계산!");

  for (let i = 0; i < 999999999; i++) {}
  return number + 10000;
};

const easyCalculate = (number: number) => {
  console.log("쉬운 계산!");

  return number + 1;
};

function UseMemoPrac() {
  //재랜더링
  const [hardNumber, setHardNumber] = useState(1);
  const [easyNumber, setEasyNumber] = useState(1);

  //랜더링마다 계속 함수 호출
  // const hardSum = hardCalculate(hardNumber);

  //hardNumber가 변경되지 않았다면 메모이제이션 한 값 재사용함
  const hardSum = useMemo(() => {
    return hardCalculate(hardNumber);
  }, [hardNumber]);

  const easySum = easyCalculate(easyNumber);

  return (
    <div>
      <h3>어려운 계산기</h3>
      <input
        type="number"
        value={hardNumber}
        onChange={(e) => setHardNumber(parseInt(e.target.value))}
      />
      <span> + 10000 = {hardSum} </span>

      <h3>쉬운 계산기</h3>
      <input
        type="number"
        value={easyNumber}
        onChange={(e) => setEasyNumber(parseInt(e.target.value))}
      />
      <span> + 1 = {easySum} </span>
    </div>
  );
}

export default UseMemoPrac;
