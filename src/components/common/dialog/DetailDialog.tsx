import { useEffect, useState } from "react";
import { CardDTO } from "../../../pages/index/types/card";
import styles from "./DetailDialog.module.scss";
import toast, { toastConfig } from "react-simple-toasts";
import "react-simple-toasts/dist/theme/dark.css";

toastConfig({ theme: "dark" });

interface Props {
  data: CardDTO;
  handleDialog: (eventValue: boolean) => void;
}

function DetailDialog({ data, handleDialog }: Props) {
  const [bookmark, setBookmark] = useState(false);

  //다이얼로그 끄기
  const closeDialog = () => {
    handleDialog(false);
    // event.stopPropagation(); //@TODO 외부영역 눌렀을 때만 이벤트 동작하도록 수정하자
  };

  //북마크 추가 이벤트
  const addBookmark = (selected: CardDTO) => {
    setBookmark(true);

    // const getLocalStorage = JSON.parse(localStorage.getItem("bookmark"));
    const bookmarkData = localStorage.getItem("bookmark");
    const getLocalStorage = bookmarkData ? JSON.parse(bookmarkData) : null;

    if (!getLocalStorage || getLocalStorage === null) {
      // 1. 로컬스토리지에 bookmark 라는 데이터가 없을 경우
      localStorage.setItem("bookmark", JSON.stringify([selected]));
      toast("해당 이미지를 북마크에 저장하였습니다. 🐛");

      console.log("이미지 저장됨");
    } else {
      // 2. 해당 이미지가 이미 로컬스토리지 bookmark 데이터에 존재함
      if (
        getLocalStorage.findIndex((item: CardDTO) => item.id === selected.id) >
        -1
      ) {
        toast("해당 이미지는 이미 북마크에 추가된 상태입니다.👍");
      } else {
        //3. 해당 이미지가 로컬스토리지 bookmark라는 데이터에 저장되어 있지 않을 경우 + bookmark 라는 데이터에 이미 어떤 값이 담겨있는 경우
        const res = [...getLocalStorage];
        res.push(selected);
        localStorage.setItem("bookmark", JSON.stringify(res));

        toast("해당 이미지를 북마크에 저장하였습니다. 🏝");
      }
    }
  };

  useEffect(() => {
    // const getLocalStorage = JSON.parse(localStorage.getItem("bookmark"));
    const bookmarkData = localStorage.getItem("bookmark");
    const getLocalStorage = bookmarkData ? JSON.parse(bookmarkData) : null;

    //@TODO 상당히 비효율적인데 데이터베이스로 바꾸자
    if (
      getLocalStorage &&
      getLocalStorage.findIndex((item: CardDTO) => item.id === data.id) > -1
    ) {
      setBookmark(true);
    }

    //ESC 키를 눌렀을 때, 다이얼로그 창 닫기
    const escKeyDownCloseDialog = (event: any) => {
      console.log("함수 호출");
      if (event.key === "Escape") {
        closeDialog();
      }
    };

    //위에 만들어놓은 escKeyDialog 키다운 했을 때, 이벤트로 등록 및 해지
    // window.addEventListener("keydown", escKeyDownCloseDialog);
    document.addEventListener("keydown", escKeyDownCloseDialog);

    // return () => window.removeEventListener("keydown", escKeyDownCloseDialog);
    return () => document.removeEventListener("keydown", escKeyDownCloseDialog);
  }, []);

  return (
    // <div className={styles.container} onClick={closeDialog}>
    <div className={styles.container}>
      <div className={styles.container__dialog}>
        <div className={styles.container__dialog__header}>
          <div className={styles.close}>
            <button className={styles.close__button} onClick={closeDialog}>
              <span
                className="material-symbols-outlined"
                style={{ fontSize: 28 + "px" }}
              >
                close
              </span>
            </button>
            <img
              src={data.user.profile_image.small}
              alt="사진작가 프로필 사진"
              className={styles.cloase__authorImage}
            />
            <span className={styles.close__authorName}>{data.user.name}</span>
          </div>
          <div className={styles.bookmark}>
            <button
              className={styles.bookmark__button}
              onClick={() => addBookmark(data)}
            >
              {bookmark === false ? (
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: 16 + "px" }}
                >
                  favorite
                </span>
              ) : (
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: 16 + "px", color: "red" }}
                >
                  favorite
                </span>
              )}
              북마크
            </button>
            <button className={styles.bookmark__button}>다운로드</button>
          </div>
        </div>

        <div className={styles.container__dialog__body}>
          <img
            src={data.urls.small}
            alt="상세이미지"
            className={styles.image}
          />
        </div>

        <div className={styles.container__dialog__footer}>
          <div className={styles.infoBox}>
            <div className={styles.infoBox__item}>
              <span className={styles.infoBox__item__label}>이미지 크기</span>
              <span className={styles.infoBox__item__value}>
                {data.width} X {data.height}
              </span>
            </div>
            <div className={styles.infoBox__item}>
              <span className={styles.infoBox__item__label}>업로드</span>
              <span className={styles.infoBox__item__value}>
                {data.created_at.split("T")[0]}
              </span>
            </div>{" "}
            <div className={styles.infoBox__item}>
              <span className={styles.infoBox__item__label}>
                마지막 업데이트
              </span>
              <span className={styles.infoBox__item__value}>
                {data.updated_at.split("T")[0]}
              </span>
            </div>{" "}
            <div className={styles.infoBox__item}>
              <span className={styles.infoBox__item__label}>다운로드</span>
              <span className={styles.infoBox__item__value}>{data.likes}</span>
            </div>
          </div>
          {/* <div className={styles.tagBox}>
            {data.tags.map((tag: Tag) => {
              return (
                <div className={styles.tagBox__tag} key={tag.title}>
                  {tag.title}
                </div>
              );
            })}
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default DetailDialog;
