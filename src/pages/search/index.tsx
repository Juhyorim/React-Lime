import RegionDialog from "@/components/common/dialog/RegionDialog";
import GlobalHeader from "@/components/common/header/GlobalHeader";
import TicoHeader from "@/components/common/header/TicoHeader";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import useTicoStore from "@/stores/ticoStore";

function index() {
  const { setCity } = useTicoStore();
  const [searchParams, _] = useSearchParams();
  const [regionOpen, setRegionOpen] = useState<boolean>(false);
  // const [region, setRegion] = useState<CityInfo>({
  //   cityCode: 12,
  //   cityName: "세종특별시",
  // }); //default 값 설정

  // 쿼리 파라미터 읽기
  const cityCode = searchParams.get("cityCode");
  const regionName = searchParams.get("regionName");
  const searchRef = searchParams.get("input");

  // 모든 파라미터 객체로 가져오기
  const allParams = Object.fromEntries(searchParams.entries());
  console.log(allParams); // { cityCode: 'seoul', regionName: 'gangnam', input: 'restaurant' }

  return (
    <div>
      <GlobalHeader />
      <TicoHeader
        handleRegionDialog={setRegionOpen}
        regionName={regionName ? regionName : "세종특별시"}
        cityCode={cityCode ? Number(cityCode) : 12}
        input={searchRef ? searchRef : ""}
      />
      <h1>검색 페이지</h1>
      <p>도시 코드: {cityCode}</p>
      <p>지역명: {regionName}</p>
      <p>검색어: {searchRef}</p>

      {regionOpen && (
        <RegionDialog handleDialog={setRegionOpen} handleRegion={setCity} />
      )}
    </div>
  );
}

export default index;
