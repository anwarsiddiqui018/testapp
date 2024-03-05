/* eslint-disable no-unused-vars */
import { AgGridReact } from "ag-grid-react"; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { useState, useEffect, useMemo, useCallback } from "react";
import "ag-grid-enterprise";

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
          color: isNegative ? "red" : "black",
        };
        return <div style={style}>{value}</div>;
      },
    },
    { headerName: "Timestamp", field: "TIMESTAMP", sortable: false },
    // Add more columns as needed
  ];

  const detailCellRendererParams = {
    // provide the Grid Options to use on the Detail Grid
    detailGridOptions: {
      columnDefs: [
        { field: "callId" },
        { field: "direction" },
        { field: "number" },
      ],
    },
    // get the rows for each Detail Grid
    getDetailRowData: (params) => {
      params.successCallback(params.data.callRecords);
    },
  };

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
        detailCellRendererParams={detailCellRendererParams}
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
