import { SubscribeDTO } from "../types/subscribe";
import styles from "./BriefSubscribe.module.scss";

interface Props {
  prop: SubscribeDTO;
  onClick: (subscribeId: number) => void;
}

function BriefSubscribe({ prop, onClick }: Props) {
  return (
    <div className={styles.subscribe} onClick={() => onClick(prop.id!)}>
      <div className={styles.subscribe_busNumber}>
        {prop.routeId ? prop.routeId : "정류장"}
      </div>
      <div className={styles.subscribe_stationName}>{prop.nodeName!}</div>
      <div className={styles.subscribe_stationNumber}>{prop.nodeNo!}</div>
    </div>
  );
}

export default BriefSubscribe;
