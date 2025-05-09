import TicoHeader from "@/components/common/header/TicoHeader";
import styles from "./styles/index.module.scss";

function index() {
  return (
    <div>
      {/* 공통 헤더 UI 부분 */}
      <TicoHeader />
      <div className={styles.title}>티코시스템</div>
    </div>
  );
}

export default index;
