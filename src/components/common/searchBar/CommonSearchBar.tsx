import { useState } from "react";
import styles from "./CommonSearchBar.module.scss";
import { useRecoilState } from "recoil";
import { searchState } from "../../../recoil/atoms/searchState";

function CommonSearchBar() {
  const [search, setSearch] = useRecoilState(searchState);
  const [text, setText] = useState("");
  const onChange = (event: any) => {
    setText(event.target.value);
  };

  const onSearch = () => {
    if (text === "") {
      setSearch("Korea");
    } else {
      setSearch(text);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      if (text === "") {
        //input 태그 안에 빈 값을 검색 - 디폴트 검색
        setSearch("Korea");
      } else {
        setSearch(text);
      }
    }
  };

  return (
    <div className={styles.searchBar}>
      <div className={styles.searchBar__search}>
        <input
          type="text"
          placeholder="찾으실 이미지를 검색하세요"
          className={styles.searchBar__search__input}
          onChange={onChange}
          onKeyDown={handleKeyDown}
        />
        <img src="src/assets/icons/icon-search.svg" alt="" onClick={onSearch} />
      </div>
    </div>
  );
}

export default CommonSearchBar;
