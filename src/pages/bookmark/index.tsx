import { useEffect, useState } from "react";
import Card from "./components/Card";
import CommonHeader from "../../components/common/header/CommonHeader";
import styles from "./styles/index2.module.scss";
import { CardDTO } from "../index/types/card";

function index() {
  const [data, setData] = useState([]);
  const getData = () => {
    // const getLocalStorage = JSON.parse(localStorage.getItem("bookmark"));
    const bookmarkData = localStorage.getItem("bookmark");
    const getLocalStorage = bookmarkData ? JSON.parse(bookmarkData) : null;

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
        {/* 만약 데이터가 없을 때 */}
        {data.length === 0 ? (
          <div className={styles.page__contents__noData}>
            조회 가능한 데이터가 없습니다.
          </div>
        ) : (
          data.map((item: CardDTO) => {
            return <Card prop={item} key={item.id} />;
          })
        )}
      </main>
    </div>
  );
}

export default index;
