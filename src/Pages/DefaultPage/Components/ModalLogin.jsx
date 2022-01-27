import React from "react";

//Components
import { Modal } from "react-bootstrap"

//Elements
import DefaultInput from "../Elements/DefaultInput";
import PrimaryButton from "../Elements/PrimaryButton";

const ModalLogin = (props) => {
  const windowWidth = window.innerWidth;
  return (
    <Modal show={props.showModal} onHide={() => props.setShowModal(false)}
      className="default-page-modal" centered={windowWidth > 768 ? false : true}>
      <div>
        <h3 className="secondary-title">
          Email
        </h3>
        <DefaultInput disabled={true} value={props.emailInput} style={{ background: '#f4f4f4' }} />
      </div>
      <div style={{ marginTop: 15 }}>
        <h3 className="secondary-title">
          Senha
        </h3>
        <DefaultInput value={props.passwordInputValue} onChange={(e) => { props.setPasswordInputValue(e.target.value) }}
          type="password" autofocus={true} />
        <span className="input-subtitle">Esqueceu a senha?</span>
      </div>
      <PrimaryButton text="Entrar" style={{ marginTop: 15 }} onClick={props.handleLoginButtonClick} />
    </Modal>
  )
}

export default ModalLogin