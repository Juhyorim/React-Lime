import React from "react";
import styles from "./styles/index.module.scss";

// 타입 정의
interface BusArrival {
  time: string;
  busNumber: string;
  type: "orange" | "green" | "blue";
  direction: string;
}

interface GroupedBusArrivals {
  [time: string]: BusArrival[];
}

interface BusIconProps {
  type: "orange" | "green" | "blue";
  busNumber: string;
  direction: string;
}

interface TimeSlotProps {
  time: string;
  busDataList: BusArrival[] | null;
}

const BusRouteApp: React.FC = () => {
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

  // 버스 도착 데이터
  const busArrivals: BusArrival[] = [
    { time: "06:15", busNumber: "180", type: "orange", direction: "내선순환" },
    { time: "06:45", busNumber: "187", type: "green", direction: "성수" },
    { time: "06:45", busNumber: "181", type: "blue", direction: "내선순환" },
    { time: "07:20", busNumber: "181", type: "blue", direction: "성수" },
    { time: "07:55", busNumber: "187", type: "green", direction: "성수" },
    { time: "07:55", busNumber: "180", type: "orange", direction: "내선순환" },
    { time: "07:55", busNumber: "181", type: "blue", direction: "외선순환" },
    { time: "08:30", busNumber: "180", type: "orange", direction: "내선순환" },
    { time: "08:30", busNumber: "187", type: "green", direction: "성수" },
    { time: "09:10", busNumber: "180", type: "orange", direction: "내선순환" },
    { time: "09:45", busNumber: "181", type: "blue", direction: "외선순환" },
    { time: "10:25", busNumber: "187", type: "green", direction: "성수" },
    { time: "11:00", busNumber: "181", type: "blue", direction: "외선순환" },
    { time: "11:00", busNumber: "180", type: "orange", direction: "내선순환" },
    { time: "11:35", busNumber: "187", type: "orange", direction: "성수" },
    { time: "12:15", busNumber: "187", type: "green", direction: "성수" },
    { time: "12:15", busNumber: "180", type: "orange", direction: "내선순환" },
    { time: "12:15", busNumber: "181", type: "blue", direction: "외선순환" },
    { time: "13:00", busNumber: "180", type: "orange", direction: "내선순환" },
    { time: "13:40", busNumber: "181", type: "blue", direction: "성수" },
    { time: "14:20", busNumber: "181", type: "blue", direction: "외선순환" },
    { time: "15:05", busNumber: "181", type: "blue", direction: "외선순환" },
    { time: "16:30", busNumber: "180", type: "orange", direction: "내선순환" },
    { time: "16:30", busNumber: "187", type: "green", direction: "성수" },
    { time: "17:15", busNumber: "187", type: "green", direction: "성수" },
    { time: "18:00", busNumber: "180", type: "orange", direction: "내선순환" },
    { time: "18:00", busNumber: "181", type: "blue", direction: "외선순환" },
    { time: "18:00", busNumber: "187", type: "orange", direction: "성수" },
    { time: "19:25", busNumber: "181", type: "blue", direction: "외선순환" },
    { time: "20:45", busNumber: "187", type: "orange", direction: "성수" },
    { time: "21:30", busNumber: "181", type: "blue", direction: "외선순환" },
    { time: "22:15", busNumber: "180", type: "orange", direction: "내선순환" },
    { time: "23:00", busNumber: "187", type: "green", direction: "성수" },
    { time: "23:45", busNumber: "180", type: "orange", direction: "내선순환" },
  ];

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

  const BusIcon: React.FC<BusIconProps> = ({ type, busNumber }) => {
    return (
      <div className={`${styles.busIcon} ${styles[`busIcon--${type}`]}`}>
        <svg
          className={styles.busIcon__svg}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2v0a2 2 0 01-2 2H8a2 2 0 01-2-2v0a2 2 0 01-2-2V9a2 2 0 012-2h2.586a1 1 0 00.707-.293L8 7z"
          />
        </svg>
        <span>{busNumber}</span>
      </div>
    );
  };

  const TimeSlot: React.FC<TimeSlotProps> = ({ time, busDataList }) => {
    const isMajorTime: boolean = time.endsWith(":00");
    const hasBuses: boolean = busDataList !== null && busDataList.length > 0;

    return (
      <div className={styles.timeSlot}>
        {/* <div
          className={`${styles.timeSlot__time} ${
            isMajorTime
              ? styles["timeSlot__time--major"]
              : styles["timeSlot__time--minor"]
          }`}
        > */}
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
                      type={bus.type}
                      busNumber={bus.busNumber}
                      direction={bus.direction}
                    />
                    {/* {index < busDataList.length - 1 && (
                      <div className={styles.bus__arrow}></div>
                    )} */}
                  </div>
                ))}
              </div>
              {/* <div className={styles.bus__count}>
                {busDataList.length}대 동시 도착
              </div> */}
            </>
          )}
        </div>
      </div>
    );
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
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3l6-3"
          />
        </svg>
      </div>

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.timeline}>
          {/* Main vertical timeline */}
          <div className={styles.timeline__line}></div>

          {/* Legend */}
          <div className={styles.legend}>
            <div className={styles.legend__container}>
              <div className={styles.legend__item}>
                <div
                  className={`${styles.legend__color} ${styles["legend__color--orange"]}`}
                ></div>
                <span>180</span>
              </div>
              <div className={styles.legend__item}>
                <div
                  className={`${styles.legend__color} ${styles["legend__color--green"]}`}
                ></div>
                <span>187</span>
              </div>
              <div className={styles.legend__item}>
                <div
                  className={`${styles.legend__color} ${styles["legend__color--blue"]}`}
                ></div>
                <span>181</span>
              </div>
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

          {/* Current time indicator */}
          {/* <div className={styles.currentTime}>
            <div className={styles.currentTime__dot}></div>
            <div className={styles.currentTime__label}>현재 시간</div>
          </div> */}
        </div>
      </div>

      {/* Bottom Section */}
      <div className={styles.bottomSection}>
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
      </div>

      {/* Bottom Button */}
      <div className={styles.bottomButton}>
        <button>알림 설정</button>
      </div>
    </div>
  );
};

export default BusRouteApp;
