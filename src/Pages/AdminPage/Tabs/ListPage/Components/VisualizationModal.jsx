import React from "react";

//Components
import { Modal } from "react-bootstrap"

const VisualizationModal = (props) => {
    return (
        <Modal show={props.showModal} onHide={() => props.setShowModal(false)}
            className="admin-list-page-modal" centered={true}>
            <div style={{ marginBottom: 15 }}>
                <h3 className="secondary-title">
                    {props.modalData.segmentName}
                </h3>
            </div>
            <div className='card-wrapper-left-side'>
                <div style={{ marginBottom: 15 }}>
                    <h5>Link da página de captura:</h5>
                    <span>{props.modalData.pageLink}</span>
                    <div className='admin-list-page-modal-btn-area'>
                        <button>Copiar link</button>
                        <button>Gerar QR Code</button>
                    </div>
                </div>
                <div style={{ marginBottom: 15 }}>
                    <h5>Participantes:</h5>
                    <span>{props.modalData.participants}</span>
                    <div className='admin-list-page-modal-btn-area'>
                        <button>Visualizar</button>
                        <button>Baixar telefones</button>
                        <button>Baixar emails</button>
                    </div>
                </div>
                <div style={{ marginBottom: 15 }}>
                    <h5>Cadastrou na página mas não participa do grupo:</h5>
                    <span>{props.modalData.participants}</span>
                    <div className='admin-list-page-modal-btn-area'>
                        <button>Visualizar</button>
                        <button>Baixar telefones</button>
                        <button>Baixar emails</button>
                    </div>
                </div>
            </div>

        </Modal>
    )
}

export default VisualizationModal;