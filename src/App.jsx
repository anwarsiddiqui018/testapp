// import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { Container, Row, Col } from "react-bootstrap";
import UploadEquityBhavCopy from "./components/UploadEquityBhavCopy";
import DisplayData from "./components/DisplayData";
import Upload from "./components/Upload";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DisplayData />} />
        <Route path="upload" element={<UploadEquityBhavCopy />} />
        <Route path="/test" element={<Upload />} />
      </Routes>
    </BrowserRouter>
  );
}
