import React from "react";

//Components
import { Row, Col } from "react-bootstrap"

//Elements
import PrimaryButton from "../Elements/PrimaryButton";
import DefaultInput from "../Elements/DefaultInput";


const InputArea = (props) => {

  function handleKeyPress(event) {
    if (event.charCode === 13) {
      props.handleButtonClick()
    }
  }

  return (
    <Row style={{ margin: "40px 0 62px" }}>
      <Col sm={12} md={6} style={{ padding: 0 }}>
        <div className="default-page-subdomain-input-area">
          <h3 className="secondary-title">
            Entrar na mobilizae
          </h3>
          <DefaultInput value={props.emailInput} type={'text'}
            onChange={(e) => props.setEmailInput(e.target.value)}
            onKeyPress={(e) => handleKeyPress(e)}
            placeholder="Email..." />
          <span className="input-subtitle">Esqueceu o email?</span>
        </div>
      </Col>
      <Col sm={12} md={6} className="default-page-subdomain-button" style={{ padding: 0 }}>
        <PrimaryButton type="submit" text="Próximo" onClick={props.handleButtonClick} />
      </Col>
    </Row>
  )
}

export default InputArea;