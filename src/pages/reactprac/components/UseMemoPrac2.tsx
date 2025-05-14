import { useEffect, useMemo, useState } from "react";

function UseMemoPrac2() {
  const [number, setNumber] = useState(0);
  const [isKorea, setIsKorea] = useState(true);

  //const location = isKorea ? "한국" : "외국";
  //랜더링되면 다른 object 메모리상 공간에 저장되고, location이 바뀌었다고 판단됨
  // const location = {
  //   country: isKorea ? "한국" : "외국",
  // };

  //리랜더링되어도 isKorea가 변경되지 않는이상 메모이제이션 된다
  const location = useMemo(() => {
    return {
      country: isKorea ? "한국" : "외국",
    };
  }, [isKorea]);

  // console.log("hi 랜더링");

  useEffect(() => {
    console.log("useEffect 호출");
  }, [location]);

  return (
    <div>
      <h2>하루 몇 끼 먹어요?</h2>
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(Number(e.target.value))}
      />

      <hr />

      <h2>어느 나라에 있어요?</h2>
      <p>나라: {location.country}</p>
      <button onClick={() => setIsKorea(!isKorea)}>비행기 타자</button>
    </div>
  );
}

export default UseMemoPrac2;
