import ticoAxios from "@/api/ticoAxios";
import GlobalHeader from "@/components/common/header/GlobalHeader";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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

const getData = async (cityCode: string, nodeId: string, routeId: string) => {
  const queryParams = {
    cityCode: cityCode,
    nodeId: nodeId,
    routeId: routeId,
  };

  const response = await ticoAxios.get(`/subscribe/busInfo/version2`, {
    params: queryParams,
  });

  console.log(response.data);

  return response.data.response;
};

interface RouteParams {
  cityCode: string;
  nodeId: string;
  routeId: string;
  [key: string]: string | undefined; // 인덱스 시그니처 추가
}

const PriorityChart: React.FC = () => {
  // 상태 관리 추가
  const { cityCode, nodeId, routeId } = useParams<RouteParams>();
  const [data, setData] = useState<ProcessedDataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // useEffect를 사용하여 컴포넌트 마운트 시 데이터 가져오기
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

          console.log(hourDecimal);

          return {
            x: hourDecimal, // X축에 시간을 소수점으로 표시
            y: 1, // 모든 점을 수평선 상에 배치
            z: (40 - item.remainTime) * 30, // 우선순위가 높을수록 버블이 더 큼
            priority: item.remainTime,
            timestamp: item.arriveTime,
            timeString: `${hour.toString().padStart(2, "0")}:${minute
              .toString()
              .padStart(2, "0")}`,
            hour: hour,
          };
        });

        // 시간순 정렬
        const sortedData = processedData.sort(
          (a: ProcessedDataItem, b: ProcessedDataItem) => a.x - b.x
        );

        // console.log(sortedData)
        setData(sortedData);
      } catch (err) {
        console.error("데이터 가져오기 오류:", err);
        setError("데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // 빈 배열은 컴포넌트가 마운트될 때만 실행됨을 의미

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
    for (let i = 0; i <= 24; i += 0.5) {
      ticks.push(i);
    }
    return ticks;
  };

  // X축 눈금 포맷터 - 시간과 분을 표시
  const formatXAxisTick = (value: number): string => {
    const hours = Math.floor(value);
    const minutes = Math.round((value - hours) * 60);

    if (minutes === 0) {
      return `${hours}시`;
    } else {
      return `${hours}:${minutes.toString().padStart(2, "0")}`;
    }
  };

  // 로딩 중이거나 오류 발생 시 표시
  if (loading) return <div className="p-4">데이터를 불러오는 중...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="w-full h-96 p-4 bg-white">
      <GlobalHeader />

      <h2 className="text-xl font-semibold mb-4 text-center">
        우선순위 시각화
      </h2>

      <div className="w-full h-64 border border-gray-200 p-4 rounded">
        <ScatterChart
          width={250}
          height={2500}
          margin={{ top: 20, right: 20, bottom: 30, left: 20 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={true}
            horizontal={false}
          />
          <XAxis dataKey="y" type="number" domain={[0, 2]} hide={true} />
          <YAxis
            dataKey="x"
            name="시간"
            type="number"
            domain={[0, 24]} // 0-24시 전체 범위 표시
            ticks={generateTicks()} // 30분 간격 tick 명시적 설정
            tickFormatter={formatXAxisTick}
            interval={0} // 모든 틱을 표시하도록 설정
            textAnchor="end" // 텍스트 정렬 방식
            height={60} // X축 높이 증가
            label={{
              value: "시간 (30분 단위)",
              position: "bottom",
              offset: 35, // 레이블 위치 조정
            }}
            tick={{ fontSize: 12 }}
            allowDecimals={true}
          />
          <ZAxis dataKey="z" range={[30, 200]} name="우선순위" />
          <Tooltip content={<CustomTooltip />} />
          <Scatter name="우선순위" data={data} shape="circle">
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={"rgb(255, 80, 255)"}
                stroke="#fff"
                strokeWidth={1}
              />
            ))}
          </Scatter>
        </ScatterChart>
      </div>
    </div>
  );
};

export default PriorityChart;
