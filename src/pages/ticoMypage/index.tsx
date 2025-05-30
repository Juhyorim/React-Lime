import TicoHeader from "@/components/common/header/TicoHeader";
import styles from "./styles/index.module.scss";
import { useNavigate } from "react-router-dom";
import useTicoStore from "@/stores/ticoStore";

function index() {
  const navigate = useNavigate();
  const { cityCode, cityName } = useTicoStore();

  const moveToPage = (filter: string) => {
    if (filter === "main") {
      navigate("/tico");
      return;
    }
  };

  return (
    <div className={styles.mypage}>
      <TicoHeader
        handleRegionDialog={null}
        regionName={cityName}
        cityCode={Number(cityCode)}
        input=""
      />
      <div className={styles.mypage_body}>
        <div className={styles.mypage_body_pad} />

        <div className={styles.mypage_body_contents}>
          <div className={styles.title}>
            <div
              className={styles.mypage_header_back}
              onClick={() => moveToPage("main")}
            >
              {"◀"}
            </div>
            <span className={styles.mypage_header_title}>마이페이지</span>
          </div>
          <div className={styles.infoList}>
            <div className={styles.infoList_info}>아이디: asdf</div>
            <div className={styles.infoList_info}>이메일: asdf@gmail.com</div>
            <div className={styles.infoList_info}>이메일: asdf@gmail.com</div>
            <div className={styles.infoList_info}>이메일: asdf@gmail.com</div>
            <div className={styles.infoList_info}>구독정보 관리</div>
          </div>
        </div>

        <div className={styles.mypage_body_pad} />
      </div>
    </div>
  );
}

export default index;
