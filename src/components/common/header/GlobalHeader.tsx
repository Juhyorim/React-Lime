import { useRecoilState } from "recoil";
import styles from "./GlobalHeader.module.scss";
import { userInfoAtom } from "@/recoil/atoms/userInfoAtom";
import { useNavigate } from "react-router-dom";

function GlobalHeader() {
  const navigate = useNavigate();
  const [userInfo] = useRecoilState(userInfoAtom);

  const moveToPage = (filter: string) => {
    if (filter === "main") {
      navigate("/");
      return;
    }

    if (filter === "login") {
      navigate("/login");
      return;
    }
  };

  return (
    <header className={styles.header}>
      {/* 로고 */}
      <div className={styles.header_logoBox} onClick={() => moveToPage("main")}>
        <span className={styles.header_logoBox_title}>Lime's project</span>
      </div>

      <div className={styles.header_profileBox}>
        {/* 프로필관련 링크 */}
        <a href="https://github.com/Juhyorim" target="_blank">
          <img
            className={styles.header_profileBox_link}
            src="/assets/icons/github.png"
          />
        </a>
        <a href="https://velog.io/@joohr1234/posts" target="_blank">
          <img
            className={styles.header_profileBox_link}
            src="/assets/icons/velog.jpg"
          />
        </a>
        <a href="https://fladi.tistory.com/" target="_blank">
          <img
            className={styles.header_profileBox_link}
            src="/assets/icons/tistory.png"
          />
        </a>

        {/* 로그인 */}
        {userInfo.token !== "" ? (
          <button className={styles.header_profileBox_user}>
            {userInfo.nickname} | {userInfo.email}
          </button>
        ) : (
          <button
            className={styles.header_profileBox_login}
            onClick={() => moveToPage("login")}
          >
            로그인/회원가입
          </button>
        )}
      </div>
    </header>
  );
}

export default GlobalHeader;
