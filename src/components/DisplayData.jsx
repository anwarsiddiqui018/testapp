/* eslint-disable no-unused-vars */
import { AgGridReact } from "ag-grid-react"; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { useState, useEffect, useMemo, useCallback } from "react";
import "ag-grid-enterprise";
import moment from "moment";
import DetailCellRendererParams from "./DetailCellRendererParams";

const masterDetail = true;
const DisplayData = () => {
  // eslint-disable-next-line no-unused-vars
  const [rowData, setRowData] = useState([]);
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [mode, setMode] = useState("light");

  useEffect(() => {
    fetchData();
  }, []);

  const toggleMode = () => {
    setMode(mode === "light" ? "dark" : "light");
  };

  const fetchData = async () => {
    try {
      const data = await fetch("http://127.0.0.1:8000/api/getdata/");
      const json = await data.json();
      console.log("hello mr dj mera gaan", json);
      // Get today's date
      const today = new Date();

      // Calculate the date for the previous trading day
      let targetDate = new Date(today);
      do {
        targetDate.setDate(targetDate.getDate() - 1);
      } while (targetDate.getDay() === 0 || targetDate.getDay() === 6);

      // Filter data for the previous trading day
      const targetDateData = json.filter((entry) => {
        const entryDate = new Date(entry.TIMESTAMP);
        return (
          entryDate.getDate() === targetDate.getDate() &&
          entryDate.getMonth() === targetDate.getMonth() &&
          entryDate.getFullYear() === targetDate.getFullYear()
        );
      });
      console.log("tum ho", targetDateData);

      // Format the fetched data
      const formattedData = targetDateData.map((item) => ({
        ...item,

        VOLUME: formatWithCommas(item.VOLUME),
        OPEN_INT: formatWithCommas(item.OPEN_INT),
        // Add other numeric fields to format here if needed
      }));
      setRowData(formattedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const formatWithCommas = (value) => {
    return value.toLocaleString();
  };

  const columnDefs = [
    {
      headerName: "Symbol",
      field: "SYMBOL",
      sort: "asc",
      floatingFilter: true,
      filter: "agSetColumnFilter",
      sortable: false,
      // enableRowGroup: true,
      // rowGroup: true,
      cellRenderer: "agGroupCellRenderer",
    },
    { headerName: "Open", field: "OPEN", sortable: false },
    { headerName: "High", field: "HIGH", sortable: false },
    { headerName: "Close", field: "CLOSE", sortable: false },
    { headerName: "Volume", field: "VOLUME", sortable: false },
    { headerName: "Open Int", field: "OPEN_INT", sortable: false },
    {
      headerName: "Chg In Oi",
      field: "CHG_IN_OI",
      cellRenderer: (params) => {
        const value = params.value;
        const isNegative = value < 0;
        const style = {
          color: isNegative ? "red" : "white",
        };
        return <div style={style}>{value}</div>;
      },
    },
    {
      headerName: "Timestamp",
      field: "TIMESTAMP",
      sortable: false,
      valueFormatter: (params) => {
        if (params.value) {
          return moment(params.value).format("YYYY-MM-DD"); // Customize format YYYY-MM-DD
        } else {
          return "NA"; // Or a placeholder if no timestamp
        }
      },
      filter: "agSetColumnFilter",
    },
    // Add more columns as needed
  ];

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };
  const onFilterTextBoxChanged = (e) => {
    gridApi.setGridOption(e.target.value);
  };
  const paginationPageSizeSelector = useMemo(() => {
    return [200, 500, 1000];
  }, []);
  const paginationNumberFormatter = useCallback((params) => {
    return "[" + params.value.toLocaleString() + "]";
  }, []);
  const onFirstDataRendered = useCallback((params) => {
    params.api.paginationGoToPage(4);
  }, []);

  return (
    <div
      className="ag-theme-quartz-dark" // applying the grid theme
      style={{ height: "calc(100vh - 20px)", width: "100%" }} // the grid will fill the size of the parent container
    >
      <input
        type="text"
        onChange={onFilterTextBoxChanged}
        placeholder="Search Symbol"
        style={{ marginBottom: "10px", width: "10%" }}
      />
      <AgGridReact
        detailCellRendererParams={DetailCellRendererParams()} // Corrected prop name and invocation
        rowData={rowData}
        columnDefs={columnDefs}
        masterDetail={masterDetail}
        pagination={true}
        paginationPageSize={500}
        paginationPageSizeSelector={paginationPageSizeSelector}
        paginationNumberFormatter={paginationNumberFormatter}
        onGridReady={onGridReady}
        groupUseEntireRow={true}
        animateRows={true} // Optional: Enable row animations
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
