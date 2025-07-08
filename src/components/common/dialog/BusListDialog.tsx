import { useEffect, useState } from "react";
import styles from "./BusListDialog.module.scss";
import { useNavigate } from "react-router-dom";
import Loading from "@/pages/imageSplash/components/Loading";
import ticoAxios from "@/api/ticoAxios";

interface Props {
  handleDialog: (eventValue: boolean) => void;
  cityCode: number;
  nodeId: string;
}

export interface BusRoute {
  routeId: string;
  routeNo: string;
  routEtp: string;
  endNodeName: string;
  startNodeName: string;
  type: number | null;
}

function BusListDialog({ handleDialog, cityCode, nodeId }: Props) {
  const navigate = useNavigate();
  const [busRoutes, setBusRoutes] = useState<BusRoute[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(true);

  //다이얼로그 끄기
  const closeDialog = () => {
    handleDialog(false);
  };

  const goToChart = (station: BusRoute) => {
    navigate("/chart/" + cityCode + "/" + nodeId + "/" + station.routeId);
  };

  const goToTotalChart = () => {
    navigate("/chart2/" + cityCode + "/" + nodeId);
  };

  useEffect(() => {
    // 버스 정보 불러오기
    const fetchBusInfo = async () => {
      try {
        const queryParams = {
          cityCode: cityCode,
          nodeId: nodeId,
        };

        const response = await ticoAxios.get(`/bus-info/bus-route`, {
          params: queryParams,
        });

        const tmp: BusRoute[] = response.data.busStations;

        // routeNo 기준으로 정렬
        const sortedBusStations = tmp.sort((a, b) =>
          a.routeNo.localeCompare(b.routeNo)
        );

        setBusRoutes(sortedBusStations);
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
            <div
              className={styles.bus}
              onClick={() => goToTotalChart()}
              key="totalBusInfoGO"
            >
              {/* <img
                src="./assets/icons/bus.png"
                className={styles.bus_icon}
              /> */}
              <div className={styles.bus_total}>전체보기</div>
            </div>
            {busRoutes.map((item: BusRoute) => {
              return (
                <div
                  className={styles.bus}
                  onClick={() => goToChart(item)}
                  key={item.routeId}
                >
                  {/* <img
                    src="./assets/icons/bus.png"
                    className={styles.bus_icon}
                  /> */}
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
