import { useState } from "react"

import { Bar } from "react-chartjs-2"

import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Button } from "react-bootstrap";

// Register required components
ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend
);

const CustomChart = ({ data, xAxis, yAxis }) => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: yAxis,
                data: [],
                borderColor: "rgba(75,192,192,1)",
                borderWidth: 2,
                fill: false,
            },
        ],
    });

    const aggregateData = () => {
        const aggregated = {};

        data.forEach((item) => {
            const xValue = item[xAxis];
            const yValue = parseFloat(item[yAxis]) || 0;

            if (aggregated[xValue]) {
                aggregated[xValue] += yValue; // Adjust to your aggregation logic
            } else {
                aggregated[xValue] = yValue;
            }
        });

        // Convert the result back to an array for visualization
        return Object.entries(aggregated).map(([key, value]) => ({
            [xAxis]: key,
            [yAxis]: value,
        }));
    };

    const handlePlot = () => {
        data = aggregateData();
        const xData = data.map((item) => item[xAxis]);
        const yData = data.map((item) => item[yAxis]);
        console.log(data);

        setChartData({
            labels: xData,
            datasets: [
                {
                    label: yAxis,
                    data: yData,
                    backgroundColor: data.map((_, index) =>
                        `rgba(${(index * 50) % 255}, ${(index * 70) % 255}, ${(index * 90) % 255}, 0.7)`
                    ),
                    borderColor: "rgba(0,0,0,1)",
                    borderWidth: 2,
                    fill: false,
                },
            ],
        });
    };

    return (
        <div style={{ width: "50vw", marginLeft: "15vw" }}>
            <br/>
            <Button onClick={handlePlot} style={{marginLeft: "15vw", display: "inline", float:"right"}}>Plot</Button>
            <Bar data={chartData}></Bar>
        </div>
    )
}

export default CustomChart;