import React, { useEffect, useState } from "react";

type CreateBoxStyleFunction = () => React.CSSProperties;

interface BoxProps {
  createBoxStyle: CreateBoxStyleFunction;
}

function Box({ createBoxStyle }: BoxProps) {
  const [style, setStyle] = useState({});

  useEffect(() => {
    console.log("박스 키우기");
    setStyle(createBoxStyle());
  }, [createBoxStyle]);

  return <div style={style}>Box</div>;
}

export default Box;
