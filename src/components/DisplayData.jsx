/* eslint-disable no-unused-vars */
import { AgGridReact } from "ag-grid-react"; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { useState, useEffect } from "react";

const masterDetail = true;
const DisplayData = () => {
  // eslint-disable-next-line no-unused-vars
  const [rowData, setRowData] = useState([]);
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);

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
    {
      headerName: "Symbol",
      field: "SYMBOL",
      floatingFilter: true,
      filter: "agSetColumnFilter",
    },
    { headerName: "Open", field: "OPEN" },
    { headerName: "High", field: "HIGH" },
    { headerName: "Close", field: "CLOSE" },
    { headerName: "Volume", field: "VOLUME" },
    { headerName: "Open Int", field: "OPEN_INT" },
    {
      headerName: "Chg In Oi",
      field: "CHG_IN_OI",
      cellRenderer: (params) => {
        const value = params.value;
        const isNegative = value < 0;
        const style = {
          color: isNegative ? "red" : "black",
        };
        return <div style={style}>{value}</div>;
      },
    },
    { headerName: "Timestamp", field: "TIMESTAMP" },
    // Add more columns as needed
  ];
  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };
  const onFilterTextBoxChanged = (e) => {
    gridApi.setGridOption(e.target.value);
  };

  return (
    // wrapping container with theme & size
    <div
      className="ag-theme-quartz" // applying the grid theme
      style={{ height: "calc(100vh - 20px)", width: "100%" }} // the grid will fill the size of the parent container
    >
      <input
        type="text"
        onChange={onFilterTextBoxChanged}
        placeholder="Search Symbol"
        style={{ marginBottom: "10px", width: "10%" }}
      />
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        masterDetail={masterDetail}
        pagination={true}
        paginationPageSize={100}
        onGridReady={onGridReady}
        sideBar={{
          toolPanels: [
            {
              id: "columns",
              labelDefault: "Columns",
              labelKey: "columns",
              iconKey: "columns",
              toolPanel: "agColumnsToolPanel",
            },
            {
              id: "filters",
              labelDefault: "Filters",
              labelKey: "filters",
              iconKey: "filter",
              toolPanel: "agFiltersToolPanel",
            },
          ],
          defaultToolPanel: "columns", // Default to show the filters panel
        }}
        suppressMenuHide={true}
        enableFilter={true}
      />
    </div>
  );
};

export default DisplayData;
