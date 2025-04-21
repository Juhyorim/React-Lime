import styles from './CommonHeader.module.scss'

function CommonHeader() {
  return (
    <div className={styles.header}>
      <div className={styles.header_logoBox}>
        <img src="src/assets/images/image-logo.png" alt="" className={styles.header_logoBox_logo}/>
        <span className={styles.header_logoBox_title}>PhotoSplash</span>
      </div>
      <div className = {styles.header_profileBox}>
        <button className={styles.header_profileBox_button}>사진제출</button>
        <button className={styles.header_profileBox_button}>북마크</button>
        <button className={styles.header_profileBox_userName}>lime | lime@naver.com</button>
      </div>
    </div>
  )
}

export default CommonHeader