import React from "react";

import { Modal, Button } from "react-bootstrap"

const ConfirmModal = (props) => {
  return (
    <Modal show={props.showModal} onHide={() => props.setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Deletar {props.title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>
          Tem certeza que deseja deletar a página {props.title}?
        </p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => props.setShowModal(false)}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={props.btnClick}>
          Deletar
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ConfirmModal;