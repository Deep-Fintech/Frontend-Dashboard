import React, { useState } from "react";
import Chart from "kaktana-react-lightweight-charts";
import { REAL, TEST } from "./Data/Real";
import { PREDICTED } from "./Data/Predicted";

function StaticChart() {
  const [options, setoptions] = useState({
    // alignLabels: true,
    // timeScale: {
    //   rightOffset: 12,
    //   barSpacing: 3,
    //   fixLeftEdge: true,
    //   lockVisibleTimeRangeOnResize: true,
    //   rightBarStaysOnScroll: true,
    //   borderVisible: false,
    //   borderColor: "#fff000",
    //   visible: true,
    //   timeVisible: true,
    //   secondsVisible: false,
    // },
    priceLineWidth: 1,
    timeScale: {
      timeVisible: true,
      secondsVisible: false,
    },
  });

  const chartData = (data, color) => {
    return {
      data,
      options: {
        color,
        lineColor: color,
        topColor: color + "00",
        bottomColor: color + "00",
        priceLineColor: color,
        priceLineVisible: true,
        priceLineWidth: 1,
      },
    };
  };

  return (
    <div>
      <Chart
        options={options}
        lineSeries={[chartData(REAL, "#4300ff"), chartData(PREDICTED, "#f49911")]}
        autoWidth
        height={550}
        darkTheme={true}
        legend="BTC/USDT"
      />
    </div>
  );
}

export default StaticChart;
