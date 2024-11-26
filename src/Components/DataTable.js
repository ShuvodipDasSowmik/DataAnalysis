import { Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";

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
                                {Show[9] ?<th style={{textAlign:"center"}}>Win Rate</th> : <></>}
                            </tr>
                        </thead>

                        <tbody>
                            {slicedData.map((row, index) => (
                                <tr key={index}>
                                    <td align="center">{row.Day}</td>
                                    <td align="center">{row.Application}</td>
                                    {Show[0] ? <td align="center">{row["Package Name"]}</td> : <></>}
                                    <td align="center">{row.Network}</td>
                                    {Show[2] ? <td align="center">{row.Country}</td> : <></>}
                                    {Show[3] ? <td align="center">{row.Attempts}</td> : <></>}
                                    {Show[4] ? <td align="center">{row.Responses}</td> : <></>}
                                    {Show[5] ? <td align="center">{row["Fill Rate"] ? (row["Fill Rate"] * 100).toFixed(2) + "%" : "N/A"}</td> : <></>}
                                    {Show[6] ? <td align="center">{row.Impressions}</td> : <></>}
                                    {Show[7] ? <td align="center">{row["Est. Revenue"] ? `$${row["Est. Revenue"]}` : "N/A"}</td> : <></>}
                                    {Show[8] ? <td align="center">{row.eCPM}</td> : <></>}
                                    {Show[9] ? <td align="center">{row["Win Rate"] ? (row["Win Rate"] * 100).toFixed(2) + "%" : "N/A"}</td> : <></>}
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    <Button style={{marginLeft: "5vw", marginRight: "2vw"}} onClick={previousPage} disabled={currentPage === 1}>Previous</Button>
                    <div style={{padding: "8px", height: "7px", display: "inline", border: "solid"}}>{currentPage}</div>
                    <Button style={{marginLeft: "2vw"}} s onClick={nextPage} disabled={currentPage === totalPage}>Next</Button>
                </>
            )

                : (<> </>)}

        </>
    )
}

export default DataTable;