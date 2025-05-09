import { SubscribeDTO } from "../types/subscribe";
import styles from "./BriefSubscribe.module.scss";

interface Props {
  prop: SubscribeDTO;
}

function BriefSubscribe({ prop }: Props) {
  return (
    <div className={styles.subscribe}>
      <div className={styles.subscribe_busNumber}>{prop.busNumber}</div>
      <div className={styles.subscribe_stationName}>{prop.stationName}</div>
      <div className={styles.subscribe_stationNumber}>{prop.stationNumber}</div>
    </div>
  );
}

export default BriefSubscribe;
