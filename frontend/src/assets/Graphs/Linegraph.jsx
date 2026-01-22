import axios from "axios";
import React, { useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);
const Linegraph = ({ reportType, dateRange, days }) => {
  const [graphData, setGraphData] = React.useState([]);

  useEffect(() => {
    axios
      .post(
        "http://localhost:3000/webpages/getreportdata",
        { reportType: reportType, dateRange: dateRange, days: days },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      )
      .then((response) => {
        setGraphData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching report data:", error);
      });
  }, [reportType]);

  const data = [
    {
      labels: graphData.map((item) => item.label),
      datasets: [
        {
          label: { reportType },
          data: graphData.map((item) => item.value),
          borderColor: "rgba(75,192,192,1)",
          backgroundColor: "rgba(75,192,192,0.2)",
        },
      ],
    },
  ];

  const options3 = {
    responsive: true,
    animation: {
      duration: 2000,
      easing: "easeInOutQuart",
    },
    plugins: {
      title: {
        display: true,
      },
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div>
      {graphData.length === 0 ? (
        <p>Loading data...</p>
      ) : (
        <Line data={data} options={options3} />
      )}
    </div>
  );
};

export default Linegraph;
