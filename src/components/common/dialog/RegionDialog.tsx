import { useEffect } from "react";
import styles from "./RegionDialog.module.scss";
import { toastConfig } from "react-simple-toasts";
import "react-simple-toasts/dist/theme/dark.css";
import citiesJson from "./cities.json";
import { CityInfo } from "@/pages/tico/cities";

toastConfig({ theme: "dark" });

interface Props {
  handleDialog: (eventValue: boolean) => void;
  handleRegion: (cityCode: string, cityName: string) => void;
}

function RegionDialog({ handleDialog, handleRegion }: Props) {
  const cities: CityInfo[] = citiesJson.cities;

  //다이얼로그 끄기
  const closeDialog = () => {
    handleDialog(false);
    // event.stopPropagation(); //@TODO 외부영역 눌렀을 때만 이벤트 동작하도록 수정하자
  };

  const changeRegion = (city: CityInfo) => {
    handleRegion(city.cityCode.toString(), city.cityName);
    handleDialog(false);
  };

  useEffect(() => {
    //ESC 키를 눌렀을 때, 다이얼로그 창 닫기
    const escKeyDownCloseDialog = (event: any) => {
      console.log("함수 호출");
      if (event.key === "Escape") {
        closeDialog();
      }
    };

    //위에 만들어놓은 escKeyDialog 키다운 했을 때, 이벤트로 등록 및 해지
    // window.addEventListener("keydown", escKeyDownCloseDialog);
    document.addEventListener("keydown", escKeyDownCloseDialog);

    // return () => window.removeEventListener("keydown", escKeyDownCloseDialog);
    return () => document.removeEventListener("keydown", escKeyDownCloseDialog);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.container__dialog}>
        <div className={styles.container__dialog__header}>
          <div className={styles.close}>
            <button className={styles.close__button} onClick={closeDialog}>
              <span
                className="material-symbols-outlined"
                style={{ fontSize: 28 + "px" }}
              >
                close
              </span>
            </button>
          </div>
        </div>
        <div className={styles.container__dialog__title}>지역 설정</div>
        <div className={styles.container__dialog__body}>
          {cities.map((item: CityInfo) => {
            return (
              <button
                className={styles.city}
                onClick={() => changeRegion(item)}
                key={item.cityCode}
              >
                {item.cityName}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default RegionDialog;
