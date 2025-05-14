import { useReducer, useState } from "react";

const ACTION_TYPES = {
  deposite: "DEPOSIT",
  withdraw: "WITHDRAW",
};

const reducer = (state: number, action: { type: string; payload: number }) => {
  //액션을 토대로 state변경
  console.log("reducer가 일함", action, state);

  //고정된 type으로만 업데이트 가능
  switch (action.type) {
    case ACTION_TYPES.deposite:
      return state + action.payload;
    case ACTION_TYPES.withdraw:
      return state - action.payload;
  }

  return state;
};

function UseReducerPrac() {
  const [number, setNumber] = useState(0);

  //money는 수정하려면 reducer를 사용해야함 - 수정하고싶으면 dispatch를 불러줘야함
  const [money, dispatch] = useReducer(reducer, 0);

  return (
    <div style={{ margin: "20px", width: "100%" }}>
      <h2>useReducer 은행에 오신 것을 환영합니다</h2>
      <p>잔고: {money}원</p>
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(parseInt(e.target.value))}
        step="1000"
      />
      <button
        onClick={() => {
          //요구할 내용 = type
          //값 = payload
          dispatch({ type: ACTION_TYPES.deposite, payload: number });
        }}
      >
        예금
      </button>
      <button
        onClick={() => {
          dispatch({ type: ACTION_TYPES.withdraw, payload: number });
        }}
      >
        출금
      </button>
    </div>
  );
}

export default UseReducerPrac;
