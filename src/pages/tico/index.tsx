import TicoHeader from "@/components/common/header/TicoHeader";
import styles from "./styles/index.module.scss";
import BriefSubscribe from "./components/BriefSubscribe";
import { SubscribeDTO } from "./types/subscribe";
import { useEffect, useState } from "react";
import RegionDialog from "@/components/common/dialog/RegionDialog";
import { useNavigate } from "react-router-dom";
import GlobalHeader from "@/components/common/header/GlobalHeader";
import useSubscriptionStore from "@/stores/subscriptionStore";
import BusListDialog from "@/components/common/dialog/BusListDialog";
import useTicoStore from "@/stores/ticoStore";

function index() {
  const navigate = useNavigate();
  const { cityCode, cityName, setCity } = useTicoStore();

  const { subscriptionList, getList } = useSubscriptionStore();

  // 컴포넌트가 마운트될 때 구독 목록 가져오기
  useEffect(() => {
    getList();
  }, [getList]);

  const [selected, setSelected] = useState<SubscribeDTO | null>(null);
  const [regionOpen, setRegionOpen] = useState<boolean>(false);
  const [busSelectionOpen, setBusSelectionOpen] = useState<boolean>(false);

  const handleSubscribeClick = (subscription: SubscribeDTO) => {
    console.log(subscription.id);

    if (subscription.routeId === null || subscription.routeId === "") {
      setSelected(subscription);

      //정보를 확인할 버스 번호 선택 다이얼로그 오픈
      setBusSelectionOpen(true);
      return;
    }
    navigate("/chart");
  };

  return (
    <div className={styles.tico}>
      {/* 헤더 UI 부분 */}
      <GlobalHeader />
      <TicoHeader
        handleRegionDialog={setRegionOpen}
        regionName={cityName}
        cityCode={Number(cityCode)}
        input=""
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
                    onClick={() => handleSubscribeClick(item)}
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
        <RegionDialog handleDialog={setRegionOpen} handleRegion={setCity} />
      )}
      {busSelectionOpen && selected && (
        <BusListDialog
          handleDialog={setBusSelectionOpen}
          subscription={selected}
        />
      )}
    </div>
  );
}

export default index;
