import { useState, useEffect } from "react";
import useGetStockData from "./useGetStockData";

const useGetChart = (companyId: number) => {
  const { data } = useGetStockData(companyId);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (data) {
      setChartData(data);
    }
  }, [data, companyId]);

  const options = {
    xAxis: {
      type: "category",
      data: chartData.map((stock: StockProps) => {
        const date = new Date(stock.stockTradeTime);
        const tradeTime = `${date.getHours()}시 ${date.getMinutes()}분`;
        return tradeTime;
      }),
    },
    yAxis: [
      {
        type: "value",
        position: "right",
        interval: 100,
        min: 69700,
      },
    ],
    dataZoom: [
      {
        type: "inside",
      },
    ],
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
    },
    series: [
      {
        name: "주가",
        type: "candlestick",
        data: chartData.map((stock: StockProps) => {
          return [stock.stck_oprc, stock.stck_prpr, stock.stck_lwpr, stock.stck_hgpr];
        }),
        yAxisIndex: 0,
      },
    ],
  };

  const chartStyle = {
    width: "100%",
    height: "100%",
  };

  return { options, chartStyle };
};

export default useGetChart;

interface StockProps {
  stockMinId: number;
  companyId: number;
  stockTradeTime: string;
  stck_cntg_hour: string;
  stck_prpr: string;
  stck_oprc: string;
  stck_hgpr: string;
  stck_lwpr: string;
}
