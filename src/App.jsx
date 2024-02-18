// import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Upload from "./components/Upload";

function Calculator() {
  return (
    <div>
      <h1>Calculator</h1>
      {/* Add your calculator component here */}
    </div>
  );
}

function Weather() {
  return (
    <div>
      <h1>Weather</h1>
      {/* Add your weather component here */}
    </div>
  );
}

function App() {
  return (
    <Container>
      <Row>
        <Col>
          <Calculator />
        </Col>
        <Col>
          <Weather />
        </Col>
        <Col>
          <Upload />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
