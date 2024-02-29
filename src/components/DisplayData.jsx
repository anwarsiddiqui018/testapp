import { AgGridReact } from "ag-grid-react"; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { useState, useEffect } from "react";

const DisplayData = () => {
  // Row Data: The data to be displayed.
  // eslint-disable-next-line no-unused-vars
  const [rowData, setRowData] = useState([]);

  // Column Definitions: Defines the columns to be displayed.
  // eslint-disable-next-line no-unused-vars
  // const [colDefs, setColDefs] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetch("http://127.0.0.1:8000/api/getdata/");
      const json = await data.json();
      // console.log(json);
      setRowData(json);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const columnDefs = [
    { headerName: "Symbol", field: "SYMBOL" },
    { headerName: "Open", field: "OPEN" },
    { headerName: "High", field: "HIGH" },
    { headerName: "Close", field: "CLOSE" },
    { headerName: "Volume", field: "VOLUME" },
    { headerName: "Open Int", field: "OPEN_INT" },
    { headerName: "Chg In Oi", field: "CHG_IN_OI" },
    { headerName: "Timestamp", field: "TIMESTAMP" },
    // Add more columns as needed
  ];

  // ...
  return (
    // wrapping container with theme & size
    <div
      className="ag-theme-quartz" // applying the grid theme
      style={{ height: 500 }} // the grid will fill the size of the parent container
    >
      {/* // detail */}
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        pagination={true}
        paginationPageSize={100}
      />
    </div>
  );
};

export default DisplayData;
