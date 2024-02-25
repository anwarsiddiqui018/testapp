import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";

function Upload() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleFilesChosen = (event) => {
    setFiles(event.target.files);
  };

  const handleUploadClick = async (event) => {
    event.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError(null);

    const formData = new FormData();
    for (let file of files) {
      formData.append("files", file);
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/uploadData/", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Failed to upload files");
      }
      setSuccess(true);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRetrieveClick = async (event) => {
    event.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError(null);

    try {
      // const response = await fetch("/api/files/");
      // http://127.0.0.1:8000/uploadData
      const response = await fetch("http://127.0.0.1:8000/api/files/");
      if (!response.ok) {
        throw new Error("Failed to retrieve files");
      }
      const data = await response.json();
      alert(`Number of files: ${data.length}`);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <h1>Upload Files</h1>
      <Form onSubmit={handleUploadClick}>
        <Form.Group>
          <Form.Label>Select files to upload: </Form.Label>
          <Form.Control
            type="file"
            multiple={true}
            accept=".csv,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
            onChange={handleFilesChosen} // Add this line
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Upload"}
        </Button>
      </Form>

      {success && <p className="text-success">Files uploaded successfully!</p>}
      {error && <p className="text-danger">Error: {error}</p>}

      <hr />

      <h1>Retrieve Files</h1>
      <Button
        variant="primary"
        onClick={handleRetrieveClick}
        disabled={loading}
      >
        {loading ? "Retrieving..." : "Retrieve File List"}
      </Button>

      {error && <p className="text-danger">Error: {error}</p>}
    </Container>
  );
}

export default Upload;
