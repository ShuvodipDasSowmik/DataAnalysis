import { Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import axios from "axios";
import ReactCountryFlag from "react-country-flag";
import { Dropdown } from "react-bootstrap";


const RevenueData = () => {
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

    useEffect(() => {
        const fetchData = async () => {

            axios.get("http://localhost:4000/revenue")
                .then(response => {
                    setData(response.data.results)
                    console.log(response.data.results[10]);
                })
                .catch(err => console.log(err))
            setTotalPage(data.length / postPerPage);
        };

        fetchData();
    });

    const endIdx = currentPage * postPerPage;
    const startIdx = endIdx - postPerPage;

    const slicedData = {}
    if(data.length)    
        slicedData = data.slice(startIdx, endIdx);

    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    }

    const previousPage = () => {
        setCurrentPage(currentPage - 1);
    }


    return (
        <>
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

            {slicedData.length ? (
                <>
                    <Table striped bordered hover style={{ width: "90vw", marginLeft: "auto", marginRight: "auto" }}>
                        <thead>
                            <tr>
                                <th style={{ textAlign: "center" }}>Day</th>
                                <th style={{ textAlign: "center" }}>Application</th>
                                {showPkg ? <th style={{ textAlign: "center" }}>Package Name</th> : <></>}
                                <th style={{ textAlign: "center" }}>Network</th>
                                {showCountry ? <th style={{ textAlign: "center" }}>Country</th> : <></>}
                                {showAttempts ? <th style={{ textAlign: "center" }}>Attempts</th> : <></>}
                                {showResponses ? <th style={{ textAlign: "center" }}>Responses</th> : <></>}
                                {showFillRate ? <th style={{ textAlign: "center" }}>Fill Rate</th> : <></>}
                                {showImpression ? <th style={{ textAlign: "center" }}>Impressions</th> : <></>}
                                {showRev ? <th style={{ textAlign: "center" }}>Est. Revenue</th> : <></>}
                                {showECPM ? <th style={{ textAlign: "center" }}>eCPM</th> : <></>}
                                {/* {Show[9] ?<th style={{textAlign:"center"}}>Win Rate</th> : <></>} */}
                            </tr>
                        </thead>

                        <tbody>
                            {slicedData.map((row, index) => (
                                <tr key={index}>
                                    <td align="center">{row.day}</td>
                                    <td align="center">{row.application}</td>
                                    {showPkg ? <td align="center">{row["package_name"]}</td> : <></>}
                                    <td align="center">{row.network}</td>
                                    {showCountry ? <td align="center">

                                        <ReactCountryFlag style={{ width: "70px" }} countryCode={row.country.toUpperCase()} svg />

                                        {row.country}
                                    </td> : <></>}
                                    {showAttempts ? <td align="center">{row.attempts}</td> : <></>}
                                    {showResponses ? <td align="center">{row.responses}</td> : <></>}
                                    {showFillRate ? <td align="center">{row["fill_rate"] ? (row["fill_rate"] * 1).toFixed(2) + "%" : "N/A"}</td> : <></>}
                                    {showImpression ? <td align="center">{row.impressions}</td> : <></>}
                                    {showRev ? <td align="center">{row["estimated_revenue"] ? `$${row["estimated_revenue"]}` : "N/A"}</td> : <></>}
                                    {showECPM ? <td align="center">{(row.ecpm * 1).toFixed(2)}</td> : <></>}
                                    {/* {Show[9] ? <td align="center">{row["Win Rate"] ? (row["Win Rate"] * 100).toFixed(2) + "%" : "N/A"}</td> : <></>} */}
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    <Button style={{ marginLeft: "5vw", marginRight: "2vw" }} onClick={previousPage} disabled={currentPage === 1}>Previous</Button>
                    <div style={{ padding: "8px", height: "7px", display: "inline", border: "solid" }}>{currentPage}</div>
                    <Button style={{ marginLeft: "2vw" }} s onClick={nextPage} disabled={currentPage === totalPage}>Next</Button>
                </>
            )

                : (<>
                    <h1 style={{ fontSize: "20px", textAlign: "center" }}>Retrieving Data Table From API...</h1>
                </>)}

        </>
    )
}


export  default RevenueData;