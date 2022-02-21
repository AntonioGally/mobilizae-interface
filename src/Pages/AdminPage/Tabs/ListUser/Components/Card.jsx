import React, { memo, useState } from "react"

//Components
import { Row, Col } from "react-bootstrap"
import ConfirmModal from "./ConfirmModal";

//Scripts
import { formatDate } from "../../../../../scripts/utils"


const Card = (props) => {
  const [showModal, setShowModal] = useState()

  return (
    <div className='admin-list-page-card-wrapper' >
      <div className='admin-list-page-card-header' style={{ marginBottom: 20 }}>
        <div>
          <i className="fas fa-pen" ></i>
          <i className="fas fa-trash" onClick={() => setShowModal(true)}></i>
        </div>
      </div>
      <Row style={{ margin: 0 }}>
        <Col sm={12} md={6} className='card-wrapper-left-side'>
          <div>
            <h5>Nome:</h5>
            <span>{props.content.name}</span>
          </div>
          <div>
            <h5>Email:</h5>
            <span>{props.content.email}</span>
          </div>
          <div>
            <h5>Número</h5>
            <span>{props.content.number}</span>
          </div>
          <div>
            <h5>
              Página que participa:
              <i style={{ marginLeft: 12, fontSize: 12 }} className="fas fa-external-link-alt"></i>
            </h5>
            <span >
              <a onClick={(e) => e.stopPropagation()}
                href={`${window.location.origin}/#/${props.content.segmentname}`} target="_blank" rel="noreferrer">
                {window.location.origin}/#/{props.content.segmentname}
              </a>
            </span>
          </div>
          <div>
            <h5>
              Link do grupo:
              <i style={{ marginLeft: 12, fontSize: 12 }} className="fas fa-external-link-alt"></i>
            </h5>
            <a onClick={(e) => e.stopPropagation()}
              href={`${props.content.grouplink}`} target="_blank" rel="noreferrer"
            >
              {props.content.grouplink}
            </a>
          </div>
        </Col>
        <Col sm={12} md={6} className='card-wrapper-left-side'>
          <div>
            <h5>Data de cadastro:</h5>
            <span>
              {formatDate(props.content.createdat)}
            </span>
          </div>
          <div>
            <h5>Permissão SMS:</h5>
            <span>{props.content.isnewsletteractive ? "Ativo" : "Desativo"}</span>
          </div>
          <div>
            <h5>Nome do segmento:</h5>
            <span>{props.content.segmentname}</span>
          </div>
        </Col>
      </Row>
      <ConfirmModal title={props.content.name} showModal={showModal} setShowModal={setShowModal}
        btnClick={() => props.handleDeleteUser(props.content)} />
    </div>
  )
}

export default memo(Card);