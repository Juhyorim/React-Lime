import GlobalHeader from "@/components/common/header/GlobalHeader";
import styles from "./styles/index.module.scss";

function index() {
  return (
    <>
      <GlobalHeader />
      <div className={styles.contents}>
        <br />

        {/* 이력 */}
        <div className={styles.contents_title}>이력</div>
        <div className={styles.contents_intro}>
          <ul>
            <li>2020.03 ~ 2024.02 컴퓨터공학과 졸업</li>
            <li>2023.01 ~ 2023.12 멋쟁이사자처럼 백엔드 운영진</li>
            <li>2024.01 ~ 2024.12 SSAFY 11기 java반 수료</li>
          </ul>
        </div>

        <br />
        {/* 기술스택 */}
        <div className={styles.contents_title}>기술스택</div>
        <div className={styles.contents_techstack}>
          <ol>
            <li>java</li>
            <li>spring/springboot</li>
            <li>mongodb</li>
            <li>mysql</li>
            <li>redis</li>
            <li>react</li>
            <li>jenkins</li>
          </ol>
        </div>
      </div>
    </>
  );
}

export default index;
