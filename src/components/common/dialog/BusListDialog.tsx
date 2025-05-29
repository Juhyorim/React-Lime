import { useEffect, useState } from "react";
import styles from "./BusListDialog.module.scss";
import { SubscribeDTO } from "@/pages/tico/types/subscribe";
import { useNavigate } from "react-router-dom";
import Loading from "@/pages/imageSplash/components/Loading";
import ticoAxios from "@/api/ticoAxios";

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

function BusListDialog({ handleDialog, subscription }: Props) {
  const navigate = useNavigate();
  const [busStations, setBusStations] = useState<BusStation[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(true);

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

        const response = await ticoAxios.get(`/bus-info/bus-route`, {
          params: queryParams,
        });

        const tmp: BusStation[] = response.data.busStations;

        // routeNo 기준으로 정렬
        const sortedBusStations = tmp.sort((a, b) =>
          a.routeNo.localeCompare(b.routeNo)
        );

        setBusStations(sortedBusStations);
      } catch (error) {
        console.error("버스 정보 불러오기 실패:", error);
      }

      setIsLoading(false);
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
        <div className={styles.container__dialog__title}>버스 선택</div>
        {isLoading ? (
          <Loading />
        ) : (
          <div className={styles.container__dialog__body}>
            {busStations.map((item: BusStation) => {
              return (
                <div
                  className={styles.bus}
                  onClick={() => goToChart(item)}
                  key={item.routeId}
                >
                  <img
                    src="./assets/icons/bus.png"
                    className={styles.bus_icon}
                  />
                  <div className={styles.bus_num}>{item.routeNo}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default BusListDialog;
