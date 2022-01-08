import React, { useState } from "react";
import ReactDOM from 'react-dom';
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import "../styles/formModal.css";

const FormModal = ({ show, closeModal, modalImage }) => {
  const [radioValue, setRadioValue] = useState(false);

  return ReactDOM.createPortal(
    <Modal show={show} onHide={closeModal} centered className="form-modal-container">
      <img src={modalImage} alt="Header logo" />
      <div className="form-modal-input-area">
        <div>
          <label>Seu nome:</label>
          <input type="text" />
        </div>
        <div>
          <label>Seu melhor email:</label>
          <input type="text" />
        </div>
        <div>
          <label>Whatsapp com DDD:</label>
          <input type="text" />
        </div>
      </div>
      <div className="form-modal-button-area">
        <Form.Check
          style={{textAlign: 'left'}}
          value={radioValue}
          onChange={() => setRadioValue(!radioValue)}
          type={"checkbox"}
          label={`Aceito receber sms e avisos no meu telefone `}
        />
        <button className="button-container">Confirmar</button>
      </div>

    </Modal>, document.getElementById('modal-root')
  )
}

export default FormModal;