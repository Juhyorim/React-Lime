import TicoHeader from "@/components/common/header/TicoHeader";
import styles from "./styles/index.module.scss";
import { useNavigate } from "react-router-dom";
import useTicoStore from "@/stores/ticoStore";
import useAuthStore from "@/stores/authStore";

function index() {
  const navigate = useNavigate();
  const { cityCode, cityName } = useTicoStore();
  const { username, nickname, email, logout } = useAuthStore();

  const moveToPage = (filter: string) => {
    if (filter === "main") {
      navigate("/tico");
      return;
    }
  };

  const logoutAction = () => {
    logout();

    navigate("/");
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
            <div className={styles.infoList_info}>아이디: {username}</div>
            <div className={styles.infoList_info}>이메일: {email}</div>
            <div className={styles.infoList_info}>닉네임: {nickname}</div>
            <br />
            <button>구독 정보 관리</button>
            <br />
            <button onClick={logoutAction}>로그아웃</button>
          </div>
        </div>

        <div className={styles.mypage_body_pad} />
      </div>
    </div>
  );
}

export default index;
