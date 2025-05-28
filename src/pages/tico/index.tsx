import TicoHeader from "@/components/common/header/TicoHeader";
import styles from "./styles/index.module.scss";
import BriefSubscribe from "./components/BriefSubscribe";
import { SubscribeDTO } from "./types/subscribe";
import { useEffect, useState } from "react";
import RegionDialog from "@/components/common/dialog/RegionDialog";
import { CityInfo } from "./cities";
import { useNavigate } from "react-router-dom";
import GlobalHeader from "@/components/common/header/GlobalHeader";
import useSubscriptionStore from "@/stores/subscriptionStore";

function index() {
  const navigate = useNavigate();

  const { subscriptionList, getList } = useSubscriptionStore();

  // 컴포넌트가 마운트될 때 구독 목록 가져오기
  useEffect(() => {
    getList();
  }, [getList]);

  // const subscribeInfoStub: SubscribeDTO[] = [];
  // const subscribeInfoStub: SubscribeDTO[] = [
  //   {
  //     id: 1,
  //     cityCode: 37050,
  //     nodeId: "GMB4",
  //     nodeNo: "10004",
  //     nodeName: "거상빌딩",
  //     routeId: "91",
  //   },
  //   {
  //     id: 2,
  //     cityCode: 37050,
  //     nodeId: "GMB4",
  //     nodeNo: "10004",
  //     nodeName: "거상빌딩",
  //     routeId: "187",
  //   },
  //   {
  //     id: 3,
  //     cityCode: 37050,
  //     nodeId: "GMB4",
  //     nodeNo: "10004",
  //     nodeName: "거상빌딩",
  //     routeId: null,
  //   },
  // ];

  const [regionOpen, setRegionOpen] = useState<boolean>(false);
  const [region, setRegion] = useState<CityInfo>({
    cityCode: 12,
    cityName: "세종특별시",
  }); //default 값 설정

  const handleSubscribeClick = (subscribeId: number) => {
    console.log(subscribeId);
    navigate("/chart");
  };

  useEffect(() => {}, []);

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
          {subscriptionList.length !== 0 ? (
            <div className={styles.subscribeList}>
              {subscriptionList.map((item: SubscribeDTO) => {
                return (
                  <BriefSubscribe
                    prop={item}
                    key={item.id}
                    onClick={() => handleSubscribeClick(item.id!)}
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
