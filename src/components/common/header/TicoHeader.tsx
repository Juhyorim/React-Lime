import { useRef } from "react";
import styles from "./TicoHeader.module.scss";
import { useNavigate } from "react-router-dom";

interface Props {
  handleRegionDialog: (eventValue: boolean) => void;
  cityCode: number;
  regionName: string;
}

function TicoHeader({ handleRegionDialog, cityCode, regionName }: Props) {
  const navigate = useNavigate();
  const searchRef = useRef<HTMLInputElement>(null);

  const moveToPage = (filter: string) => {
    if (filter === "main") {
      navigate("/tico");
      return;
    }

    if (filter === "mypage") {
      navigate("/tico/mypage");
      return;
    }

    if (filter === "serach") {
      navigate(`/tico/search?input=${searchRef}`);
      return;
    }
  };

  const openDialog = () => {
    handleRegionDialog(true);
  };

  const search = () => {
    console.log(`지역코드: ${cityCode}, 검색어: ${searchRef.current?.value}`);
  };

  return (
    <header className={styles.header}>
      <div className={styles.header_logoBox} onClick={() => moveToPage("main")}>
        <span className={styles.header_logoBox_title}>Tico</span>
      </div>
      <div className={styles.header_search}>
        <button className={styles.header_search_region} onClick={openDialog}>
          {regionName}
        </button>
        <input
          className={styles.header_search_input}
          placeholder="버스, 정류장, 장소 검색"
          ref={searchRef}
        ></input>
        <button className={styles.header_search_button} onClick={search}>
          <img
            src="/assets/icons/icon-search.svg"
            alt=""
            style={{ width: "100%" }}
          />
        </button>
      </div>
      <div
        className={styles.header_profileBox}
        onClick={() => moveToPage("mypage")}
      >
        <img
          className={styles.header_profileBox_user}
          src="/assets/icons/man-icon.png"
          alt=""
        />
      </div>
    </header>
  );
}

export default TicoHeader;
