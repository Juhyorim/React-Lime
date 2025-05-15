import styles from "./styles/index.module.scss";
import { useNavigate } from "react-router-dom";

function index() {
  const navigate = useNavigate();

  const moveToPage = (filter: string) => {
    if (filter === "main") {
      navigate("/tico");
      return;
    }
  };

  return (
    <div className={styles.mypage}>
      <header className={styles.mypage_header}>
        <div
          className={styles.mypage_header_back}
          onClick={() => moveToPage("main")}
        >
          {"◀"}
        </div>

        <div className={styles.mypage_header_profileBox}>
          <img
            className={styles.mypage_header_profileBox_user}
            src="/assets/icons/man-icon.png"
            alt=""
          />
        </div>
      </header>
      <div className={styles.mypage_body}>
        <div className={styles.mypage_body_pad} />

        <div className={styles.mypage_body_contents}>
          <div className={styles.title}>마이페이지</div>
          <div className={styles.infoList}>
            <div className={styles.infoList_info}>아이디: asdf</div>
            <div className={styles.infoList_info}>이메일: asdf@gmail.com</div>
            <div className={styles.infoList_info}>이메일: asdf@gmail.com</div>
            <div className={styles.infoList_info}>이메일: asdf@gmail.com</div>
          </div>
        </div>

        <div className={styles.mypage_body_pad} />
      </div>
    </div>
  );
}

export default index;
