import { useNavigate } from "react-router-dom";
import styles from "./CommonHeader.module.scss";

function CommonHeader() {
  //북마크 페이지로 이동
  const navigate = useNavigate();
  // const [userInfo] = useRecoilState(userInfoAtom);

  const moveToPage = (filter: string) => {
    if (filter === "main") {
      navigate("/imageSplash");
      return;
    }

    if (filter === "bookmark") {
      navigate("/bookmark");
    }

    if (filter === "reactprac") {
      navigate("/reactprac");
    }

    if (filter === "login") {
      navigate("/login");
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.header_logoBox} onClick={() => moveToPage("main")}>
        <span className={styles.header_logoBox_title}>Photo Splash</span>
      </div>
      <div className={styles.header_profileBox}>
        <button
          className={styles.header_profileBox_button}
          onClick={() => moveToPage("bookmark")}
        >
          북마크 목록
        </button>
        {/* {userInfo.token !== "" ? (
          <button className={styles.header_profileBox_button}>
            {userInfo.nickname} 
          </button>
        ) : (
          <button
            className={styles.header_profileBox_button}
            onClick={() => moveToPage("login")}
          >
            마이페이지
          </button>
        )} */}
      </div>
    </header>
  );
}

export default CommonHeader;
