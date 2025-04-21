import styles from "./Card.module.scss";

function Card() {
  const openDialog = () => {
    console.log("openDialog 함수 호출");
  };

  return (
    <div className={styles.card} onClick={openDialog}>
      <img
        src="src/assets/images/image-logo.png"
        alt=""
        className={styles.card__image}
      />
    </div>
  );
}

export default Card;
