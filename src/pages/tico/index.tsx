import TicoHeader from "@/components/common/header/TicoHeader";
import styles from "./styles/index.module.scss";
import BriefSubscribe from "./components/BriefSubscribe";
import { SubscribeDTO } from "./types/subscribe";
import { useState } from "react";
import RegionDialog from "@/components/common/dialog/RegionDialog";
import { CityInfo } from "./cities";
import { useNavigate } from "react-router-dom";
import GlobalHeader from "@/components/common/header/GlobalHeader";

function index() {
  const navigate = useNavigate();

  // const subscribeInfoStub: SubscribeDTO[] = [];
  const subscribeInfoStub: SubscribeDTO[] = [
    {
      subscribeId: 1,
      busNumber: "187",
      stationName: "진평동(인동시립도서관입구방면)",
      stationNumber: 10776,
    },
    {
      subscribeId: 2,
      busNumber: "91",
      stationName: "거상빌딩",
      stationNumber: 10004,
    },
    {
      subscribeId: 3,
      busNumber: "91",
      stationName: "거상빌딩",
      stationNumber: 10004,
    },
    {
      subscribeId: 4,
      busNumber: "91",
      stationName: "거상빌딩",
      stationNumber: 10004,
    },
  ];

  const [regionOpen, setRegionOpen] = useState<boolean>(false);
  const [region, setRegion] = useState<CityInfo>({
    cityCode: 12,
    cityName: "세종특별시",
  }); //default 값 설정

  const handleSubscribeClick = (subscribeId: number) => {
    console.log(subscribeId);
    navigate("/chart");
  };

  return (
    <div className={styles.tico}>
      {/* 헤더 UI 부분 */}
      <GlobalHeader />
      <TicoHeader
        handleRegionDialog={setRegionOpen}
        regionName={region.cityName}
        cityCode={region.cityCode}
      />

      <div className={styles.tico_body}>
        <div className={styles.tico_body_pad} />

        <div className={styles.tico_body_contents}>
          <div className={styles.title}>나의 구독</div>
          {subscribeInfoStub.length !== 0 ? (
            <div className={styles.subscribeList}>
              {subscribeInfoStub.map((item: SubscribeDTO) => {
                return (
                  <BriefSubscribe
                    prop={item}
                    key={item.subscribeId}
                    onClick={() => handleSubscribeClick(item.subscribeId)}
                  />
                );
              })}
            </div>
          ) : (
            <div className={styles.subscribeList_none}>
              아직 구독한 버스가 없어요😥
            </div>
          )}
        </div>

        <div className={styles.tico_body_pad} />
      </div>

      {regionOpen && (
        <RegionDialog handleDialog={setRegionOpen} handleRegion={setRegion} />
      )}
    </div>
  );
}

export default index;
