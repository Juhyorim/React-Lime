import styles from "./TicoHeader.module.scss";
import { useNavigate } from "react-router-dom";

interface Props {
  handleRegionDialog: (eventValue: boolean) => void;
  regionName: string;
}

function TicoHeader({ handleRegionDialog, regionName }: Props) {
  const navigate = useNavigate();

  const moveToPage = (filter: string) => {
    if (filter === "main") {
      navigate("/tico");
      return;
    }

    if (filter === "mypage") {
      navigate("/tico/mypage");
      return;
    }
  };

  const openDialog = () => {
    handleRegionDialog(true);
  };

  return (
    <header className={styles.header}>
      <div className={styles.header_logoBox} onClick={() => moveToPage("main")}>
        {/* <img
          src={"/assets/images/image-logo.png"}
          alt=""
          className={styles.header_logoBox_logo}
        /> */}
        <span className={styles.header_logoBox_title}>Tico</span>
      </div>
      <div className={styles.header_search}>
        <button className={styles.header_search_button} onClick={openDialog}>
          {regionName}
        </button>
        <input
          className={styles.header_search_input}
          placeholder="버스, 정류장, 장소 검색"
        ></input>
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
