import { useNavigate } from "react-router-dom";
import styles from "./CommonHeader.module.scss";
import { useRecoilState } from "recoil";
import { userInfoAtom } from "@/recoil/atoms/userInfoAtom";

function CommonHeader() {
  //북마크 페이지로 이동
  const navigate = useNavigate();
  const [userInfo] = useRecoilState(userInfoAtom);

  const moveToPage = (filter: string) => {
    if (filter === "main") {
      navigate("/");
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
        <img
          src={`/assets/images/image-logo.png`}
          alt=""
          className={styles.header_logoBox_logo}
        />
        <span className={styles.header_logoBox_title}>Lime Project</span>
      </div>
      <div className={styles.header_profileBox}>
        <button
          className={styles.header_profileBox_button}
          onClick={() => moveToPage("bookmark")}
        >
          북마크
        </button>
        {userInfo.token !== "" ? (
          <button className={styles.header_profileBox_button}>
            {userInfo.nickname} | {userInfo.email}
          </button>
        ) : (
          <button
            className={styles.header_profileBox_button}
            onClick={() => moveToPage("login")}
          >
            로그인
          </button>
        )}
      </div>
    </header>
  );
}

export default CommonHeader;
