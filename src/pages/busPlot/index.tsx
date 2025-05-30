import ticoAxios from "@/api/ticoAxios";
import TicoHeader from "@/components/common/header/TicoHeader";
import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import styles from "./styles/index.module.scss";

import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";
import DateDropdown, { DropdownOption } from "./components/DateDropdown";

interface ProcessedDataItem {
  x: number;
  y: number;
  z: number;
  priority: number;
  timestamp: string;
  timeString: string;
  hour: number;
}

// 툴팁 컴포넌트 타입 정의
interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: ProcessedDataItem;
  }>;
}

interface ResponseItem {
  nodeId: string;
  nodeName: string;
  routeId: string;
  routeNo: string;
  arriveTime: string;
  remainTime: number;
}

interface RouteParams {
  cityCode: string;
  nodeId: string;
  routeId: string;
  [key: string]: string | undefined; // 인덱스 시그니처 추가
}

const PriorityChart: React.FC = () => {
  const { cityCode, nodeId, routeId } = useParams<RouteParams>();
  const [data, setData] = useState<ProcessedDataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      if (!cityCode || !nodeId || !routeId) {
        setError("필수 파라미터가 누락되었습니다.");
        return;
      }

      try {
        setLoading(true);
        const rawData = await getData(cityCode!, nodeId!, routeId!);

        // 데이터 처리
        const processedData = rawData.map((item: ResponseItem) => {
          const date = new Date(item.arriveTime);
          const hour = date.getHours();
          const minute = date.getMinutes();

          // 시간대를 0-24시간 범위의 소수점으로 변환 (예: 18:30 -> 18.5)
          const hourDecimal = hour + minute / 60;
          // const size = 0.3 + ((3600 - item.remainTime) / (3600 - 1)) * 0.7;

          let priority = 0.1;

          if (Number(item.remainTime) <= 300) {
            priority = 1.0;
          } else if (Number(item.remainTime) <= 900) {
            priority = 1.0 - ((Number(item.remainTime) - 301) / 599) * 0.9;
          }

          return {
            x: hourDecimal, // X축에 시간을 소수점으로 표시
            y: 0, // 모든 점을 수평선 상에 배치
            z: priority * 200, // 우선순위가 높을수록 버블이 더 큼 0.1 ~ 1.0 => 20 ~ 200
            priority: priority,
            timestamp: item.arriveTime,
            timeString: `${hour.toString().padStart(2, "0")}:${minute
              .toString()
              .padStart(2, "0")}`,
            hour: hour,
          };
        });

        setData(processedData);
      } catch (err) {
        console.error("데이터 가져오기 오류:", err);
        setError("데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedFruit]); // 빈 배열은 컴포넌트가 마운트될 때만 실행됨을 의미

  const getData = async (cityCode: string, nodeId: string, routeId: string) => {
    const queryParams = {
      cityCode: cityCode,
      nodeId: nodeId,
      routeId: routeId,
      localDate: selectedFruit,
    };

    const response = await ticoAxios.get(`/subscribe/busInfo/version3`, {
      params: queryParams,
    });

    return response.data.response;
  };

  const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-2 border border-gray-300 rounded shadow">
          <p className="text-sm font-bold">{`시간: ${data.timeString}`}</p>
          <p className="text-sm font-medium text-red-600">{`우선순위: ${data.priority}`}</p>
        </div>
      );
    }
    return null;
  };

  const generateTicks = (): number[] => {
    const ticks: number[] = [];
    for (let i = 5; i <= 24; i += 0.5) {
      ticks.push(i);
    }
    return ticks;
  };

  // X축 눈금 포맷터 - 시간과 분을 표시
  const formatXAxisTick = (value: number): string => {
    const hours = Math.floor(value);
    const minutes = Math.round((value - hours) * 60);

    if (minutes === 0) {
      return `${hours}:00`;
    } else {
      return `${hours}:${minutes.toString().padStart(2, "0")}`;
    }
  };

  // 로딩 중이거나 오류 발생 시 표시
  if (loading) return <div className="p-4">데이터를 불러오는 중...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div>
      <TicoHeader
        handleRegionDialog={null}
        regionName={""}
        cityCode={1}
        input={""}
      />

      <div className={styles.chart}>
        <h2 className={styles.chart_title}>버스 도착시간 통계</h2>

        <DateDropdown
          options={fruitOptions}
          placeholder="날짜 선택"
          value={selectedFruit}
          onChange={setSelectedFruit}
        />

        <div className={styles.chart_body}>
          <ScatterChart
            width={150}
            height={3500}
            margin={{ top: 20, right: 20, bottom: 30, left: 20 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              horizontal={false}
            />
            <XAxis dataKey="y" type="number" domain={[0, 1]} hide={true} />
            <YAxis
              dataKey="x"
              name="시간"
              type="number"
              domain={[5, 24]} // 0-24시 전체 범위 표시
              ticks={generateTicks()} // 30분 간격 tick 명시적 설정
              tickFormatter={formatXAxisTick}
              interval={0} // 모든 틱을 표시하도록 설정
              textAnchor="end" // 텍스트 정렬 방식
              height={100} // X축 높이 증가
              label={{
                value: "시간 (30분 단위)",
                position: "bottom",
                offset: 35, // 레이블 위치 조정
              }}
              // tick={{ fontSize: 15 }}
              allowDecimals={true}
              reversed={true}
              unit="---"
            />
            <ZAxis dataKey="z" range={[20, 200]} name="우선순위" />
            <Tooltip content={<CustomTooltip />} />
            <Scatter name="우선순위" data={data} shape="circle">
              {data.map((item, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={`rgb(255, 80, 255, ${
                    item.priority
                    // item.priority <= 300 //5분아래면 정확하다고 판단
                    //   ? 1.0
                    //   : item.priority <= 900 //5분 ~ 15분 나쁘지않음
                    //   ? 1.0 - ((item.priority - 301) / 599) * 0.9
                    //   : 0.1
                  })`}
                  // stroke="#aaa"
                  strokeWidth={1}
                />
              ))}
            </Scatter>
          </ScatterChart>
        </div>
      </div>
    </div>
  );
};

export default PriorityChart;
