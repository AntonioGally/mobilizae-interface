import React from "react";

//Components
import { Row, Col } from "react-bootstrap"

//Elements
import SubdomainInput from "../Elements/SubdomainInput";
import PrimaryButton from "../Elements/PrimaryButton";


const InputArea = (props) => {
  return (
    <Row style={{ margin: "40px 0 62px" }}>
      <Col sm={12} md={6} style={{ padding: 0 }}>
        <div className="default-page-subdomain-input-area">
          <h3 className="secondary-title">
            Entrar na mobilizae
          </h3>
          <SubdomainInput value={props.subdomainInputValue} type={'text'}
            onChange={(e) => props.setSubdomainInputValue(e.target.value)} />
          <span className="input-subtitle">Esqueceu o subdomínio?</span>
        </div>
      </Col>
      <Col sm={12} md={6} className="default-page-subdomain-button">
        <PrimaryButton text="Próximo" onClick={props.handleButtonClick} />
      </Col>
    </Row>
  )
}

export default InputArea;