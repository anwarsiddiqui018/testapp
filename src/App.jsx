// import React from "react";
import { Container, Row, Col } from "react-bootstrap";
// import Upload from "./components/Upload";
import UploadEquityBhavCopy from "./components/UploadEquityBhavCopy";
import DisplayData from "./components/DisplayData";

function App() {
  return (
    <Container>
      <Row>
        {/* <Col>
          <Calculator />
        </Col> */}
        {/* <Col>
          <Weather />
        </Col> */}
        {/* <Col>
          <Upload />
        </Col> */}
        <Col>
          <UploadEquityBhavCopy />
        </Col>
        <Col>
          <DisplayData />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
