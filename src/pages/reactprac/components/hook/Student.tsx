import { Dispatch } from "react";

interface Props {
  name: string;
  dispatch: Dispatch<any>;
  id: number;
  isHere: boolean;
}

function Student({ name, dispatch, id, isHere }: Props) {
  return (
    <div>
      <span
        style={{
          cursor: "pointer",
          textDecoration: isHere ? "line-through" : "none",
          color: isHere ? "gray" : "black",
        }}
        onClick={() => dispatch({ type: "mark-student", payload: { id } })}
      >
        {name}
      </span>
      <button
        onClick={() => {
          dispatch({ type: "delete-student", payload: { id } });
        }}
      >
        삭제
      </button>
    </div>
  );
}

export default Student;
