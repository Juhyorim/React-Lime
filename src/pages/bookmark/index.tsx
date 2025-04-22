import { useEffect, useState } from "react";
import Card from "./components/Card";
import CommonHeader from "../../components/common/header/CommonHeader";
import styles from "./styles/index2.module.scss";
import { CardDTO } from "../index/types/card";

function index() {
  const [data, setData] = useState([]);
  const getData = () => {
    const getLocalStorage = JSON.parse(localStorage.getItem("bookmark"));

    if (getLocalStorage || getLocalStorage !== null) {
      setData(getLocalStorage);
    } else {
      setData([]);
    }
  };

  //mount 완료 시 호출되는 로직
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={styles.page}>
      {/* <div> */}
      <CommonHeader />
      <main className={styles.page__contents}>
        {/* <main> */}
        {data.map((item: CardDTO) => {
          return <Card prop={item} key={item.id} />;
        })}
      </main>
    </div>
  );
}

export default index;
