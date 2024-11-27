import { useEffect, useState } from "react";
import Papa from 'papaparse';
import Data from './mediation_report_2024-11-24_09_16_56.csv'
import DataTable from "./Components/DataTable";
import { Dropdown } from "react-bootstrap";
import { Form } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import PieChart from "./Components/PieChart";
import { CheckBox } from './Style/style.css'
import BarChart from "./Components/BarChart";
import CustomChart from './Components/CustomChart'


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

      // try {
      //   const res = await fetch(API_URL); // Replace with your API URL
      //   const csvText = await res.text();

      //   const response = await fetch(Data);
      //   const reader = response.body.getReader();
      //   const result = await reader.read();
      //   const decoder = new TextDecoder("utf-8");
      //   const csvData = decoder.decode(result.value);

      //   const parsedData = Papa.parse(csvData, {
      //     header: true,
      //     skipEmptyLines: true,
      //   }).data;

      //   setData(parsedData);
      //   setTotalPage(data.length / postPerPage);

      // } catch (err) {
      //   setError("Failed to Fetch Data");
      // }

      try {
        const response = await fetch(Data);
        const reader = response.body.getReader();
        const result = await reader.read();
        const decoder = new TextDecoder("utf-8");
        const csvData = decoder.decode(result.value);

        const parsedData = Papa.parse(csvData, {
          header: true,
          skipEmptyLines: true,
        }).data;

        setData(parsedData);
        setTotalPage(data.length / postPerPage);

      } catch(err){
        console.log("Failed to fetch Data");
      }

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
    const revenue = parseFloat(item["Est. Revenue"]) || 0;
    // if(revenue > maxRev)
    //   setMaxRev(revenue);

    if (revByCountry[item.Country]) {
      revByCountry[item.Country] += revenue;
    }
    else {
      revByCountry[item.Country] = revenue;
    }
  })

  const topCountryByRev = Object.entries(revByCountry) // Sort in descending order by revenue
    .map(([Country, Revenue]) => ({ Country, Revenue }))
    .sort((a, b) => b.Revenue - a.Revenue);

  
  const [xAxis, setXAxis] = useState("Country");
  const [yAxis, setYAxis] = useState("Impressions");

  return (

    // Filter
    <>

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
      <div style={{marginLeft: "15vw", display:"inline"}}>
        Choose Parameter for X Axis:
      </div>
    
      <Dropdown onSelect={(e) => setXAxis(e)} style={{marginLeft: "1vw", display:"inline"}}>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {xAxis}
        </Dropdown.Toggle>

        <Dropdown.Menu>

          <Dropdown.Item eventKey="Country">
            Country
          </Dropdown.Item>

          <Dropdown.Item eventKey="Application">
            Application
          </Dropdown.Item>

          <Dropdown.Item eventKey="Package Name">
            Package Name
          </Dropdown.Item>

          <Dropdown.Item eventKey="Network">
            Network
          </Dropdown.Item>

        </Dropdown.Menu>
      </Dropdown>
      
      <br/>
      <br/>
      <br/>

      <div style={{marginLeft: "15vw", display:"inline"}}>
        Select Parameter for Y Axis:
      </div>
      <Dropdown onSelect={(e) => setYAxis(e)} style={{marginLeft: "1vw", display:"inline"}}>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {yAxis}
        </Dropdown.Toggle>

        <Dropdown.Menu>

          <Dropdown.Item eventKey="Impressions">
            Impression
          </Dropdown.Item>

          <Dropdown.Item eventKey="Est. Revenue">
            Est. Revenue
          </Dropdown.Item>

          <Dropdown.Item eventKey="eCPM">
            eCPM
          </Dropdown.Item>

          <Dropdown.Item eventKey="Attempts">
            Attempts
          </Dropdown.Item>

        </Dropdown.Menu>
      </Dropdown>

      <CustomChart data={data} xAxis={xAxis} yAxis={yAxis}/>

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
          <Form.Check
            type={"checkbox"}
            id={"winRate"}
            label={"Win Rate"}
            onChange={(e) => setShowWinRate(!showWinRate)}
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