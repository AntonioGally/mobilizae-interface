import React, { useState, createRef, useEffect } from "react";
import { Form, Row, Button, Col } from "react-bootstrap"
import QRCode from "react-qr-code";
import { useScreenshot } from "use-react-screenshot";
import Spinner from "react-bootstrap/Spinner";

const CreateQRCode = () => {
  const ref = createRef(null);
  const [image, takeScreenShot] = useScreenshot();
  const [inputValue, setInputValue] = useState("");
  const [downloadState, setDownload] = useState(false);


  const getImage = () => {
    takeScreenShot(ref.current);
    setDownload(true)
  };


  useEffect(() => {
    if (image && downloadState) {
      var download = document.createElement('a');
      download.href = image;
      download.download = "qr-code";
      download.click();
      setDownload(false)
    }
  }, [image])


  return (
    <div>
      <Row>
        <Col md={6} sm={12}>
          <Form.Group className="mb-3">
            <Form.Label>Texto do QR Code</Form.Label>
            <Form.Control type="text" placeholder="Enter QR Code text" value={inputValue}
              onChange={(e) => { setInputValue(e.target.value) }} />
          </Form.Group>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Button type="button" variant="primary" onClick={getImage} style={{ marginRigth: 10 }}>
              Salvar
            </Button>
            <br />
            {downloadState && <Spinner style={{ marginLeft: 15 }} animation="border" size="lg" />}
          </div>


        </Col>
        <Col md={6} sm={12}>
          <div ref={ref} style={{ width: 'fit-content', margin: 'auto' }}>
            <QRCode value={inputValue} />
          </div>

        </Col>
      </Row>

    </div>
  )
}

export default CreateQRCode;