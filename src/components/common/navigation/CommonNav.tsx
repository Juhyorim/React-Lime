import { useEffect, useState } from "react";
import styles from "./CommonNav.module.scss";
import { Link, useLocation } from "react-router-dom";
import navJson from "./nav.json";
import { useRecoilState } from "recoil";
import { searchState } from "../../../recoil/atoms/searchState";
import { pageState } from "../../../recoil/atoms/pageState";

interface Navigation {
  index: number;
  path: string;
  label: string;
  searchValue: string;
  isActive: boolean;
}

function CommonNav() {
  const location = useLocation();
  //카테고리 직접 만듦 - 백엔드에서 주는 형태가 더 좋을듯
  const [navigation, setNavigation] = useState<Navigation[]>(navJson);

  const [page, setPage] = useRecoilState(pageState);
  const [search, setSearch] = useRecoilState(searchState);

  useEffect(() => {
    navigation.forEach((nav: Navigation) => {
      nav.isActive = false;

      if (
        nav.path === location.pathname ||
        location.pathname.includes(nav.path)
      ) {
        nav.isActive = true;
        setSearch(nav.searchValue);
        setPage(1);
        console.log("Current page:", page);
        console.log("Current search:", search);
      }
    });

    setNavigation([...navigation]);
  }, [location.pathname]);

  //useState로 선언한 반응성을 가진 데이터를 기반으로 UI를 반복호출해보도록 한다.
  const navLinks = navigation.map((item: Navigation) => {
    return (
      <Link
        to={item.path}
        className={
          item.isActive
            ? `${styles.navigation_menu}} ${styles.active}`
            : `${styles.navigation_menu} ${styles.inactive}`
        }
        key={`${item.path}-${item.index}`}
        // key={item.path}
      >
        <span className={styles.navigation__menu__label}>{item.label}</span>
      </Link>
    );
  });

  return <nav className={styles.navigation}>{navLinks}</nav>;
}

export default CommonNav;
