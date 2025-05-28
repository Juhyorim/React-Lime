import { useEffect, useState } from "react";
import styles from "./BusListDialog.module.scss";
import { SubscribeDTO } from "@/pages/tico/types/subscribe";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

interface Props {
  handleDialog: (eventValue: boolean) => void;
  subscription: SubscribeDTO;
}

interface BusStation {
  routeId: string;
  routeNo: string;
  routEtp: string;
  endNodeName: string;
  startNodeName: string;
}

interface BusStationsResponse {
  busStations: BusStation[];
}

function BusListDialog({ handleDialog, subscription }: Props) {
  const navigate = useNavigate();
  const [busStations, setBusStations] = useState<BusStation[]>([]);

  //다이얼로그 끄기
  const closeDialog = () => {
    handleDialog(false);
  };

  const goToChart = (station: BusStation) => {
    navigate(
      "/chart/" +
        subscription.cityCode +
        "/" +
        subscription.nodeId +
        "/" +
        station.routeId
    );
  };

  useEffect(() => {
    // 버스 정보 불러오기
    const fetchBusInfo = async () => {
      try {
        const queryParams = {
          cityCode: subscription.cityCode,
          nodeId: subscription.nodeId,
        };

        const response = await axios.get(`${SERVER_URL}/bus-info/bus-route`, {
          params: queryParams,
        });

        console.log("버스 정보:", response.data);

        setBusStations(response.data.busStations);
      } catch (error) {
        console.error("버스 정보 불러오기 실패:", error);
      }
    };

    fetchBusInfo();

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
          {busStations.map((item: BusStation) => {
            return (
              <button
                className={styles.city}
                onClick={() => goToChart(item)}
                key={item.routeId}
              >
                {item.routeNo}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default BusListDialog;
