//CSS
import styles from "./styles/index.module.scss";
import { useNavigate } from "react-router-dom";

function index() {
  const navigate = useNavigate();

  const gotoImageSplashPage = () => {
    navigate("/imageSplash");
    return;
  };

  const gotoTicoPage = () => {
    navigate("/tico");
    return;
  };

  return (
    <div className={styles.page}>
      {/* 공통 헤더 UI 부분 */}
      {/* <CommonHeader /> */}

      <div className={styles.page__btns}>
        <button
          className={styles.page__btns__photo}
          onClick={gotoImageSplashPage}
        >
          포토스플래시 바로가기
        </button>
        <button className={styles.page__btns__tico} onClick={gotoTicoPage}>
          버스정보시스템 바로가기
        </button>
      </div>
      {/* 공통 네비게이션 UI 부분 */}
      {/* <CommonNav /> */}

      {/* 공통 푸터 UI 부분 */}
      {/* <CommonFooter /> */}

      {/* {open && <DetailDialog data={imgData} handleDialog={setOpen} />} */}
    </div>
  );
}

export default index;
