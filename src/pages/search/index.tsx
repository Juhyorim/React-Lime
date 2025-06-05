import RegionDialog from "@/components/common/dialog/RegionDialog";
import TicoHeader from "@/components/common/header/TicoHeader";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useTicoStore from "@/stores/ticoStore";
import ticoAxios from "@/api/ticoAxios";
import Loading from "../imageSplash/components/Loading";
import BusListDialog from "@/components/common/dialog/BusListDialog";
import { ErrorType } from "@/stores/error/ErrorType";
import styles from "./styles/index.module.scss";

interface BusStation {
  nodeId: string;
  nodeName: string;
  nodeNo: string;
}

function index() {
  const { setCity } = useTicoStore();
  const [searchParams, _] = useSearchParams();
  const [regionOpen, setRegionOpen] = useState<boolean>(false);

  const [busStations, setBusStations] = useState<BusStation[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(true);

  const [selected, setSelected] = useState<BusStation | null>(null);
  const [busSelectionOpen, setBusSelectionOpen] = useState<boolean>(false);

  // 쿼리 파라미터 읽기
  const cityCode = Number(searchParams.get("cityCode"));
  const regionName = searchParams.get("regionName");
  const searchRef = searchParams.get("input");

  useEffect(() => {
    const fetchStationInfo = async () => {
      try {
        const queryParams = {
          cityCode: cityCode,
          pageNum: 1,
          nodeNm: searchRef,
        };

        const response = await ticoAxios.get(`/bus-info/bus-station`, {
          params: queryParams,
        });

        const tmp: BusStation[] = response.data.busStations;

        setBusStations(tmp);

        console.log(response);
      } catch (error) {
        setBusStations([]);
        console.log("검색 실패");
      } finally {
        setIsLoading(false);
      }
    };

    // searchRef가 있을 때만 API 호출
    if (searchRef) {
      fetchStationInfo();
    } else {
      setIsLoading(false);
    }
  }, [cityCode, searchRef]);

  const handleStationClick = (station: BusStation) => {
    setSelected(station);

    setBusSelectionOpen(true);
  };

  const handleSubscribeClick = (
    station: BusStation,
    event: React.MouseEvent
  ) => {
    event.stopPropagation();

    const confirmed = window.confirm(
      station.nodeName + "을(를) 정말 구독하시겠습니까?"
    );

    if (confirmed) {
      subscribe(station);
    }
  };

  const subscribe = async (station: BusStation) => {
    try {
      await ticoAxios.post(`/subscribe/version2`, {
        stationId: station.nodeId,
        nodeName: station.nodeName,
        nodeNo: station.nodeNo,
        cityCode: cityCode,
      });

      alert("구독완료");
      return { success: true };
    } catch (error: any) {
      let errorMessage = "구독 중 오류가 발생했습니다.";
      alert("구독 실패");
      return {
        success: false,
        error: ErrorType.UNKNOWN_ERROR,
        message: errorMessage,
      };
    }
  };

  return (
    <div className={styles.search}>
      <TicoHeader
        handleRegionDialog={setRegionOpen}
        regionName={regionName ? regionName : "세종특별시"}
        cityCode={cityCode ? Number(cityCode) : 12}
        input={searchRef ? searchRef : ""}
        key="searchPage"
      />

      <div className={styles.search_body}>
        <h1 className={styles.search_body_title}>검색 페이지</h1>

        {isLoading ? (
          <Loading />
        ) : (
          <div className={styles.search_body_contents}>
            {busStations.length !== 0 ? (
              <div className={styles.contents}>
                {busStations.map((item: BusStation, index: number) => {
                  return (
                    <div
                      className={styles.contents_station}
                      key={item.nodeId || index}
                      onClick={() => handleStationClick(item)}
                    >
                      <div className={styles.contents_station_info}>
                        <div>{item.nodeName}</div>
                        <div>{item.nodeId}</div>
                        <div>{item.nodeNo}</div>
                      </div>
                      <div
                        className={styles.contents_station_btn}
                        onClick={(event) => handleSubscribeClick(item, event)}
                      >
                        구독하기
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div>검색 결과 없음</div>
            )}
          </div>
        )}
      </div>

      {/* 모달들 */}
      {regionOpen && (
        <RegionDialog handleDialog={setRegionOpen} handleRegion={setCity} />
      )}
      {busSelectionOpen && selected && (
        <BusListDialog
          handleDialog={setBusSelectionOpen}
          cityCode={cityCode}
          nodeId={selected.nodeId}
        />
      )}
    </div>
  );
}

export default index;
