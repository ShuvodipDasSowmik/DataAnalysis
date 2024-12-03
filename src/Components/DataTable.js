import { Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import ReactCountryFlag from "react-country-flag";

const DataTable = ({slicedData, currentPage, totalPage, previousPage, nextPage, Show}) => {
    return (
        <>
            {slicedData.length ? (
                <>
                    <Table striped bordered hover style={{width: "90vw", marginLeft:"auto", marginRight: "auto"}}>
                        <thead>
                            <tr>
                                <th style={{textAlign:"center"}}>Day</th>
                                <th style={{textAlign:"center"}}>Application</th>
                                {Show[0] ? <th style={{textAlign:"center"}}>Package Name</th> : <></>}
                                <th style={{textAlign:"center"}}>Network</th>
                                {Show[2] ?<th style={{textAlign:"center"}}>Country</th> : <></>}
                                {Show[3] ?<th style={{textAlign:"center"}}>Attempts</th> : <></>}
                                {Show[4] ?<th style={{textAlign:"center"}}>Responses</th> : <></>}
                                {Show[5] ?<th style={{textAlign:"center"}}>Fill Rate</th> : <></>}
                                {Show[6] ?<th style={{textAlign:"center"}}>Impressions</th> : <></>}
                                {Show[7] ?<th style={{textAlign:"center"}}>Est. Revenue</th> : <></>}
                                {Show[8] ?<th style={{textAlign:"center"}}>eCPM</th> : <></>}
                                {/* {Show[9] ?<th style={{textAlign:"center"}}>Win Rate</th> : <></>} */}
                            </tr>
                        </thead>

                        <tbody>
                            {slicedData.map((row, index) => (
                                <tr key={index}>
                                    <td align="center">{row.day}</td>
                                    <td align="center">{row.application}</td>
                                    {Show[0] ? <td align="center">{row["package_name"]}</td> : <></>}
                                    <td align="center">{row.network}</td>
                                    {Show[2] ? <td align="center">

                                        <ReactCountryFlag style={{width:"70px"}} countryCode={row.country.toUpperCase()} svg/>

                                        {row.country}
                                    </td> : <></>}
                                    {Show[3] ? <td align="center">{row.attempts}</td> : <></>}
                                    {Show[4] ? <td align="center">{row.responses}</td> : <></>}
                                    {Show[5] ? <td align="center">{row["fill_rate"] ? (row["fill_rate"]*1).toFixed(2) + "%" : "N/A"}</td> : <></>}
                                    {Show[6] ? <td align="center">{row.impressions}</td> : <></>}
                                    {Show[7] ? <td align="center">{row["estimated_revenue"] ? `$${row["estimated_revenue"]}` : "N/A"}</td> : <></>}
                                    {Show[8] ? <td align="center">{(row.ecpm*1).toFixed(2)}</td> : <></>}
                                    {/* {Show[9] ? <td align="center">{row["Win Rate"] ? (row["Win Rate"] * 100).toFixed(2) + "%" : "N/A"}</td> : <></>} */}
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    <Button style={{marginLeft: "5vw", marginRight: "2vw"}} onClick={previousPage} disabled={currentPage === 1}>Previous</Button>
                    <div style={{padding: "8px", height: "7px", display: "inline", border: "solid"}}>{currentPage}</div>
                    <Button style={{marginLeft: "2vw"}} s onClick={nextPage} disabled={currentPage === totalPage}>Next</Button>
                </>
            )

                : (<>
                <h1 style={{fontSize:"20px", textAlign:"center"}}>Retrieving Data Table From API...</h1>
                </>)}

        </>
    )
}

export default DataTable;