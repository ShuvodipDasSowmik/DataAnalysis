import { Dropdown } from "react-bootstrap";
// import { Form } from "react-bootstrap";

const GameImpressionsPerDay = ({ rawData }) => {
    const distinctGames = [...new Set(rawData.map(item => item.Application))];

    const showChart = ({ item, rawData }) => {
    

        return(
            <div>

            </div>
        )
    }
    return (
        <div>
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Filter By
                </Dropdown.Toggle>

                <Dropdown.Menu>
                {distinctGames.map((item) => (
                    <>
                        <Dropdown.Item
                            // type={"checkbox"}
                            // id={`${item}`}
                            // label={`${item}`}
                            onClick={() => showChart(item, rawData)}
                            // className="CheckBox"
                        >
                            {item}
                        </Dropdown.Item>
                    </>
                ))}
            </Dropdown.Menu>
        </Dropdown>
        </div >
    )

}

export default GameImpressionsPerDay;