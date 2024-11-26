import { Pie } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);


const PieChart = ({ topCountryByRev }) => {
    topCountryByRev = topCountryByRev.slice(0, 9);
    const data = {
        labels: topCountryByRev.map(item => item.Country),
        datasets: [
            {
                label: "Revenue By Country",
                data: topCountryByRev.map(item => item.Revenue),
                backgroundColor: topCountryByRev.map((_, index) =>
                    `rgba(${(index * 50) % 255}, ${(index * 70) % 255}, ${(index * 90) % 255}, 0.7)`
                ),
                borderColor: 'rgba(0, 0, 0, 1)',
                borderWidth: 1.2,
            }
        ]
    }
    return (
        <div style={{ width: "400px", float: "right", marginRight: "5vw" }}>
            <h4 style={{textAlign:"center"}}>Top 10 Countries By Revenue</h4>
            <Pie
                data={data}
                // options={{
                //     plugins: {
                //         title: {
                //             display: true,
                //             text: "Countries By Revenue"
                //         }
                //     }
                // }}
            />
        </div>
    )
}

export default PieChart;