import React, { useState, useEffect, useMemo } from "react";
import styles from "./styles/index.module.scss";
import ticoAxios from "@/api/ticoAxios";
import { useNavigate, useParams } from "react-router-dom";
import DateDropdown, {
  DropdownOption,
} from "../busPlot/components/DateDropdown";
import { BusRoute } from "@/components/common/dialog/BusListDialog";

// 타입 정의
interface ApiBusData {
  nodeId: string;
  nodeName: string;
  routeId: string;
  routeNo: string;
  arriveTime: string;
  type: number | null;
}

interface BusArrival {
  time: string;
  busNumber: string;
  type: number;
}

interface GroupedBusArrivals {
  [time: string]: BusArrival[];
}

interface BusIconProps {
  // type: number;
  busNumber: string;
  // direction: string;
}

interface TimeSlotProps {
  time: string;
  busDataList: BusArrival[] | null;
}

interface RouteParams {
  cityCode: string;
  nodeId: string;
  [key: string]: string | undefined; // 인덱스 시그니처 추가
}

const BusRouteApp: React.FC = () => {
  const { cityCode, nodeId } = useParams<RouteParams>();
  const [busArrivals, setBusArrivals] = useState<BusArrival[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [busRoutes, setBusRoutes] = useState<BusRoute[]>([]);
  const navigate = useNavigate();

  // 시간 변환 함수
  const formatTime = (isoString: string): string => {
    const date = new Date(isoString);
    return `${date.getHours().toString().padStart(2, "0")}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  };

  // API 데이터를 내부 형식으로 변환
  const transformApiData = (apiData: ApiBusData[]): BusArrival[] => {
    return apiData.map((item, index) => ({
      time: formatTime(item.arriveTime),
      busNumber: item.routeNo,
      type: index + 1,
    }));
  };

  // 드롭다운 날짜 데이터 useMemo로 처리 - 다시 생성 방지
  const { dateOptions, yesterdayFormatted } = useMemo(() => {
    const formatter = new Intl.DateTimeFormat("sv-SE", {
      timeZone: "Asia/Seoul",
    });

    const today = new Date();
    const options = Array.from({ length: 15 }, (_, i) => {
      const date = new Date(today.getTime());
      date.setDate(today.getDate() - i);

      return {
        value: formatter.format(date),
        label: i === 0 ? "오늘" : i === 1 ? "어제" : `${i}일 전`,
      };
    });

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    return {
      dateOptions: options,
      yesterdayFormatted: formatter.format(yesterday),
    };
  }, []);

  const [selectedFruit, setSelectedFruit] = useState(yesterdayFormatted);
  const [fruitOptions, _] = useState<DropdownOption[]>(dateOptions);

  const [routeColorMap, setRouteColorMap] = useState<Map<string, number>>(
    new Map()
  );

  useEffect(() => {
    const fetchBusRouteData = async () => {
      try {
        setLoading(true);
        setError(null);
        const queryParams = {
          cityCode: cityCode,
          nodeId: nodeId,
        };

        const response = await ticoAxios.get(`/bus-info/bus-route`, {
          params: queryParams,
        });

        const tmp: BusRoute[] = response.data.busStations;

        // routeNo 기준으로 정렬
        const sortedBusStations = tmp
          .sort((a, b) => a.routeNo.localeCompare(b.routeNo))
          .map((route, index) => ({
            ...route,
            type: ((index + 1) % 17) + 1,
          }));

        for (const tmp of sortedBusStations) {
          setRouteColorMap((prev) => new Map(prev).set(tmp.routeNo, tmp.type!));
        }

        setBusRoutes(sortedBusStations);
      } catch (error) {
        console.error("버스 정보 불러오기 실패:", error);
      }
    };

    const fetchBusData = async () => {
      try {
        const queryParams = {
          cityCode: cityCode,
          nodeId: nodeId,
          localDate: selectedFruit,
        };

        const response = await ticoAxios.get(`/subscribe/busInfo/version4`, {
          params: queryParams,
        });

        const apiData: ApiBusData[] = response.data.response;
        const transformedData = transformApiData(apiData);
        setBusArrivals(transformedData);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다."
        );
        console.error("API 호출 오류:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBusRouteData();
    fetchBusData();
  }, [selectedFruit]); // 빈 배열은 컴포넌트가 마운트될 때만 실행됨을 의미

  // API 호출 함수
  const fetchBusData = async () => {};

  // 컴포넌트 마운트 시 데이터 로드
  useEffect(() => {
    fetchBusData();

    // 30초마다 데이터 갱신 (선택적)
    const interval = setInterval(fetchBusData, 30000);

    return () => clearInterval(interval);
  }, []);

  // 6:00부터 24:00까지의 시간대 생성
  const generateTimeSlots = (): string[] => {
    const slots: string[] = [];
    for (let hour = 6; hour <= 24; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        if (hour === 24 && minute > 0) break;
        const timeStr = `${hour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}`;
        slots.push(timeStr);
      }
    }
    return slots;
  };

  const timeSlots: string[] = generateTimeSlots();

  // 버스가 도착하는 시간대 그룹화
  const groupedBusArrivals: GroupedBusArrivals = busArrivals.reduce(
    (acc: GroupedBusArrivals, bus: BusArrival) => {
      if (!acc[bus.time]) {
        acc[bus.time] = [];
      }
      acc[bus.time].push(bus);
      return acc;
    },
    {}
  );

  // 모든 시간대 정렬
  const allTimeSlots: string[] = [
    ...new Set([
      ...Object.keys(groupedBusArrivals),
      ...timeSlots.filter((time: string) => time.endsWith(":00")),
    ]),
  ].sort();

  const BusIcon: React.FC<BusIconProps> = ({ busNumber }) => {
    return (
      <div
        className={`${styles.busIcon} ${
          styles[`busIcon--${routeColorMap.get(busNumber)}`]
        }`}
      >
        <span>{busNumber}</span>
      </div>
    );
  };

  const TimeSlot: React.FC<TimeSlotProps> = ({ time, busDataList }) => {
    const isMajorTime: boolean = time.endsWith(":00");
    const hasBuses: boolean = busDataList !== null && busDataList.length > 0;

    return (
      <div className={styles.timeSlot}>
        <div
          className={`${styles.timeSlot__time} ${styles["timeSlot__time--minor"]}`}
        >
          <span>{time}</span>
        </div>

        <div className={styles.timeSlot__dot}>
          <div
            className={`${styles.timeSlot__dotCircle} ${
              hasBuses
                ? styles["timeSlot__dotCircle--hasBus"]
                : isMajorTime
                ? styles["timeSlot__dotCircle--major"]
                : styles["timeSlot__dotCircle--minor"]
            }`}
          ></div>
        </div>

        <div className={styles.timeSlot__content}>
          {hasBuses && busDataList && (
            <>
              <div className={styles.bus__container}>
                {busDataList.map((bus: BusArrival, index: number) => (
                  <div
                    key={`${bus.time}-${bus.busNumber}-${index}`}
                    className={styles.bus__item}
                  >
                    <BusIcon
                      // type={bus.type}
                      busNumber={bus.busNumber}
                      // direction={bus.direction}
                      key={bus.time}
                    />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  // 로딩 상태
  if (loading) {
    return (
      <div className={styles.appContainer}>
        <div className={styles.loadingContainer}>
          <div className={styles.loading}>버스 정보를 불러오는 중...</div>
        </div>
      </div>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <div className={styles.appContainer}>
        <div className={styles.errorContainer}>
          <div className={styles.error}>{error}</div>
          <button onClick={fetchBusData} className={styles.retryButton}>
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  const moveToPage = (filter: string) => {
    if (filter === "main") {
      navigate("/tico");
      return;
    }
  };

  return (
    <div className={styles.appContainer}>
      {/* Header */}
      <div className={styles.header}>
        <svg
          className={styles.header__icon}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          onClick={() => moveToPage("main")}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        <h1 className={styles.header__title}>정류장 시간표</h1>
        <svg
          className={styles.header__icon}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          onClick={fetchBusData} // 새로고침 기능
          style={{ cursor: "pointer" }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      </div>

      {/* Content */}
      <div className={styles.content}>
        <DateDropdown
          options={fruitOptions}
          placeholder="날짜 선택"
          value={selectedFruit}
          onChange={setSelectedFruit}
        />
        <div className={styles.timeline}>
          {/* Main vertical timeline */}
          <div className={styles.timeline__line}></div>

          {/* Legend */}
          <div className={styles.legend}>
            <div className={styles.legend__container}>
              {busRoutes.map((item: BusRoute) => {
                return (
                  <div className={styles.legend__item}>
                    <div
                      className={`${styles.legend__color} ${
                        styles[`legend__color--${item.type}`]
                      }`}
                    ></div>
                    <span>{item.routeNo}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Time slots */}
          <div className={styles.timeSlots}>
            {allTimeSlots.map((time: string) => {
              const busDataList: BusArrival[] | null =
                groupedBusArrivals[time] || null;
              return (
                <TimeSlot key={time} time={time} busDataList={busDataList} />
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      {/* <div className={styles.bottomSection}>
        <div className={styles.bottomSection__container}>
          <div className={styles.bottomSection__left}>
            <div className={styles.bottomSection__appIcon}></div>
            <span className={styles.bottomSection__appName}>
              버스 도착 알림
            </span>
            <span className={styles.bottomSection__status}>설치됨</span>
          </div>
          <div>
            <svg
              className={styles.bottomSection__refresh}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              onClick={fetchBusData}
              style={{ cursor: "pointer" }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </div>
        </div>
      </div> */}

      {/* Bottom Button
      <div className={styles.bottomButton}>
        <button>알림 설정</button>
      </div> */}
    </div>
  );
};

export default BusRouteApp;
