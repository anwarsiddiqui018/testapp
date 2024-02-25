import { useState } from "react";
import { Button, Alert, Spinner, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
function UploadEquityBhavCopy() {
  const [uploading, setUploading] = useState(false);
  const [keepUploadedFile, setKeepUploadedFile] = useState("loading...");
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("No File Selected");
  // eslint-disable-next-line no-unused-vars
  const [success, setSuccess] = useState("");
  //   const [mostRecentDate, setMostRecentDate] = useState("");
  const EquityapiDB = "http://127.0.0.1:8000/api/";
  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setFile(file);
  };

  const preventDefault = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("csvFile", file);
    setKeepUploadedFile(file.name);
    // setStatus("Saving in progress...");
    setUploading(true);
    try {
      const response = await axios.post(EquityapiDB + "uploadData/", formData);
      setStatus(response.data["result"]);
      setUploading(false);
      setSuccess(true);
      setFile(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClearDB = async (event) => {
    event.preventDefault();
    if (
      window.confirm("Are you sure : you want to CLEAN Entire DB for Equity?")
    )
      try {
        const response = await axios.get(EquityapiDB + "deleteEquity/");
        setStatus(response);
        // handle success
        console.log(response);
      } catch (error) {
        console.log(error);
      }
  };

  // const getLatestDate = () => {
  //   fetch("http://127.0.0.1:8000/latest/created", {
  //     method: "GET",
  //     credentials: "include",
  //   })
  //     .then((res) => res.json())
  //     .then((data) => setMostRecentDate(data["result"]));
  // };

  return (
    <>
      <Container>
        <Row>
          <Col md={6}>
            <h1>Upload Capital Market</h1>
            {/* <input type="file" onChange={handleUpload} multiple /> */}
            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <input
                className="custom-file-input"
                type="file"
                accept=".csv"
                onChange={(e) => setFile(e.target.files[0])}
              />

              <div
                onDrop={handleDrop}
                onDragOver={preventDefault}
                style={{
                  border: "3px dashed #f08080",
                  borderRadius: "10px",
                  padding: "30px",
                  textAlign: "center",
                  cursor: "pointer",
                  width: "100%",
                  marginBottom: "15px",
                  backgroundColor: "#fafad2",
                  color: "#696969",
                  fontSize: "20px",
                  fontWeight: "bold",
                  fontFamily: "'Courier New', Courier, monospace",
                  transition: "all 0.3s ease-out",
                  ":hover": {
                    transform: "scale(1.05)",
                    backgroundColor: "#f08080",
                    color: "#fff",
                  },
                }}
              >
                {file ? (
                  <div>Selected File: {file.name} </div>
                ) : (
                  <h1>Feed ME Please Last Feed {file}</h1>
                )}
              </div>
              <button
                type="submit"
                style={{
                  height: "35px",
                  width: "150px",
                  backgroundColor: "#33AA2A",
                  color: "#fff",
                  opacity: file ? 1 : 0.6,
                  cursor: file ? "pointer" : "not-allowed",
                  border: "None",
                  marginBottom: "0.5rem",
                }}
                disabled={!file}
              >
                Upload CSV
              </button>
            </form>
            {uploading && <Spinner animation="border" />}
            {
              <Alert
                variant="success"
                className="text-center"
                style={{ fontSize: "20px", fontWeight: "bold" }}
              >
                File upload Status: {status}
                <h3 style={{ color: "#17a2b8" }}>
                  FileName: {keepUploadedFile}
                </h3>
              </Alert>
            }
            <Button variant="danger" onClick={handleClearDB}>
              Clear DB
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default UploadEquityBhavCopy;
