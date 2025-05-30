import { useRef } from "react";
import styles from "./TicoHeader.module.scss";
import { useNavigate } from "react-router-dom";
import useAuthStore from "@/stores/authStore";

interface Props {
  handleRegionDialog: ((eventValue: boolean) => void) | null;
  cityCode: number;
  regionName: string;
  input: string;
}

function TicoHeader({
  handleRegionDialog,
  cityCode,
  regionName,
  input,
}: Props) {
  const navigate = useNavigate();
  const { username } = useAuthStore();

  const searchRef = useRef<HTMLInputElement>(null);
  // const [_, setSearchParams] = useSearchParams();
  const moveToPage = (filter: string) => {
    if (filter === "main") {
      navigate("/tico");
      return;
    }

    if (filter === "home") {
      navigate("/");
      return;
    }

    if (filter === "login") {
      navigate("/login");
      return;
    }

    if (filter === "mypage") {
      navigate("/tico/mypage");
      return;
    }

    if (filter === "search") {
      const params = {
        cityCode: cityCode.toString(),
        regionName: regionName,
        input: searchRef.current?.value || "",
      };

      const queryString = new URLSearchParams(params).toString();
      navigate(`/tico/search?${queryString}`);

      return;
    }
  };

  const openDialog = () => {
    if (handleRegionDialog === null) {
      return;
    }

    handleRegionDialog(true);
  };

  const search = () => {
    console.log(`지역코드: ${cityCode}, 검색어: ${searchRef.current?.value}`);

    moveToPage("search");
  };

  return (
    <header className={styles.header}>
      <div className={styles.header_logoBox}>
        <span
          className={styles.header_logoBox_title}
          onClick={() => moveToPage("main")}
        >
          Tico
        </span>
        <span style={{ width: "25px" }}>
          <button
            style={{ fontSize: "10px", padding: "0", margin: "0" }}
            onClick={() => moveToPage("home")}
          >
            메인페이지
          </button>
        </span>
      </div>
      {handleRegionDialog === null ? (
        <div />
      ) : (
        <div className={styles.header_search}>
          <button className={styles.header_search_region} onClick={openDialog}>
            {regionName}
          </button>

          <input
            className={styles.header_search_input}
            placeholder="버스, 정류장, 장소 검색"
            ref={searchRef}
            defaultValue={input}
          ></input>
          <button className={styles.header_search_button} onClick={search}>
            <img
              src="/assets/icons/icon-search.svg"
              alt=""
              style={{ width: "100%" }}
            />
          </button>
        </div>
      )}

      <div className={styles.header_profileBox}>
        {username !== null && username !== "" ? (
          <img
            className={styles.header_profileBox_user}
            src="/assets/icons/man-icon.png"
            alt=""
            onClick={() => moveToPage("mypage")}
          />
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

export default TicoHeader;
