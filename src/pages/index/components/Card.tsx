import { CardDTO } from "../types/card";
import styles from "./Card.module.scss";

interface Props {
  data: CardDTO;
  handleDialog: (eventValue: boolean) => void;
}

function Card({ data, handleDialog }: Props) {
  const openDialog = () => {
    console.log("openDialog 함수 호출");
    handleDialog(true);
  };

  return (
    <div className={styles.card} onClick={openDialog}>
      <img
        src={data.urls.small}
        alt={data.alt_description}
        className={styles.card__image}
      />
    </div>
  );
}

export default Card;
