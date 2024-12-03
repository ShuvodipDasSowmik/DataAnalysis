import { useEffect, useState } from "react";

import DataTable from "./Components/DataTable";
import { Dropdown } from "react-bootstrap";
import { Form } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import PieChart from "./Components/PieChart";
import { CheckBox } from './Style/style.css'
import BarChart from "./Components/BarChart";
import CustomChart from './Components/CustomChart'
import axios from "axios";
import RevenueData from "./Components/RevenueData";


const REACT_APP_API_KEY = "U_6ufDXDPxfXT5mJr1TXCfBDawPb6mmr3W01UHfLA6tC5gS_R-aTMng9oG4vXLk7wDJL8H_UKPGL3QtereTazI"
const REACT_APP_URL = "https://r.applovin.com/maxReport"

// dotenv.config();

function App() {

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(20);
  const [totalPage, setTotalPage] = useState(1);

  const [showPkg, setShowPkg] = useState(false);
  const [showNetwork, setShowNetwork] = useState(false);
  const [showCountry, setShowCountry] = useState(false);
  const [showAttempts, setShowAttempts] = useState(false);
  const [showResponses, setShowResponses] = useState(false);
  const [showFillRate, setShowFillRate] = useState(false);
  const [showECPM, setShowECPM] = useState(false);
  const [showImpression, setShowImpression] = useState(false);
  const [showRev, setShowRev] = useState(false);
  const [showWinRate, setShowWinRate] = useState(false);

  const Show = [showPkg, showNetwork, showCountry, showAttempts, showResponses, showFillRate, showImpression, showRev, showECPM, showWinRate];

  // const [maxRev, setMaxRev] = useState(0);

  useEffect(() => {
    const fetchData = async () => {


      // const url = `${targetUrl}?$api_key=${apiKey}&columns=day,application,package_name,network,country,attempts,responses,fill_rate,impressions,estimated_revenue,ecpm&start=2024-11-17&end=2024-11-19&format=json`

      axios.get("http://localhost:4000/")
      .then(response => {
          setData(response.data.results)
          console.log(response.data.results[10]);
      })
      .catch(err => console.log(err))
      setTotalPage(data.length / postPerPage);
    };

    fetchData();
  }, []);

  const endIdx = currentPage * postPerPage;
  const startIdx = endIdx - postPerPage;

  const slicedData = data.slice(startIdx, endIdx);

  // useEffect(() => {
  //   console.log(topCountryByRev);
  //   console.log(maxRev);

  // })

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  }

  const previousPage = () => {
    setCurrentPage(currentPage - 1);
  }

  // const distinctCountries = [...new Set(data.map(item => item.Country))];
  const revByCountry = {}

  data.forEach(item => {
    const revenue = parseFloat(item["estimated_revenue"]) || 0;
    // if(revenue > maxRev)
    //   setMaxRev(revenue);

    if (revByCountry[item.country]) {
      revByCountry[item.country] += revenue;
    }
    else {
      revByCountry[item.country] = revenue;
    }
  })

  const topCountryByRev = Object.entries(revByCountry) // Sort in descending order by revenue
    .map(([Country, Revenue]) => ({ Country, Revenue }))
    .sort((a, b) => b.Revenue - a.Revenue);


  const [xAxis, setXAxis] = useState("country");
  const [yAxis, setYAxis] = useState("impressions");

  return (

    // Filter
    <>

      <div className="Header" style={{height:"10vh", textAlign:"center", backgroundColor:"white"}}>
        <h2 style={{paddingTop:"2vh", backgroundColor:"white"}}>Data Analysis</h2>
      </div>

      {/* <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Sort By
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1">Attempts</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown> */}
      <br />
      <br />
      <br />
      <br />
      <PieChart topCountryByRev={topCountryByRev} />
      <BarChart rawData={data} />

      <br />
      <br />
      <br />

      {/* <GameImpressionPerDay rawData={data}/> */}
      <div style={{ marginLeft: "15vw", display: "inline" }}>
        Choose Parameter for X Axis:
      </div>

      <Dropdown onSelect={(e) => setXAxis(e)} style={{ marginLeft: "1vw", display: "inline" }}>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {xAxis}
        </Dropdown.Toggle>

        <Dropdown.Menu>

          <Dropdown.Item eventKey="day">
            Day
          </Dropdown.Item>

          <Dropdown.Item eventKey="country">
            Country
          </Dropdown.Item>

          <Dropdown.Item eventKey="application">
            Application
          </Dropdown.Item>

          <Dropdown.Item eventKey="package_name">
            Package Name
          </Dropdown.Item>

          <Dropdown.Item eventKey="network">
            Network
          </Dropdown.Item>

        </Dropdown.Menu>
      </Dropdown>

      <br />
      <br />
      <br />

      <div style={{ marginLeft: "15vw", display: "inline" }}>
        Select Parameter for Y Axis:
      </div>
      <Dropdown onSelect={(e) => setYAxis(e)} style={{ marginLeft: "1vw", display: "inline" }}>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {yAxis}
        </Dropdown.Toggle>

        <Dropdown.Menu>

          <Dropdown.Item eventKey="impressions">
            Impression
          </Dropdown.Item>

          <Dropdown.Item eventKey="estimated_revenue">
            Est. Revenue
          </Dropdown.Item>

          <Dropdown.Item eventKey="ecpm">
            eCPM
          </Dropdown.Item>

          <Dropdown.Item eventKey="attempts">
            Attempts
          </Dropdown.Item>

        </Dropdown.Menu>
      </Dropdown>

      <CustomChart data={data} xAxis={xAxis} yAxis={yAxis} />

      <Dropdown style={{ float: "right", paddingRight: "5vw", marginTop: "5vh" }}>

        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Filter By
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Form.Check
            type={"checkbox"}
            id={"showPkg"}
            label={"Package"}
            onChange={(e) => setShowPkg(!showPkg)}
            className="CheckBox"
          />

          {/* <Form.Check
            type={"checkbox"}
            id={"showNetwork"}
            label={"Network"}
            onChange={(e) => setShowNetwork(!showNetwork)}
          /> */}
          <Form.Check
            type={"checkbox"}
            id={"showCountry"}
            label={"Country"}
            onChange={(e) => setShowCountry(!showCountry)}
            className="CheckBox"
          />
          <Form.Check
            type={"checkbox"}
            id={"showAttempts"}
            label={"Attempts"}
            onChange={(e) => setShowAttempts(!showAttempts)}
            className="CheckBox"
          />
          <Form.Check
            type={"checkbox"}
            id={"showResponses"}
            label={"Responses"}
            onChange={(e) => setShowResponses(!showResponses)}
            className="CheckBox"
          />
          <Form.Check
            type={"checkbox"}
            id={"showFillRate"}
            label={"Fill Rates"}
            onChange={(e) => setShowFillRate(!showFillRate)}
            className="CheckBox"
          />

          <Form.Check
            type={"checkbox"}
            id={"showImpression"}
            label={"Impression"}
            onChange={(e) => setShowImpression(!showImpression)}
            className="CheckBox"
          />
          <Form.Check
            type={"checkbox"}
            id={"showRev"}
            label={"Est. Revenue"}
            onChange={(e) => setShowRev(!showRev)}
            className="CheckBox"
          />
          <Form.Check
            type={"checkbox"}
            id={"eCPM"}
            label={"eCPM"}
            onChange={(e) => setShowECPM(!showECPM)}
            className="CheckBox"
          />
        </Dropdown.Menu>
      </Dropdown>
      <br /><br /><br />
      <DataTable slicedData={slicedData} currentPage={currentPage} totalPage={totalPage} previousPage={previousPage}
        nextPage={nextPage} Show={Show} />
      <br />
      <br />
    </>
  );
}

export default App;