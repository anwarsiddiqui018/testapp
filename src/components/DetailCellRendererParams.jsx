// DetailCellRendererParams.js

// import React from "react";

const DetailCellRendererParams = () => {
  const detailCellRendererParams = {
    detailGridOptions: {
      columnDefs: [
        { field: "SYMBOL" },
        { field: "OPEN" },
        { field: "HIGH" },
        { field: "CLOSE" },
        { field: "VOLUME" },
        { field: "OPEN_INT" },
        { field: "TIMESTAMP" },
      ],
    },
    getDetailRowData: async (params) => {
      const symbol = params.data.SYMBOL;
      console.log(symbol);
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/getdata?symbol=${symbol}`
        );
        const json = await response.json();
        console.log(json);
        params.successCallback(json);
      } catch (error) {
        console.error("Error fetching detail data:", error);
        params.successCallback([]);
      }
    },
  };

  return detailCellRendererParams;
};

export default DetailCellRendererParams;
