//CSS
import GlobalHeader from "@/components/common/header/GlobalHeader";
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

  const goToReactPrac = () => {
    navigate("/reactprac");
    return;
  };

  const goToIntro = () => {
    navigate("/intro");
    return;
  };

  return (
    <div className={styles.page}>
      {/* 공통 헤더 UI 부분 */}
      <GlobalHeader />

      <div className={styles.page__btns} style={{ margin: "30px" }}>
        <button className={styles.page__btns_intro} onClick={goToIntro}>
          개발자 소개
        </button>
        <button
          className={styles.page__btns_photo}
          onClick={gotoImageSplashPage}
        >
          포토스플래시 바로가기
        </button>
        <button className={styles.page__btns_tico} onClick={gotoTicoPage}>
          버스정보시스템 바로가기
        </button>
        <button className={styles.page__btns_prac} onClick={goToReactPrac}>
          리액트 연습장 바로가기
        </button>
        {/* <button className={styles.page__btns_board}>
          라임보드 바로가기(준비중)
        </button> */}
      </div>

      <div
        style={{
          color: "black",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "start",
          padding: "20px",
          borderTop: "1px solid gray",
          marginTop: "30px",
        }}
      >
        <div>
          수익이 전혀 없는 개인프로젝트 배포 용도로 사용되는 사이트입니다.
        </div>
        <div>
          {" "}
          사용된 곰돌이 사진은{" "}
          <a href="https://www.instagram.com/yurang_official/?hl=ko">
            "망그러진곰"
          </a>
          입니다. <br />
        </div>
        <div>
          문제 제보/문의사항: joohr1234@gmail.com 연락 부탁드립니다. 감사합니다.
        </div>
      </div>
    </div>
  );
}

export default index;
