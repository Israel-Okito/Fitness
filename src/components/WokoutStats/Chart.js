import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const Chart = (props) => {
  const [userData, setUserData] = useState({
    labels: props.data.map((itm) => itm.date),
    datasets: [
      {
        label: "No. Of Sets",
        data: props.data.map((itm) => itm.sets),
        fill: "start",

        cubicInterpolationMode: "monotone",
        tension: 0.4,
      },
    ],
  });

  return <Line data={userData} />;
};

export default Chart;
