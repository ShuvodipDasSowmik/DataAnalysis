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

// Register required components
ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend
);

const BarChart = ({ rawData }) => {

    const impByCountry = {}

    rawData.forEach(item => {
        const imp = parseFloat(item.Impressions) || 0;

        if (impByCountry[item.Country]) {
            impByCountry[item.Country] += imp;
        }
        else {
            impByCountry[item.Country] = imp;
        }

    })

    const topCountryByImpression = Object.entries(impByCountry)
        .map(([Country, Impressions]) => ({ Country, Impressions }))
        .sort((a, b) => b.Impressions - a.Impressions);

    const topCountryByImp = topCountryByImpression.slice(0,19);

    const data = {
        labels: topCountryByImp.map(item => item.Country),
        datasets: [
            {
                label: "Impressions By Country",
                data: topCountryByImp.map(item => item.Impressions),
                backgroundColor: topCountryByImp.map((_, index) =>
                    `rgba(${(index * 50) % 255}, ${(index * 70) % 255}, ${(index * 90) % 255}, 0.7)`
                ),
                borderColor: 'rgba(0, 0, 0, 1)',
                borderWidth: 1.2,
            }
        ]
    }

    return (
        <div style={{width: "900px", marginLeft: "5vw"}}>
            <h4 style={{textAlign:"center"}}>Top 20 Countries By Impression</h4>
            <Bar
                data={data}
            />
        </div>
    )

}

export default BarChart;