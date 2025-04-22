import { useEffect, useState } from "react";
import Card from "./components/Card";
import CommonHeader from "../../components/common/header/CommonHeader";
import styles from "./styles/index2.module.scss";

function index() {
  const [data, setData] = useState([]);
  const getData = () => {};

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
        <Card />
      </main>
    </div>
  );
}

export default index;
