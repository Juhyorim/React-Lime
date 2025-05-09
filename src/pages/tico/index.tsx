import TicoHeader from "@/components/common/header/TicoHeader";
import styles from "./styles/index.module.scss";
import BriefSubscribe from "./components/BriefSubscribe";
import { SubscribeDTO } from "./types/subscribe";

function index() {
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

  return (
    <div className={styles.tico}>
      {/* 헤더 UI 부분 */}
      <TicoHeader />

      <div className={styles.tico_body}>
        <div className={styles.tico_body_pad} />

        <div className={styles.tico_body_contents}>
          <div className={styles.title}>나의 구독</div>

          <div className={styles.subscribeList}>
            {subscribeInfoStub !== null ? (
              subscribeInfoStub.map((item: SubscribeDTO) => {
                return <BriefSubscribe prop={item} key={item.subscribeId} />;
              })
            ) : (
              <p>아직 구독한 버스가 없어요😥</p>
            )}
          </div>
        </div>

        <div className={styles.tico_body_pad} />
      </div>
    </div>
  );
}

export default index;
